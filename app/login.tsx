import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { requestOtp, verifyOtp } from "../services/api/auth";
import { saveSession } from "../services/api/client";
import { useLang } from "./context/LanguageContext"; // 🎯 फिक्स: Language Context इम्पोर्ट किया

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function LoginScreen() {
  const { t } = useLang(); // 🎯 फिक्स: ट्रांसलेशन फंक्शन को कॉल किया
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  const otpRefs = useRef<(TextInput | null)[]>([]);
  const otpAnim = useRef(new Animated.Value(0)).current;

  const isPhoneValid = phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber);

  // 🔄 OTP स्क्रीन फेड-इन एनिमेशन + ऑटो फोकस पहले बॉक्स पर
  useEffect(() => {
    if (verificationId) {
      Animated.timing(otpAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
      setTimeout(() => otpRefs.current[0]?.focus(), 400);
    } else {
      otpAnim.setValue(0);
    }
  }, [verificationId]);

  // ⏱️ Resend OTP टाइमर
  useEffect(() => {
    if (verificationId && resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer, verificationId]);

  // ✅ सारे 6 डिजिट भरने पर ऑटो-वेरिफाई
  useEffect(() => {
    if (verificationId && otp.every((d) => d !== "") && !loading) {
      handleVerifyOTP();
    }
  }, [otp]);

  const handleSendOTP = async () => {
    if (!isPhoneValid) {
      Alert.alert(
        t("Error", "त्रुटि"), 
        t("Please enter a valid 10-digit phone number", "कृपया सही 10-अंकों का फ़ोन नंबर दर्ज करें")
      );
      return;
    }

    setLoading(true);
    try {
      await requestOtp(`+91${phoneNumber}`);
      setVerificationId("otp-sent");
      setOtp(Array(OTP_LENGTH).fill(""));
      setResendTimer(RESEND_SECONDS);
      Alert.alert(
        t("OTP Sent 🚀", "ओटीपी भेज दिया गया है 🚀"),
        t("Please check your messages", "कृपया अपने मैसेज चेक करें")
      );
    } catch (error: any) {
      Alert.alert(t("Error", "त्रुटि"), error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    await handleSendOTP();
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");

    if (otpCode.length < OTP_LENGTH) {
      Alert.alert(
        t("Error", "त्रुटि"), 
        t("Please enter the 6-digit OTP", "कृपया 6-अंकों का OTP दर्ज करें")
      );
      return;
    }

    setLoading(true);
    try {
      const session = await verifyOtp(`+91${phoneNumber}`, otpCode);
      await saveSession(session);
      Alert.alert(t("Success 🎉", "सफलता 🎉"), t("Login Successful", "लॉगिन सफल रहा"));
      router.replace("/(tabs)" as any);
    } catch (error: any) {
      Alert.alert(
        t("Verification Failed", "सत्यापन विफल रहा"),
        t("Invalid OTP. Please try again.", "गलत OTP। कृपया पुनः प्रयास करें।")
      );
      setOtp(Array(OTP_LENGTH).fill(""));
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNumber = () => {
    setVerificationId(null);
    setOtp(Array(OTP_LENGTH).fill(""));
    setResendTimer(0);
  };

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      const pasted = text.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
      const newOtp = [...otp];
      pasted.forEach((char, i) => {
        if (index + i < OTP_LENGTH) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + pasted.length, OTP_LENGTH - 1);
      otpRefs.current[nextIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F9F5" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* 🚀 ब्रांडिंग लोगो एरिया */}
          <View style={styles.logoArea}>
            <View style={styles.logoSquare}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.logoText}>HandysCompany</Text>
            <View style={styles.badgeSlogan}>
              <Text style={styles.sloganText}>
                {t("🛡️ India’s Trusted Free Home Services", "🛡️ भारत की विश्वसनीय फ्री होम सर्विसेज")}
              </Text>
            </View>
          </View>

          {/* 💳 फॉर्म कार्ड */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              {verificationId 
                ? t("Verify Your Number", "अपना नंबर सत्यापित करें") 
                : t("Welcome Back", "स्वागत है")}
            </Text>
            <Text style={styles.formSubtitle}>
              {verificationId
                ? t("Enter the 6-digit code we sent you", "आपके पास भेजा गया 6-अंकों का कोड दर्ज करें")
                : t("Enter your mobile number to continue", "जारी रखने के लिए अपना मोबाइल नंबर दर्ज करें")}
            </Text>

            {/* मोबाइल नंबर इनपुट */}
            <View
              style={[
                styles.phoneInputWrapper,
                isPhoneFocused && !verificationId ? styles.inputWrapperFocused : null,
                verificationId ? styles.inputWrapperLocked : null,
              ]}
            >
              <Ionicons name="call-outline" size={20} color="#00A651" style={{ marginRight: 8 }} />
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder={t("Mobile Number", "मोबाइल नंबर")}
                placeholderTextColor="#A0B2A6"
                keyboardType="phone-pad"
                maxLength={10}
                editable={!verificationId}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => setIsPhoneFocused(false)}
              />
              {verificationId ? (
                <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
              ) : isPhoneValid ? (
                <Ionicons name="checkmark-circle" size={20} color="#00A651" />
              ) : null}
            </View>

            {!verificationId && (
              <View style={styles.secureNote}>
                <Ionicons name="shield-checkmark-outline" size={13} color="#6B7280" />
                <Text style={styles.secureNoteText}>
                  {t("We'll send a one-time password to verify it's you", "सत्यापन के लिए हम एक वन-टाइम पासवर्ड (OTP) भेजेंगे")}
                </Text>
              </View>
            )}

            {/* OTP बॉक्सेस */}
            {verificationId && (
              <Animated.View
                style={{
                  opacity: otpAnim,
                  transform: [
                    {
                      translateY: otpAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [12, 0],
                      }),
                    },
                  ],
                }}
              >
                <View style={styles.numberRow}>
                  <Text style={styles.numberRowText}>
                    {t(`Code sent to +91 ${phoneNumber}`, `कोड +91 ${phoneNumber} पर भेजा गया है`)}
                  </Text>
                  <TouchableOpacity onPress={handleChangeNumber} hitSlop={8}>
                    <Text style={styles.numberRowEdit}>{t("Edit", "बदलें")}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.otpContainer}>
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(ref) => { otpRefs.current[index] = ref; }}
                      style={[styles.otpBox, digit !== "" && styles.otpBoxFilled]}
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={(e) => handleOtpKeyPress(e, index)}
                      keyboardType="number-pad"
                      maxLength={OTP_LENGTH}
                      textAlign="center"
                      selectTextOnFocus
                    />
                  ))}
                </View>

                <View style={styles.resendRow}>
                  {resendTimer > 0 ? (
                    <Text style={styles.resendText}>
                      {t(`Didn't receive code? Resend in ${resendTimer}s`, `कोड नहीं मिला? दोबारा भेजें ${resendTimer}s में`)}
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={handleResendOTP} hitSlop={8}>
                      <Text style={styles.resendLink}>{t("Resend OTP", "ओटीपी दोबारा भेजें")}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            )}

            {/* एक्शन सबमिट बटन */}
            <TouchableOpacity
              style={[
                styles.button,
                (loading || (!verificationId && !isPhoneValid)) && styles.buttonDisabled,
              ]}
              onPress={verificationId ? handleVerifyOTP : handleSendOTP}
              disabled={loading || (!verificationId && !isPhoneValid)}
              activeOpacity={0.9}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.btnContent}>
                  <Text style={styles.buttonText}>
                    {verificationId ? t("Verify & Login", "सत्यापित करें और लॉगिन करें") : t("Get OTP", "ओटीपी प्राप्त करें")}
                  </Text>
                  <Ionicons name="arrow-forward-circle" size={20} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* नया अकाउंट बनाने का लिंक */}
          <TouchableOpacity
            style={styles.registerRedirect}
            onPress={() => router.push("/register")}
            activeOpacity={0.7}
          >
            <Text style={styles.redirectText}>
              {t("Don't have an account? ", "खाता नहीं है? ")}
              <Text style={styles.redirectLink}>{t("Create New Account", "नया खाता बनाएं")}</Text>
            </Text>
          </TouchableOpacity>

          {/* फुटर - टर्म्स एंड प्राइवेसी */}
          <Text style={styles.footerText}>
            {t("By continuing, you agree to our ", "आगे बढ़कर, आप हमारी ")}
            <Text style={styles.footerLink}>{t("Terms of Service", "सेवा की शर्तों")}</Text>
            {t(" and ", " और ")}
            <Text style={styles.footerLink}>{t("Privacy Policy", "गोपनीयता नीति")}</Text>
            {t(" से सहमत होते हैं", " से सहमत होते हैं")}
          </Text>

          <View style={styles.bottomSpacer} />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F9F5" },
  scrollViewStyle: { flex: 1 },
  scrollContent: { paddingHorizontal: 22, paddingTop: 10, alignItems: "center", justifyContent: "flex-start", flexGrow: 1 },
  logoArea: { alignItems: "center", marginTop: 0, marginBottom: 18 },
  logoSquare: { width: 75, height: 75, backgroundColor: "#FFFFFF", borderRadius: 22, justifyContent: "center", alignItems: "center", marginBottom: 12, shadowColor: "#00A651", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 4, padding: 8 },
  logoImage: { width: "100%", height: "100%" },
  logoText: { fontSize: 28, fontWeight: "900", color: "#00A651", letterSpacing: -0.2 },
  badgeSlogan: { backgroundColor: "#E6F5EC", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 6 },
  sloganText: { fontSize: 11, fontWeight: "700", color: "#2B613F" },
  formCard: { backgroundColor: "#FFFFFF", width: "100%", borderRadius: 28, padding: 22, shadowColor: "#0A2414", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 4, borderWidth: 1, borderColor: "#EDF5F0" },
  formTitle: { fontSize: 22, fontWeight: "800", color: "#111827", textAlign: "center" },
  formSubtitle: { fontSize: 12, color: "#6B7280", fontWeight: "600", textAlign: "center", marginTop: 4, marginBottom: 22 },
  phoneInputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#F9FAFB", borderWidth: 1.5, borderColor: "#E5E7EB", borderRadius: 16, marginBottom: 8, paddingHorizontal: 14 },
  inputWrapperFocused: { borderColor: "#00A651", backgroundColor: "#FFFFFF" },
  inputWrapperLocked: { backgroundColor: "#F3F4F6", opacity: 0.85 },
  countryCode: { fontSize: 15, fontWeight: "800", color: "#1F2937", marginRight: 6, borderRightWidth: 1.5, borderRightColor: "#E5E7EB", paddingRight: 8, height: 20, lineHeight: 20 },
  phoneInput: { flex: 1, paddingVertical: 14, fontSize: 15, color: "#111827", fontWeight: "700" },
  secureNote: { flexDirection: "row", alignItems: "center", marginBottom: 18, paddingHorizontal: 4, gap: 6 },
  secureNoteText: { fontSize: 11, color: "#6B7280", fontWeight: "600", flex: 1 },
  numberRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingHorizontal: 2 },
  numberRowText: { fontSize: 12, color: "#4B5563", fontWeight: "600" },
  numberRowEdit: { fontSize: 12, color: "#00A651", fontWeight: "800" },
  otpContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  otpBox: { width: 44, height: 52, borderRadius: 12, borderWidth: 1.5, borderColor: "#E5E7EB", backgroundColor: "#F9FAFB", fontSize: 20, fontWeight: "800", color: "#111827" },
  otpBoxFilled: { borderColor: "#00A651", backgroundColor: "#F0FBF4" },
  resendRow: { alignItems: "center", marginBottom: 6 },
  resendText: { fontSize: 12, color: "#6B7280", fontWeight: "600" },
  resendLink: { fontSize: 12, color: "#00A651", fontWeight: "800" },
  button: { backgroundColor: "#111827", borderRadius: 16, marginTop: 6, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  buttonDisabled: { backgroundColor: "#9CA3AF" },
  btnContent: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 15 },
  buttonText: { color: "#fff", fontWeight: "800", fontSize: 15, letterSpacing: 0.2 },
  registerRedirect: { marginTop: 20, padding: 8 },
  redirectText: { fontSize: 13.5, color: "#4B5563", fontWeight: "600" },
  redirectLink: { color: "#00A651", fontWeight: "800" },
  footerText: { fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 12, paddingHorizontal: 20, lineHeight: 17 },
  footerLink: { color: "#6B7280", fontWeight: "700" },
  bottomSpacer: { height: 80 }
});
