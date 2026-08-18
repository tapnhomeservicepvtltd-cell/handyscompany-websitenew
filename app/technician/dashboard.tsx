import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as Location from 'expo-location';

import * as TaskManager from 'expo-task-manager';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApiError } from '@/services/api/client';
import { Booking } from '@/services/api/bookings';
import {
  TechnicianProfile,
  getAssignedBookings,
  getMyTechnicianProfile,
  updateAssignedBookingStatus,
  updateAvailability,
} from '@/services/api/technicians';
import { onJobOffer, onJobCancelled, joinBookingRoom } from '@/services/socketService';
import { apiRequest } from '@/services/api/client';

// ─── Location broadcast interval (ms) ────────────────────────────────────────
const BROADCAST_INTERVAL_MS = 5000;
const BACKGROUND_LOCATION_TASK = 'BACKGROUND_LOCATION_TASK';

TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('Background location task error:', error);
    return;
  }
  if (data) {
    const { locations } = data as any;
    if (locations && locations.length > 0) {
      const loc = locations[0];
      try {
        const bookingId = await AsyncStorage.getItem('activeBookingId');
        if (bookingId) {
          await apiRequest(`/tracking/${bookingId}/location`, {
            method: 'POST',
            body: {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
              speed: loc.coords.speed ?? undefined,
              heading: loc.coords.heading ?? undefined,
              accuracy: loc.coords.accuracy ?? undefined,
            }
          });
        }
      } catch (err) {
        // Fallback silently in background to avoid breaking task loops
      }
    }
  }
});

export default function TechnicianDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<TechnicianProfile | null>(null);
  const [jobs, setJobs] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  // Membership Sales State
  const [membershipModalVisible, setMembershipModalVisible] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [sellingMembership, setSellingMembership] = useState(false);
  const [membershipSalesCount, setMembershipSalesCount] = useState(4);
  const [totalMembershipCommission, setTotalMembershipCommission] = useState(600); // 4 x 150 = 600

  // Location broadcasting state
  const [isTracking, setIsTracking] = useState(false);
  const [, setActiveBookingId] = useState<string | null>(null);
  const locationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Setup FCM Push Token & Listeners ─────────────────────────────────
  useEffect(() => {
    const setupFCM = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          const token = await messaging().getToken();
          if (token) {
            setFcmToken(token);
          }
        }
      } catch (err) {
        console.warn('FCM setup failed', err);
      }
    };
    void setupFCM();

    const handleNotificationTap = (bookingId: string) => {
      Alert.alert(
        '🆕 Job Offer Selected',
        `You tapped a job offer. Do you want to try accepting it?`,
        [
          { text: 'Ignore', style: 'cancel' },
          {
            text: 'Accept',
            onPress: async () => {
              try {
                setLoading(true);
                await apiRequest(`/dispatch/${bookingId}/accept`, { method: 'POST', body: {} });
                Alert.alert('✅ Job Secured!', 'You successfully claimed this job.');
                void joinBookingRoom(bookingId);
                void load(true);
              } catch (caught: any) {
                Alert.alert('❌ Missed it!', caught.message || 'Another technician claimed this job first or it expired.');
                setLoading(false);
              }
            },
          },
        ]
      );
    };

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage && remoteMessage.data?.type === 'JOB_OFFER' && typeof remoteMessage.data.bookingId === 'string') {
        handleNotificationTap(remoteMessage.data.bookingId);
      }
    });

    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage && remoteMessage.data?.type === 'JOB_OFFER' && typeof remoteMessage.data.bookingId === 'string') {
        handleNotificationTap(remoteMessage.data.bookingId);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [load]);

  // ─── Load dashboard data ─────────────────────────────────────────────────
  const load = useCallback(async (refresh = false) => {
    refresh ? setRefreshing(true) : setLoading(true);
    setError(null);
    try {
      const [me, assigned] = await Promise.all([
        getMyTechnicianProfile(),
        getAssignedBookings(),
      ]);
      setProfile(me);
      setJobs(assigned.items);

      // Find any active job needing location tracking
      const activeJob = assigned.items.find(
        (j: Booking) => j.status === 'ASSIGNED' || j.status === 'IN_PROGRESS'
      );
      if (activeJob) {
        setActiveBookingId(activeJob.id);
        await AsyncStorage.setItem('activeBookingId', activeJob.id);
      } else {
        await AsyncStorage.removeItem('activeBookingId');
      }
    } catch (caught) {
      setError(
        caught instanceof ApiError
          ? caught.message
          : 'Technician dashboard could not be loaded.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  // ─── Setup WebSocket listeners for new job offers ─────────────────────────
  useEffect(() => {
    const setupWS = async () => {
      await onJobOffer((data) => {
        Alert.alert(
          '🆕 New Job Available!',
          `Service near ${data.address}\nEstimated earning: ₹${data.estimatedEarning}`,
          [
            { 
              text: 'Ignore', 
              style: 'cancel',
              onPress: async () => {
                try {
                  await apiRequest(`/dispatch/${data.bookingId}/reject`, { method: 'POST', body: {} });
                } catch (e) {
                  // ignore
                }
              }
            },
            {
              text: 'Accept',
              onPress: async () => {
                try {
                  setLoading(true);
                  await apiRequest(`/dispatch/${data.bookingId}/accept`, { method: 'POST', body: {} });
                  Alert.alert('✅ Job Secured!', 'You successfully claimed this job.');
                  void joinBookingRoom(data.bookingId);
                  void load(true);
                } catch (caught: any) {
                  Alert.alert('❌ Missed it!', caught.message || 'Another technician claimed this job first or it expired.');
                  setLoading(false);
                }
              },
            },
          ]
        );
      });

      await onJobCancelled((data) => {
        Alert.alert('Job Cancelled', `Booking was cancelled: ${data.reason}`);
        void load(true);
      });
    };

    void setupWS();
  }, [load]);

  // ─── GPS Location Broadcaster ─────────────────────────────────────────────
  const startLocationBroadcast = async (bookingId: string) => {
    const { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
    if (fgStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Location access is needed to share your position with the customer.'
      );
      return;
    }

    const { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();
    if (bgStatus !== 'granted') {
      console.warn('Background location not granted. Falling back to foreground only.');
    }

    await AsyncStorage.setItem('activeBookingId', bookingId);
    setIsTracking(true);

    if (bgStatus === 'granted') {
      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: BROADCAST_INTERVAL_MS,
        distanceInterval: 10,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "HandysCompany on Duty",
          notificationBody: "Live location is being shared with customer.",
        }
      });
    }

    // Keep the foreground fallback running just in case the app remains foregrounded
    locationIntervalRef.current = setInterval(async () => {
      try {
        const loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          maxAge: 10000,
        });

        await apiRequest(`/tracking/${bookingId}/location`, {
          method: 'POST',
          body: {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            speed: loc.coords.speed ?? undefined,
            heading: loc.coords.heading ?? undefined,
            accuracy: loc.coords.accuracy ?? undefined,
          }
        });
      } catch (err) {
        console.warn('Location broadcast failed, sending fallback:', err);
        // Fallback for LOCATION_UNAVAILABLE
        await apiRequest(`/tracking/${bookingId}/location-unavailable`, {
          method: 'POST',
          body: { timestamp: new Date().toISOString() }
        }).catch(e => console.error('Fallback failed', e));
      }
    }, BROADCAST_INTERVAL_MS);
  };

  const stopLocationBroadcast = async () => {
    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }
    const hasTask = await TaskManager.isTaskRegisteredAsync(BACKGROUND_LOCATION_TASK);
    if (hasTask) {
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
    }
    await AsyncStorage.removeItem('activeBookingId');
    setIsTracking(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => { void stopLocationBroadcast(); };
  }, []);

  // ─── Doorstep Membership Sale Execution ─────────────────────────────────
  const handleSellMembership = async () => {
    if (!customerPhone || customerPhone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid 10-digit customer mobile number.');
      return;
    }

    setSellingMembership(true);
    try {
      const response = await apiRequest<{ success: boolean; commissionCredited: number }>('/dispatch/sell-membership', {
        method: 'POST',
        body: { phone: customerPhone }
      });

      setMembershipSalesCount((prev) => prev + 1);
      setTotalMembershipCommission((prev) => prev + response.commissionCredited);
      setCustomerPhone('');
      setMembershipModalVisible(false);

      Alert.alert(
        '🎉 Membership Sold & Commission Credited!',
        `Customer (+91 ${customerPhone}) is now a 699 Unlimited Member.\n\n💰 ₹${response.commissionCredited} Commission has been credited to your Wallet!`,
        [{ text: 'Great!' }]
      );
    } catch (caught: any) {
      Alert.alert('Transaction Failed', caught.message || 'Could not complete membership sale. Please try again.');
    } finally {
      setSellingMembership(false);
    }
  };

  // ─── Start job (technician accepts & begins travelling) ───────────────────
  const startJob = async (job: Booking) => {
    setBusyId(job.id);
    try {
      await apiRequest(`/dispatch/${job.id}/start`, { method: 'POST', body: {} });
      await startLocationBroadcast(job.id);
      await load(true);
    } catch (caught) {
      Alert.alert(
        'Unable to start job',
        caught instanceof ApiError ? caught.message : 'Please try again.'
      );
    } finally {
      setBusyId(null);
    }
  };

  const completeJob = async (job: Booking) => {
    setBusyId(job.id);
    try {
      await apiRequest(`/dispatch/${job.id}/complete`, { method: 'POST', body: {} });
      stopLocationBroadcast();
      await load(true);
    } catch (caught) {
      Alert.alert(
        'Unable to complete job',
        caught instanceof ApiError ? caught.message : 'Please try again.'
      );
    } finally {
      setBusyId(null);
    }
  };

  // ─── Availability toggle ──────────────────────────────────────────────────
  const availability = async (value: boolean) => {
    if (!profile) return;
    setProfile({ ...profile, isAvailable: value });
    try {
      setProfile(await updateAvailability(value));
    } catch (caught) {
      setProfile({ ...profile, isAvailable: !value });
      Alert.alert(
        'Unable to update',
        caught instanceof ApiError ? caught.message : 'Please try again.'
      );
    }
  };

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      await apiRequest('/dispatch/check-in', { method: 'POST', body: { pushToken: fcmToken ?? undefined } });
      Alert.alert('Success', 'You are now checked in.');
      await load(true);
    } catch (err: any) {
      Alert.alert('Check-In Failed', err.message);
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      await apiRequest('/dispatch/check-out', { method: 'POST', body: {} });
      Alert.alert('Success', 'You are now checked out.');
      await load(true);
    } catch (err: any) {
      Alert.alert('Check-Out Failed', err.message);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator color="#00A651" />
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Pressable onPress={() => void load()} style={styles.primary}>
          <Text style={styles.primaryText}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void load(true)} />
        }
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Partner Dashboard</Text>
            <Text style={styles.subtitle}>
              {profile?.isVerified ? 'Verified Professional' : 'Verification Pending'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable onPress={() => router.push('/technician/wallet' as never)}>
              <MaterialCommunityIcons name="wallet-outline" size={26} color="#00A651" />
            </Pressable>
            <Pressable onPress={() => router.push('/technician/profile' as never)}>
              <MaterialCommunityIcons name="account-edit-outline" size={26} color="#0F172A" />
            </Pressable>
          </View>
        </View>

        {/* Live Tracking Banner */}
        {isTracking && (
          <View style={styles.trackingBanner}>
            <View style={styles.trackingDot} />
            <Text style={styles.trackingText}>📡 Broadcasting live location to customer</Text>
            <Pressable onPress={stopLocationBroadcast} style={styles.stopBtn}>
              <Text style={styles.stopBtnText}>Stop</Text>
            </Pressable>
          </View>
        )}

        {/* Attendance (Check-In/Out) */}
        <View style={styles.attendanceCard}>
          <View style={styles.attendanceHeader}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#0F172A" />
            <Text style={styles.attendanceTitle}>Daily Attendance</Text>
          </View>
          <View style={styles.attendanceActions}>
            <Pressable onPress={handleCheckIn} style={[styles.attendanceBtn, { backgroundColor: '#00A651' }]}>
              <Text style={styles.attendanceBtnText}>Check In</Text>
            </Pressable>
            <Pressable onPress={handleCheckOut} style={[styles.attendanceBtn, { backgroundColor: '#DC2626' }]}>
              <Text style={styles.attendanceBtnText}>Check Out</Text>
            </Pressable>
          </View>
        </View>

        {/* 👑 Membership Sell & Commission Banner */}
        <View style={styles.membershipCard}>
          <View style={styles.membershipBadge}>
            <MaterialCommunityIcons name="crown" size={22} color="#F59E0B" />
            <Text style={styles.membershipTitle}>Doorstep Membership Sales</Text>
          </View>
          <Text style={styles.membershipSub}>
            Sell ₹699 Unlimited Membership to customer & earn <Text style={{ fontWeight: '900', color: '#00A651' }}>₹150 Instant Commission</Text> per sale!
          </Text>

          <View style={styles.membershipStatsRow}>
            <View style={styles.mStat}>
              <Text style={styles.mStatVal}>{membershipSalesCount}</Text>
              <Text style={styles.mStatLbl}>Memberships Sold</Text>
            </View>
            <View style={styles.mStat}>
              <Text style={[styles.mStatVal, { color: '#00A651' }]}>₹{totalMembershipCommission}</Text>
              <Text style={styles.mStatLbl}>Commission Earned</Text>
            </View>
          </View>

          <Pressable
            onPress={() => setMembershipModalVisible(true)}
            style={styles.sellBtn}
          >
            <MaterialCommunityIcons name="plus-circle-outline" size={18} color="#FFF" />
            <Text style={styles.sellBtnText}>Sell Membership at Doorstep (Earn ₹150)</Text>
          </Pressable>
        </View>

        {/* Availability Toggle */}
        <View style={styles.availability}>
          <View>
            <Text style={styles.availableTitle}>Available for new jobs</Text>
            <Text style={styles.availableSub}>
              {profile?.isAvailable ? 'Visible for assignments' : 'Currently offline'}
            </Text>
          </View>
          <Switch
            value={profile?.isAvailable ?? false}
            onValueChange={(value) => void availability(value)}
            trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
            thumbColor={profile?.isAvailable ? '#00A651' : '#64748B'}
          />
        </View>

        {/* Metrics */}
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <MaterialCommunityIcons name="star" size={20} color="#00A651" />
            <Text style={styles.metricValue}>{profile?.ratingAverage?.toFixed(1) ?? '0.0'}</Text>
            <Text style={styles.metricLabel}>Rating</Text>
          </View>
          <View style={styles.metric}>
            <MaterialCommunityIcons name="briefcase-check" size={20} color="#00A651" />
            <Text style={styles.metricValue}>{profile?.totalJobs ?? 0}</Text>
            <Text style={styles.metricLabel}>Total Jobs</Text>
          </View>
          <View style={styles.metric}>
            <MaterialCommunityIcons name="currency-inr" size={20} color="#00A651" />
            <Text style={styles.metricValue}>₹{totalMembershipCommission + (profile?.totalJobs || 0) * 350}</Text>
            <Text style={styles.metricLabel}>Total Earnings</Text>
          </View>
        </View>

        {/* Assigned Jobs */}
        <Text style={styles.section}>Assigned Jobs</Text>
        {jobs.length ? (
          jobs.map((job) => (
            <View key={job.id} style={styles.job}>
              <View style={styles.jobHeader}>
                <Text style={styles.service}>{job.service?.name}</Text>
                <Text style={styles.status}>{job.status.replaceAll('_', ' ')}</Text>
              </View>
              <Text style={styles.address}>
                {job.address?.addressLine1}, {job.address?.city}
              </Text>
              <Text style={styles.date}>{new Date(job.scheduledAt).toLocaleString()}</Text>

              {job.status === 'ASSIGNED' && (
                <Pressable
                  disabled={busyId === job.id}
                  onPress={() => void startJob(job)}
                  style={styles.primary}
                >
                  {busyId === job.id ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.primaryText}>🛵 Start & Share Location</Text>
                  )}
                </Pressable>
              )}

              {job.status === 'IN_PROGRESS' && (
                <Pressable
                  disabled={busyId === job.id}
                  onPress={() => void completeJob(job)}
                  style={[styles.primary, { backgroundColor: '#0F172A' }]}
                >
                  {busyId === job.id ? (
                    <ActivityIndicator color="#FFF" />
                  ) : (
                    <Text style={styles.primaryText}>✅ Mark Complete</Text>
                  )}
                </Pressable>
              )}
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="briefcase-outline" size={42} color="#94A3B8" />
            <Text style={styles.availableSub}>No active jobs assigned right now.</Text>
          </View>
        )}
      </ScrollView>

      {/* ─── Doorstep Membership Sale Modal ─────────────────────────────────── */}
      <Modal
        visible={membershipModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMembershipModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <MaterialCommunityIcons name="crown" size={24} color="#F59E0B" />
                <Text style={{ fontSize: 18, fontWeight: '900', color: '#0F172A' }}>Sell Doorstep Membership</Text>
              </View>

              <Pressable onPress={() => setMembershipModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={22} color="#64748B" />
              </Pressable>
            </View>

            <Text style={{ fontSize: 13, color: '#475569', marginBottom: 16, lineHeight: 18 }}>
              Offer the <Text style={{ fontWeight: '800', color: '#0F172A' }}>HandysCompany ₹699 Unlimited Membership</Text> to your customer. Customer gets 6 months free labour & you earn <Text style={{ fontWeight: '900', color: '#00A651' }}>₹150 instant wallet credit!</Text>
            </Text>

            <Text style={{ fontSize: 12, fontWeight: '800', color: '#0F172A', marginBottom: 6 }}>
              Customer Mobile Number
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              maxLength={10}
              value={customerPhone}
              onChangeText={setCustomerPhone}
            />

            <View style={{ backgroundColor: '#F0FDF4', padding: 12, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#00A651', marginBottom: 18 }}>
              <Text style={{ fontSize: 12, fontWeight: '700', color: '#166534' }}>
                🎉 Customer Price: ₹699 (6 Months)
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '800', color: '#00A651', marginTop: 2 }}>
                💰 Technician Commission: ₹150 Instant Credit
              </Text>
            </View>

            <Pressable
              disabled={sellingMembership}
              onPress={handleSellMembership}
              style={[styles.primary, { backgroundColor: '#00A651' }]}
            >
              {sellingMembership ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.primaryText}>Confirm Sale & Collect ₹150 Commission</Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 36 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 23, fontWeight: '900', color: '#0F172A' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  trackingBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#ECFDF5', borderRadius: 14, padding: 12, marginBottom: 14, borderWidth: 1, borderColor: '#6EE7B7' },
  trackingDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#00A651' },
  trackingText: { flex: 1, fontSize: 12, fontWeight: '700', color: '#065F46' },
  stopBtn: { backgroundColor: '#DC2626', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  stopBtnText: { color: '#FFF', fontSize: 12, fontWeight: '800' },

  // Attendance
  attendanceCard: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  attendanceHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  attendanceTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  attendanceActions: { flexDirection: 'row', gap: 12 },
  attendanceBtn: { flex: 1, height: 42, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  attendanceBtnText: { color: '#FFF', fontWeight: '800', fontSize: 13 },

  // Membership Card
  membershipCard: { backgroundColor: '#FEF3C7', borderRadius: 18, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#FDE68A' },
  membershipBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  membershipTitle: { fontSize: 16, fontWeight: '900', color: '#78350F' },
  membershipSub: { fontSize: 12, color: '#92400E', lineHeight: 17, marginBottom: 14 },
  membershipStatsRow: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  mStat: { flex: 1, backgroundColor: '#FFF', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#FCD34D', alignItems: 'center' },
  mStatVal: { fontSize: 18, fontWeight: '900', color: '#78350F' },
  mStatLbl: { fontSize: 10, fontWeight: '700', color: '#B45309', marginTop: 2 },
  sellBtn: { backgroundColor: '#00A651', height: 42, borderRadius: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  sellBtnText: { color: '#FFF', fontWeight: '800', fontSize: 12 },

  availability: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  availableTitle: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  availableSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  metrics: { flexDirection: 'row', gap: 10, marginTop: 12 },
  metric: { flex: 1, backgroundColor: '#FFF', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' },
  metricValue: { fontSize: 18, fontWeight: '900', color: '#0F172A', marginTop: 6 },
  metricLabel: { fontSize: 11, color: '#64748B', marginTop: 2 },
  section: { fontSize: 16, fontWeight: '900', color: '#0F172A', marginTop: 20, marginBottom: 10 },
  job: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  service: { fontSize: 15, fontWeight: '800', color: '#0F172A', flex: 1 },
  status: { fontSize: 11, fontWeight: '800', color: '#00A651' },
  address: { fontSize: 13, color: '#475569', marginTop: 8 },
  date: { fontSize: 12, color: '#64748B', marginTop: 4, marginBottom: 12 },
  primary: { height: 44, borderRadius: 10, backgroundColor: '#00A651', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFF', fontWeight: '800', fontSize: 13 },
  empty: { alignItems: 'center', padding: 24, gap: 8 },
  error: { color: '#991B1B', textAlign: 'center' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  input: { height: 48, borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 14, fontSize: 15, fontWeight: '600', color: '#0F172A', marginBottom: 14 },
});
