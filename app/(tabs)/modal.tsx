import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useLang } from "../context/LanguageContext"; // 🎯 फिक्स: Language Context इम्पोर्ट पाथ सुधारा

export default function ModalScreen() {
  const { t } = useLang(); // 🎯 फिक्स: ट्रांसलेशन हुक को कॉल किया

  return (
    <View style={styles.container}>
      {/* 🎯 फिक्स: टाइटल को ट्रांसलेट किया */}
      <Text style={styles.title}>
        {t("This is a modal", "यह एक मॉडल स्क्रीन है")}
      </Text>
      
      <Link href="/" dismissTo style={styles.link}>
        {/* 🎯 फिक्स: लिंक टेक्स्ट को ट्रांसलेट किया */}
        <Text style={styles.linkText}>
          {t("Go to home screen", "होम स्क्रीन पर जाएं")}
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#00A651',
    fontWeight: '600',
  },
});