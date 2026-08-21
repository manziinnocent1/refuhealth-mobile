import React from "react";
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
};

export default function ContactHospitalScreen({ onBack }: Props) {
  const callHospital = () => {
    Alert.alert("Contact Hospital", "Calling the hospital support desk.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Contact Hospital</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalName}>Healthcare Support Desk</Text>
          <Text style={styles.hospitalText}>
            Contact your healthcare facility for account or patient-care
            assistance.
          </Text>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+250 788 000 000</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>support@hospital.example</Text>

          <Text style={styles.label}>Working Hours</Text>
          <Text style={styles.value}>Monday - Friday, 8:00 AM - 5:00 PM</Text>
        </View>

        <Pressable style={styles.button} onPress={callHospital}>
          <Text style={styles.buttonText}>Call Hospital Support</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() =>
            Linking.openURL("mailto:support@hospital.example").catch(() => {})
          }
        >
          <Text style={styles.secondaryText}>Send Email</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    height: 70,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20 },
  hospitalCard: {
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
  },
  hospitalName: { fontSize: 17, fontWeight: "700", color: "#1E40AF" },
  hospitalText: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 19,
    color: "#3B82F6",
  },
  contactCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  label: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  value: { marginTop: 5, fontSize: 13, color: "#334155" },
  button: {
    height: 54,
    marginTop: 25,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  secondaryButton: {
    height: 52,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryText: { color: "#2563EB", fontWeight: "700" },
});
