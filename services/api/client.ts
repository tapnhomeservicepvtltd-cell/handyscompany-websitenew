import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'handyscompany.accessToken';
const REFRESH_TOKEN_KEY = 'handyscompany.refreshToken';
function getApiBaseUrl() {
  const configuredUrl =
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    (Constants.expoConfig?.extra?.apiBaseUrl as string | undefined);

  const normalizedUrl = configuredUrl?.replace(/\/$/, '');
  
  if (!normalizedUrl) {
    throw new Error("EXPO_PUBLIC_API_BASE_URL is missing. Do not fallback to localhost in Technician APK.");
  }

  return normalizedUrl;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

type ApiOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: unknown;
  headers?: Record<string, string>;
  authenticated?: boolean;
};

function requireBaseUrl() {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) {
    throw new ApiError(
      'EXPO_PUBLIC_API_BASE_URL is not configured. Set it to your backend API URL.',
      0,
    );
  }

  return apiBaseUrl;
}

async function parseError(response: Response) {
  try {
    const body = (await response.json()) as { message?: string | string[] };
    if (Array.isArray(body.message)) return body.message.join(', ');
    if (body.message) return body.message;
  } catch {
    // The server returned an empty or non-JSON response.
  }

  return 'Something went wrong. Please try again.';
}

async function refreshAccessToken() {
  const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  if (!refreshToken) return null;

  const response = await fetch(`${requireBaseUrl()}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    await clearSession();
    return null;
  }

  const payload = (await response.json()) as { accessToken: string; refreshToken: string };
  await saveSession(payload);
  return payload.accessToken;
}

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { authenticated = true, body, headers, ...requestOptions } = options;
  const baseUrl = requireBaseUrl();
  let accessToken = authenticated ? await SecureStore.getItemAsync(ACCESS_TOKEN_KEY) : null;

  const request = async (token: string | null) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    let response: Response;
    try {
      response = await fetch(`${baseUrl}/api/v1${path}`, {
        ...requestOptions,
        signal: requestOptions.signal ?? controller.signal,
        headers: {
          Accept: 'application/json',
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) throw new ApiError(await parseError(response), response.status);
    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  };

  try {
    return await request(accessToken);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401 || !authenticated) throw error;
    accessToken = await refreshAccessToken();
    if (!accessToken) throw error;
    return request(accessToken);
  }
}

export async function saveSession(tokens: { accessToken: string; refreshToken: string }) {
  await Promise.all([
    SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken),
    SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
  ]);
}

export async function clearSession() {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
  ]);
}

export async function logoutSession() {
  const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  try {
    if (refreshToken) {
      await apiRequest('/auth/logout', { method: 'POST', authenticated: false, body: { refreshToken } });
    }
  } finally {
    await clearSession();
  }
}

export async function exchangeFirebaseToken(idToken: string) {
  const session = await apiRequest<{ accessToken: string; refreshToken: string }>('/auth/verify-otp', {
    method: 'POST',
    authenticated: false,
    body: { phoneNumber: '', otp: idToken },
  });
  await saveSession(session);
  return session;
}
