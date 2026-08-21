import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  referralId?: string;
  onBack?: () => void;
  onDone?: () => void;
};

export default function ReferralOutcomeScreen({
  referralId = "REF-2026-00124",
  onBack,
  onDone,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Referral Outcome</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successCircle}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.outcomeTitle}>Referral Completed</Text>
        <Text style={styles.outcomeSubtitle}>{referralId}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Receiving Facility</Text>
          <Text style={styles.value}>Kigali Referral Hospital</Text>

          <Text style={styles.label}>Outcome</Text>
          <Text style={styles.value}>
            Patient received specialist assessment and follow-up plan.
          </Text>

          <Text style={styles.label}>Completed</Text>
          <Text style={styles.value}>Today, 2:30 PM</Text>
        </View>

        <Pressable style={styles.doneButton} onPress={onDone}>
          <Text style={styles.doneButtonText}>Done</Text>
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
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
  content: { padding: 25, alignItems: "center" },
  successCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  successIcon: { fontSize: 40, color: "#16A34A", fontWeight: "700" },
  outcomeTitle: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  outcomeSubtitle: { marginTop: 5, fontSize: 12, color: "#64748B" },
  card: {
    width: "100%",
    marginTop: 28,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  label: {
    marginTop: 12,
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
  },
  value: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 20,
    color: "#334155",
  },
  doneButton: {
    width: "100%",
    height: 54,
    marginTop: 28,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: { color: "#FFFFFF", fontWeight: "700" },
});
