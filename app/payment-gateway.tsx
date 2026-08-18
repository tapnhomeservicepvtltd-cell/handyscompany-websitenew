import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createAddress, getAddresses } from "../services/api/addresses";
import { createBooking } from "../services/api/bookings";
import { ApiError } from "../services/api/client";
import { createRazorpayOrder } from "../services/api/payments";
import { searchServices } from "../services/api/services";
import { getMyProfile, updateMyProfile } from "../services/api/users";
import { membershipsApi } from "../services/membershipsApi";
import { useLang } from "./context/LanguageContext";

const { height } = Dimensions.get("window");

type CategoryType =
  | "plumb" | "elec" | "carp" | "ac" | "fridge" | "washing"
  | "microwave" | "ro" | "geyser" | "chimney" | "dishwasher"
  | "induction" | "mixer" | "fan" | "cooler" | "vacuum" | "tv" | "kitchen";

export default function PaymentGatewayScreen() {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<CategoryType | null>("plumb");
  const [selectedService, setSelectedService] = useState<string>("");
  const [customJobText, setCustomJobText] = useState<string>("");

  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      loadUserProfile();
    }, [])
  );

  const loadUserProfile = async () => {
    setPageLoading(true);
    try {
      const profile = await getMyProfile();
      if (profile.fullName) setUserName(profile.fullName);
      if (profile.phoneNumber) setUserPhone(profile.phoneNumber);
    } catch (error) {
      console.log("Error loading user profile:", error);
    } finally {
      setPageLoading(false);
    }
  };

  const categoriesList: { id: CategoryType; label: string; icon: string }[] = [
    { id: "plumb", label: t("Plumbing", "प्लंबिंग"), icon: "water-pump" },
    { id: "elec", label: t("Electrical", "इलेक्ट्रिकल"), icon: "lightning-bolt" },
    { id: "carp", label: t("Carpentry", "कारपेंटरी"), icon: "hammer-wrench" },
    { id: "ac", label: t("AC Repair", "एसी रिपेयर"), icon: "air-conditioner" },
    { id: "fridge", label: t("Fridge", "फ्रिज"), icon: "fridge" },
    { id: "washing", label: t("Washing", "वाशिंग मशीन"), icon: "washing-machine" },
    { id: "microwave", label: t("Microwave", "माइक्रोवेव"), icon: "microwave" },
    { id: "ro", label: t("RO Purifier", "आरओ वाटर"), icon: "filter" },
    { id: "geyser", label: t("Geyser", "गीजर रिपेयर"), icon: "water-boiler" },
    { id: "chimney", label: t("Chimney", "चिमनी रिपेयर"), icon: "stove" },
    { id: "dishwasher", label: t("Dishwasher", "डिशवॉशर"), icon: "dishwasher" },
    { id: "induction", label: t("Induction", "इंडक्शन कुकटॉप"), icon: "induction" },
    { id: "mixer", label: t("Mixer", "मिक्सर ग्राइंडर"), icon: "blender" },
    { id: "fan", label: t("Fans", "पंखे"), icon: "fan" },
    { id: "cooler", label: t("Cooler", "कूलर"), icon: "snowflake" },
    { id: "vacuum", label: t("Vacuum", "वैक्यूम क्लीनर"), icon: "vacuum" },
    { id: "tv", label: t("TV Repair", "टीवी रिपेयर"), icon: "television" },
    { id: "kitchen", label: t("Kitchen App", "रसोई उपकरण"), icon: "coffee-maker" },
  ];

  const serviceLists: Record<CategoryType, string[]> = {
    plumb: [t("Leaking Tap Repair", "नल का रिपेयर"), t("Pipe Blockage Fix", "पाइप ब्लॉकेज ठीक करें"), t("Flush Repair", "फ्लश रिपेयर"), t("Basin Install", "बेसिन इंस्टॉलेशन"), t("Tank Leakage Fix", "टैंकी लीकेज सुधार"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    elec: [t("Switch Board Repair", "स्विच बोर्ड रिपेयर"), t("Wiring Fault Fix", "वायरिंग फॉल्ट ठीक करें"), t("LED Light Fitting", "एलईडी लाइट फिटिंग"), t("MCB Tripping Fix", "एमसीबी ट्रिपिंग सुधार"), t("Inverter Setup", "इन्वर्टर सेटअप"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    carp: [t("Door Lock Fix", "दरवाजे का लॉक ठीक करें"), t("Furniture Repair", "फर्नीचर रिपेयर"), t("Drawer Repair", "दराज की मरम्मत"), t("Bed Fix", "बेड की मरम्मत"), t("Hinge Replacement", "कब्जा बदलना"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    ac: [t("Deep Wet Service", "डीप वेट सर्विस"), t("Gas Refilling", "गैस रिफिलिंग"), t("AC Not Cooling Fix", "एसी कूलिंग समस्या"), t("Compressor Change", "कम्प्रेसर बदलना"), t("AC Installation", "एसी इंस्टॉलेशन"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    fridge: [t("Door Repair", "दरवाजा रिपेयर"), t("Gas Charging", "गैस चार्जिंग"), t("Cooling Issue Fix", "कूलिंग समस्या ठीक करें"), t("Compressor Repair", "कम्प्रेसर रिपेयर"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    washing: [t("Washing Machine Repair", "वाशिंग मशीन रिपेयर"), t("Drum Noise Fix", "ड्रम का शोर ठीक करें"), t("Pipe Leakage Fix", "पाइप लीकेज सुधार"), t("Motor Change", "मोटर बदलना"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    microwave: [t("Not Heating Fix", "गर्म न होना ठीक करें"), t("Touchpad Repair", "टचपैड रिपेयर"), t("Plate Replace", "प्लेट बदलना"), t("Magnetron Fix", "मैग्नेट्रॉन फिक्स"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    ro: [t("RO Filter Change", "आरओ फ़िल्टर बदलना"), t("TDS Adjust Fix", "टीडीएस एडजस्ट करना"), t("RO Pump Replace", "आरओ पंप बदलना"), t("Water Leak Repair", "पानी का रिसाव ठीक करें"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    geyser: [t("Not Heating Fix", "गर्म न होना ठीक करें"), t("Element Change", "एलिमेंट बदलना"), t("Tank Leak Fix", "टैंक लीकेज ठीक करें"), t("Geyser Install", "गीजर इंस्टॉलेशन"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    chimney: [t("Chimney Cleaning", "चिमनी सफाई"), t("Motor Repair", "मोटर रिपेयर"), t("Suction Fix", "सक्शन ठीक करें"), t("Touch Control Fix", "टच कंट्रोल सुधार"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    dishwasher: [t("Not Draining Fix", "पानी न निकलने की समस्या"), t("Heating Repair", "हीटिंग रिपेयर"), t("Panel Error Fix", "पैनल एरर सुधार"), t("Arm Cleaning", "आर्म सफाई"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    induction: [t("Power On Problem", "पावर ऑन समस्या"), t("Glass Top Replace", "ग्लास टॉप बदलना"), t("Error Code Fix", "एरर कोड सुधार"), t("Coil Repair", "कॉइल रिपेयर"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    mixer: [t("Motor Jam Repair", "मोटर जैम रिपेयर"), t("Jar Blade Change", "जार ब्लेड बदलना"), t("Overload Reset", "ओवरलोड रीसेट"), t("Speed Controller", "स्पीड कंट्रोलर"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    fan: [t("Fan Winding Fix", "पंखे की वाइंडिंग"), t("Capacitor Change", "कैपेसिटर बदलना"), t("Exhaust Noise Fix", "एग्जॉस्ट का शोर ठीक करें"), t("Table Fan Repair", "टेबल फैन रिपेयर"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    cooler: [t("Cooler Pump Repair", "कूलर पंप रिपेयर"), t("Cooler Pad Change", "कूलर पैड बदलना"), t("Body Leak Fix", "बॉडी लीकेज सुधार"), t("Blade Replace", "ब्लेड बदलना"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    vacuum: [t("Suction Loss Fix", "सक्शन की कमी ठीक करें"), t("Overheating Repair", "ओवरहीटिंग रिपेयर"), t("Filter Change", "फ़िल्टर बदलना"), t("Cord Repair", "कॉर्ड रिपेयर"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    tv: [t("LED Screen Repair", "एलईडी स्क्रीन रिपेयर"), t("TV Sound Fix", "टीवी साउंड ठीक करें"), t("Motherboard Repair", "मदरबोर्ड रिपेयर"), t("Wall Mount Install", "वॉल माउंट इंस्टॉलेशन"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
    kitchen: [t("Electric Kettle Fix", "इलेक्ट्रिक केतली सुधार"), t("Toaster Repair", "टोस्टर रिपेयर"), t("OTG Servicing", "ओटीजी सर्विसिंग"), t("Blender Repair", "ब्लेंडर रिपेयर"), t("Other (Write your problem...)", "अन्य समस्या (यहाँ नीचे लिखें...)")],
  };

  const categoryDisplayNames: Record<CategoryType, string> = {
    plumb: t("Plumbing", "प्लंबिंग"), elec: t("Electrical", "इलेक्ट्रिकल"), carp: t("Carpentry", "कारपेंटरी"), ac: t("Air Conditioner Repair", "एसी रिपेयर"),
    fridge: t("Refrigerator Repair", "फ्रिज रिपेयर"), washing: t("Washing Machine Repair", "वाशिंग मशीन रिपेयर"), microwave: t("Microwave Oven Repair", "माइक्रोवेव रिपेयर"),
    ro: t("Water Purifier (RO) Repair", "आरओ वाटर प्यूरीफायर रिपेयर"), geyser: t("Geyser Repair", "गीजर रिपेयर"), chimney: t("Chimney Repair", "चिमनी रिपेयर"),
    dishwasher: t("Dishwasher Repair", "डिशवॉशर रिपेयर"), induction: t("Induction Cooktop Repair", "इंडक्शन रिपेयर"), mixer: t("Mixer Grinder Repair", "मिक्सर ग्राइंडर रिपेयर"),
    fan: t("Ceiling & Exhaust Fan Repair", "पंखे और एग्जॉस्ट रिपेयर"), cooler: t("Water Cooler Repair", "कूलर रिपेयर"), vacuum: t("Vacuum Cleaner Repair", "वैक्यूम क्लीनर रिपेयर"),
    tv: t("Television (LED/Smart TV) Repair", "टेलीविजन रिपेयर"), kitchen: t("Kitchen Appliance Repair", "किचन अप्लायंस रिपेयर"),
  };

  const handleTabChange = (tab: CategoryType) => {
    if (activeTab === tab) {
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
    setSelectedService("");
    setCustomJobText("");
  };

  const handleBookAndPay = async () => {
    if (!selectedService || !activeTab) {
      Alert.alert(t("Select a Job", "काम सिलेक्ट करें"), t("Please select a repairing job from the menu above!", "कृपया ऊपर मेनू में से कोई एक रिपेयरिंग काम सिलेक्ट करें भाई!"));
      return;
    }

    if (selectedService.includes("Other") && !customJobText.trim()) {
      Alert.alert(t("Write Problem Details", "काम का विवरण लिखें"), t("Please describe your problem in the box below!", "कृपया नीचे दिए गए बॉक्स में अपनी समस्या लिखकर बताएं भाई!"));
      return;
    }

    if (!userName.trim()) {
      Alert.alert(t("Name Required", "नाम ज़रूरी है"), t("Please enter your name!", "कृपया अपना नाम भरें भाई!"));
      return;
    }
    if (!userPhone.trim() || userPhone.length < 10) {
      Alert.alert(t("Mobile Number", "मोबाइल नंबर"), t("Please enter a valid 10-digit mobile number!", "कृपया 10 अंकों का सही मोबाइल नंबर डालें!"));
      return;
    }
    if (!userAddress.trim()) {
      Alert.alert(t("Address Required", "पता ज़रूरी है"), t("Please enter your complete address!", "कृपया अपना पूरा पता दर्ज करें!"));
      return;
    }

    setLoading(true);

    try {
      const isCustom = selectedService.includes("Other");
      const finalServiceName = isCustom ? `Custom Job: ${customJobText.trim()}` : selectedService;

      await updateMyProfile({ fullName: userName.trim() });

      const serviceSearch = await searchServices(activeTab ? categoryDisplayNames[activeTab] : finalServiceName);
      const matchedService = serviceSearch.items.find((item) => item.name.toLowerCase().includes(finalServiceName.toLowerCase())) ?? serviceSearch.items[0];
      if (!matchedService) {
        throw new Error("No service could be matched for this request.");
      }

      const existingAddresses = await getAddresses().catch(() => []);
      const address = existingAddresses[0] ?? (await createAddress({
        label: "HOME",
        addressLine1: userAddress.trim(),
        city: "Unknown",
        state: "Unknown",
        postalCode: "000000",
        country: "India",
        isDefault: true,
      }));

      const booking = await createBooking({
        serviceId: matchedService.id,
        addressId: address.id,
        scheduledAt: new Date().toISOString(),
        notes: finalServiceName,
      });

      const plans = await membershipsApi.plans();
      const preferredPlan = plans.find((plan) => Number(plan.price) > 0) ?? plans[0];
      if (preferredPlan) {
        await membershipsApi.purchase(preferredPlan.id, `booking-${booking.id}`, finalServiceName);
      }

      const order = await createRazorpayOrder(booking.id);
      Alert.alert(
        t("Booking Successful! 🎉", "बुकिंग सफल! 🎉"),
        t(`Hello ${userName}, your booking has been accepted.`, `नमस्ते ${userName}, आपकी बुकिंग स्वीकार कर ली गई है।`)
      );

      router.replace({ pathname: `/payments/${booking.id}` } as any);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : error instanceof Error ? error.message : t("Unable to complete the request.", "अनुरोध पूरा नहीं हो सका।");
      Alert.alert(t("Error", "त्रुटि"), message);
    } finally {
      setLoading(false);
    }
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < categoriesList.length; i += 3) {
      const rowItems = categoriesList.slice(i, i + 3);
      const activeItemInRow = rowItems.find((item) => item.id === activeTab);

      rows.push(
        <View key={i} style={styles.rowBlock}>
          <View style={styles.tabRow}>
            {rowItems.map((cat) => {
              const isSelected = activeTab === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={isSelected ? styles.gridItemActive : styles.gridItem}
                  onPress={() => handleTabChange(cat.id)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons name={cat.icon as any} size={20} color={isSelected ? "#FFF" : "#00A651"} />
                  <Text style={isSelected ? styles.gridItemTextActive : styles.gridItemText} numberOfLines={1}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {rowItems.length < 3 && <View style={{ width: "31%" }} />}
            {rowItems.length < 2 && <View style={{ width: "31%" }} />}
          </View>

          {activeItemInRow && (
            <View style={styles.innerVerticalJobsList}>
              <Text style={styles.selectJobTitle}>
                {t(`👇 Select specific job for ${activeItemInRow.label}:`, `👇 ${activeItemInRow.label} के लिए विशिष्ट कार्य चुनें:`)}
              </Text>
              {serviceLists[activeItemInRow.id].map((job, idx) => {
                const isJobSelected = selectedService === job;
                return (
                  <View key={idx}>
                    <TouchableOpacity
                      style={isJobSelected ? styles.jobRowActive : styles.jobRow}
                      onPress={() => {
                        setSelectedService(job);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.jobRowLeft}>
                        <Ionicons name={isJobSelected ? "radio-button-on" : "radio-button-off"} size={16} color={isJobSelected ? "#00A651" : "#A0A0A0"} />
                        <Text style={isJobSelected ? styles.jobTextActive : styles.jobText}>{job}</Text>
                      </View>
                      {isJobSelected && <Ionicons name="checkmark-circle" size={16} color="#00A651" />}
                    </TouchableOpacity>

                    {isJobSelected && job.includes("Other") && (
                      <View style={styles.customInputHolder}>
                        <TextInput
                          style={styles.customTextInput}
                          placeholder={t("Type your specific problem here...", "अपनी समस्या यहाँ विस्तार से लिखें भाई...")}
                          placeholderTextColor="#999"
                          multiline={true}
                          numberOfLines={2}
                          value={customJobText}
                          onChangeText={setCustomJobText}
                        />
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      );
    }
    return rows;
  };

  if (pageLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00A651" />
        <Text style={{ marginTop: 10, color: "#666", fontWeight: "600" }}>{t("Loading Services...", "सर्विस लोड हो रही है...")}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("Secure Checkout & Booking", "सुरक्षित चेकआउट और बुकिंग")}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.amountCard}>
          <View style={styles.badgeRow}>
            <View style={styles.premiumBadge}>
              <MaterialCommunityIcons name="crown" size={13} color="#FFF" />
              <Text style={styles.premiumBadgeText}>{t("PREMIUM MEMBER", "प्रीमियम मेंबर")}</Text>
            </View>
            <Text style={styles.validityText}>{t("6 Months Validity", "6 महीने की वैधता")}</Text>
          </View>

          <Text style={styles.summaryLabel}>{t("Infinite Home Care Plan", "इन्फिनिट होम केयर प्लान")}</Text>
          <Text style={styles.subSummaryLabel}>{t("Enjoy Unlimited Premium Maintenance", "असीमित प्रीमियम रखरखाव का आनंद लें")}</Text>

          <View style={styles.priceRow}>
            <View style={styles.infoBannerContainer}>
              <Text style={styles.infoBannerText}>{t("🛠️ 100% FREE Labour Charges", "🛠️ 100% फ्री लेबर चार्ज")}</Text>
              <Text style={styles.materialNoteText}>
                {t(
                  "💡 Spare parts or materials can be brought by you from outside, or purchased directly from our technician at genuine MRP rates.",
                  "💡 स्पेयर पार्ट्स या मटेरियल आप खुद बाहर से ला सकते हैं, या हमारे टेक्नीशियन से जेन्युइन MRP रेट पर ले सकते हैं।"
                )}
              </Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <Text style={styles.priceText}>699</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>{t("1 & 2. Click Category & Choose Job right below it", "1 और 2. कैटेगरी पर क्लिक करें और ठीक नीचे अपना काम चुनें")}</Text>
        <View style={styles.mainGridHolder}>{renderRows()}</View>

        <Text style={styles.sectionTitle}>{t("3. Confirm Delivery & Location Details", "3. डिलीवरी और लोकेशन विवरण की पुष्टि करें")}</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputBoxRow}>
            <Ionicons name="person-outline" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t("Your Full Name (आपका नाम)", "आपका पूरा नाम")}
              placeholderTextColor="#999"
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          <View style={styles.inputBoxRow}>
            <Ionicons name="call-outline" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={t("Mobile Number (मोबाइल नंबर)", "मोबाइल नंबर")}
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={10}
              value={userPhone}
              onChangeText={setUserPhone}
            />
          </View>

          <View style={styles.inputContainerTop}>
            <Ionicons name="location-outline" size={16} color="#666" style={styles.inputIconTop} />
            <TextInput
              style={styles.inputAddress}
              placeholder={t("Full Address, House No, Landmark", "पूरा पता, मकान नंबर, लैंडमार्क")}
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={3}
              value={userAddress}
              onChangeText={setUserAddress}
            />
          </View>
        </View>

        {/* बुकिंग बटन */}
        <TouchableOpacity 
          style={loading ? styles.payBtnDisabled : styles.payBtn} 
          onPress={loading ? undefined : handleBookAndPay} 
          disabled={loading}
          activeOpacity={0.9}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.payBtnContent}>
              <Text style={styles.payBtnText}>
                {selectedService 
                  ? `${t("Book", "बुक करें")} "${selectedService.includes("Other") ? t("Custom Job", "कस्टम काम") : selectedService}" & ${t("Pay", "भुगतान करें")}` 
                  : t("Select a Job from Menu above to Pay", "भुगतान करने के लिए ऊपर मेनू से एक काम चुनें")}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </View>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAFD" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAFAFD" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderColor: "#EFEFEF" },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#11111F" },
  container: { padding: 16, gap: 16 },
  amountCard: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#EBEBEB", elevation: 1 },
  badgeRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  premiumBadge: { flexDirection: "row", backgroundColor: "#00A651", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignItems: "center", gap: 3 },
  premiumBadgeText: { color: "#FFF", fontSize: 9, fontWeight: "900" },
  validityText: { fontSize: 11, fontWeight: "700", color: "#666" },
  summaryLabel: { fontSize: 18, fontWeight: "800", color: "#111" },
  subSummaryLabel: { fontSize: 12, fontWeight: "600", color: "#666", marginTop: 2 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 12, borderTopWidth: 1, borderColor: "#F5F5F5", paddingTop: 10 },
  infoBannerContainer: { flex: 1, marginRight: 10, gap: 4 },
  infoBannerText: { color: "#00A651", fontWeight: "800", fontSize: 13 },
  materialNoteText: { color: "#555555", fontWeight: "500", fontSize: 11, lineHeight: 16 },
  priceContainer: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  currencySymbol: { fontSize: 14, fontWeight: "700", color: "#00A651", marginRight: 1 },
  priceText: { fontSize: 26, fontWeight: "900", color: "#00A651" },
  sectionTitle: { fontSize: 13, fontWeight: "700", color: "#444", marginBottom: -4 },
  mainGridHolder: { gap: 4 },
  rowBlock: { marginBottom: 6 },
  tabRow: { flexDirection: "row", justifyContent: "space-between" },
  gridItem: { width: "32%", backgroundColor: "#FFFFFF", borderRadius: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "#EBEBEB" },
  gridItemActive: { width: "32%", backgroundColor: "#00A651", borderRadius: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "#00A651" },
  gridItemText: { fontSize: 11, fontWeight: "700", color: "#555", marginTop: 5 },
  gridItemTextActive: { fontSize: 11, fontWeight: "700", color: "#FFF", marginTop: 5 },
  innerVerticalJobsList: { backgroundColor: "#F7FDF8", borderRadius: 12, marginTop: 6, borderWidth: 1, borderColor: "#D5ECD7", paddingHorizontal: 6, paddingVertical: 2 },
  selectJobTitle: { fontSize: 11, fontWeight: "700", color: "#00A651", padding: 10, paddingBottom: 4 },
  jobRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12, borderBottomWidth: 1, borderColor: "#EEF8F0" },
  jobRowActive: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 12, backgroundColor: "#EAF6EC", borderRadius: 8, marginVertical: 2 },
  jobRowLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  jobText: { fontSize: 13, fontWeight: "600", color: "#444" },
  jobTextActive: { fontSize: 13, fontWeight: "700", color: "#00A651" },
  customInputHolder: { backgroundColor: "#FFFFFF", borderRadius: 10, borderWidth: 1, borderColor: "#CDE7D0", marginHorizontal: 12, marginTop: 4, marginBottom: 8, paddingHorizontal: 10, paddingVertical: 6 },
  customTextInput: { minHeight: 46, fontSize: 13, color: "#333", fontWeight: "600", textAlignVertical: "top" },
  formContainer: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 14, borderWidth: 1, borderColor: "#EBEBEB", gap: 10 },
  inputBoxRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#F8FAF8", borderRadius: 10, borderWidth: 1, borderColor: "#EDF2EE", paddingHorizontal: 12 },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, height: 46, fontSize: 13, color: "#333", fontWeight: "600" },
  inputContainerTop: { flexDirection: "row", backgroundColor: "#F8FAF8", borderRadius: 10, borderWidth: 1, borderColor: "#EDF2EE", paddingHorizontal: 12, alignItems: "flex-start", paddingTop: 10 },
  inputIconTop: { marginRight: 8, marginTop: 2 },
  inputAddress: { flex: 1, height: 60, fontSize: 13, color: "#333", fontWeight: "600", textAlignVertical: "top" },
  payBtn: { backgroundColor: "#00A651", paddingVertical: 15, borderRadius: 12, alignItems: "center", elevation: 2, marginTop: 10 },
  payBtnDisabled: { backgroundColor: "#A3E6C1", paddingVertical: 15, borderRadius: 12, alignItems: "center", elevation: 2, marginTop: 10 },
  payBtnContent: { flexDirection: "row", alignItems: "center", gap: 6 },
  payBtnText: { color: "#fff", fontWeight: "800", fontSize: 15 }
});