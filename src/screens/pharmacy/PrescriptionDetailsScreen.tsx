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
  prescriptionId?: string;
  onBack?: () => void;
  onDispense?: (id: string) => void;
};

export default function PrescriptionDetailsScreen({
  prescriptionId = "RX-1001",
  onBack,
  onDispense,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Prescription Details</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>STATUS</Text>
          <Text style={styles.statusValue}>Pending Dispensing</Text>
          <Text style={styles.prescriptionId}>{prescriptionId}</Text>
        </View>

        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.card}>
          <Text style={styles.patientName}>John Doe</Text>
          <Text style={styles.detail}>Patient ID: PT-001245</Text>
          <Text style={styles.detail}>Age: 34 years</Text>
        </View>

        <Text style={styles.sectionTitle}>Prescription</Text>
        <View style={styles.card}>
          <Text style={styles.medication}>Amoxicillin 500 mg</Text>
          <Text style={styles.detail}>Dosage: 1 capsule</Text>
          <Text style={styles.detail}>Frequency: 3 times daily</Text>
          <Text style={styles.detail}>Duration: 7 days</Text>
          <Text style={styles.detail}>Quantity: 21 capsules</Text>
        </View>

        <Text style={styles.sectionTitle}>Prescriber</Text>
        <View style={styles.card}>
          <Text style={styles.detail}>Dr. Sarah Johnson</Text>
          <Text style={styles.detail}>Issued: Today, 9:40 AM</Text>
        </View>

        <Pressable
          style={styles.dispenseButton}
          onPress={() => onDispense?.(prescriptionId)}
        >
          <Text style={styles.dispenseButtonText}>Continue to Dispense</Text>
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
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: { fontSize: 17, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20, paddingBottom: 40 },
  statusCard: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#FEF3C7",
  },
  statusLabel: { fontSize: 10, fontWeight: "700", color: "#92400E" },
  statusValue: {
    marginTop: 5,
    fontSize: 19,
    fontWeight: "700",
    color: "#78350F",
  },
  prescriptionId: { marginTop: 6, fontSize: 11, color: "#A16207" },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  patientName: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  medication: { fontSize: 17, fontWeight: "700", color: "#2563EB" },
  detail: { marginTop: 7, fontSize: 13, color: "#64748B" },
  dispenseButton: {
    height: 54,
    marginTop: 28,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  dispenseButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
