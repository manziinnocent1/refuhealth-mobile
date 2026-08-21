import React from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
  onSubmitted?: (referralId: string) => void;
};

export default function ReferralReviewScreen({ onBack, onSubmitted }: Props) {
  const referralId = "REF-2026-00124";

  const submit = () => {
    Alert.alert(
      "Submit Referral",
      "Are you sure you want to send this referral?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          onPress: () => onSubmitted?.(referralId),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Review Referral</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.referenceCard}>
          <Text style={styles.referenceLabel}>REFERRAL REFERENCE</Text>
          <Text style={styles.referenceValue}>{referralId}</Text>
        </View>

        <Text style={styles.sectionTitle}>Patient</Text>
        <View style={styles.card}>
          <Text style={styles.mainText}>John Doe</Text>
          <Text style={styles.detail}>Patient ID: PT-001245</Text>
        </View>

        <Text style={styles.sectionTitle}>Referral Reason</Text>
        <View style={styles.card}>
          <Text style={styles.detail}>
            Requires specialist assessment and further management.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Receiving Facility</Text>
        <View style={styles.card}>
          <Text style={styles.mainText}>Kigali Referral Hospital</Text>
          <Text style={styles.detail}>Specialist Care Department</Text>
        </View>

        <Text style={styles.sectionTitle}>Shared Information</Text>
        <View style={styles.card}>
          {["Patient Profile", "Current Visit Notes", "Vital Signs"].map(
            (item) => (
              <Text key={item} style={styles.dataItem}>
                ✓ {item}
              </Text>
            ),
          )}
        </View>

        <Pressable style={styles.submitButton} onPress={submit}>
          <Text style={styles.submitText}>Submit Referral</Text>
        </Pressable>
      </ScrollView>
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
  title: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20, paddingTop: 5, paddingBottom: 40 },
  referenceCard: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
  },
  referenceLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2563EB",
  },
  referenceValue: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
  },
  card: {
    padding: 15,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  mainText: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  detail: { fontSize: 12, lineHeight: 19, color: "#64748B" },
  dataItem: {
    marginVertical: 4,
    fontSize: 12,
    color: "#16A34A",
  },
  submitButton: {
    height: 54,
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: { color: "#FFFFFF", fontWeight: "700" },
});
