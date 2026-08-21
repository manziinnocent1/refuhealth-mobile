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
  onOpenPrescriptionQueue?: () => void;
  onOpenMedicationHistory?: () => void;
  onOpenPrescription?: (prescriptionId: string) => void;
};

const recentPrescriptions = [
  {
    id: "RX-1001",
    patient: "John Doe",
    medication: "Amoxicillin 500 mg",
    status: "Pending",
  },
  {
    id: "RX-1002",
    patient: "Mary Smith",
    medication: "Paracetamol 500 mg",
    status: "Ready",
  },
  {
    id: "RX-1003",
    patient: "David Wilson",
    medication: "Metformin 500 mg",
    status: "Pending",
  },
];

export default function PharmacyDashboardScreen({
  onOpenPrescriptionQueue,
  onOpenMedicationHistory,
  onOpenPrescription,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Pharmacy</Text>
            <Text style={styles.subtitle}>
              Manage prescriptions and medication dispensing
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>PH</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Ready</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>34</Text>
            <Text style={styles.statLabel}>Dispensed Today</Text>
          </View>
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertIcon}>!</Text>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>
              3 prescriptions need attention
            </Text>
            <Text style={styles.alertText}>
              Review prescriptions with stock or validation issues.
            </Text>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Pressable
            style={styles.primaryAction}
            onPress={onOpenPrescriptionQueue}
          >
            <Text style={styles.primaryActionIcon}>▤</Text>
            <Text style={styles.primaryActionText}>Prescription Queue</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryAction}
            onPress={onOpenMedicationHistory}
          >
            <Text style={styles.secondaryActionIcon}>◷</Text>
            <Text style={styles.secondaryActionText}>Medication History</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
          <Pressable onPress={onOpenPrescriptionQueue}>
            <Text style={styles.viewAllText}>View all</Text>
          </Pressable>
        </View>

        {recentPrescriptions.map((item) => (
          <Pressable
            key={item.id}
            style={styles.prescriptionCard}
            onPress={() => onOpenPrescription?.(item.id)}
          >
            <View style={styles.prescriptionIcon}>
              <Text style={styles.prescriptionIconText}>Rx</Text>
            </View>

            <View style={styles.prescriptionContent}>
              <Text style={styles.patientName}>{item.patient}</Text>
              <Text style={styles.medication}>{item.medication}</Text>
              <Text style={styles.prescriptionId}>{item.id}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                item.status === "Ready" && styles.readyBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.status === "Ready" && styles.readyText,
                ]}
              >
                {item.status}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 4, fontSize: 13, color: "#64748B" },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#FFFFFF", fontWeight: "700" },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statNumber: { fontSize: 22, fontWeight: "700", color: "#2563EB" },
  statLabel: { marginTop: 5, fontSize: 10, color: "#64748B" },
  alertCard: {
    margin: 20,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FEF3C7",
    flexDirection: "row",
  },
  alertIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F59E0B",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
    fontWeight: "700",
    marginRight: 10,
  },
  alertContent: { flex: 1 },
  alertTitle: { fontSize: 13, fontWeight: "700", color: "#92400E" },
  alertText: { marginTop: 3, fontSize: 11, color: "#A16207" },
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
  },
  primaryAction: {
    flex: 1,
    minHeight: 90,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#2563EB",
  },
  primaryActionIcon: { fontSize: 22, color: "#FFFFFF" },
  primaryActionText: {
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  secondaryAction: {
    flex: 1,
    minHeight: 90,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  secondaryActionIcon: { fontSize: 22, color: "#2563EB" },
  secondaryActionText: {
    marginTop: 10,
    color: "#334155",
    fontSize: 13,
    fontWeight: "700",
  },
  sectionHeader: {
    marginTop: 28,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#1E293B" },
  viewAllText: { fontSize: 12, fontWeight: "700", color: "#2563EB" },
  prescriptionCard: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  prescriptionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  prescriptionIconText: { color: "#2563EB", fontWeight: "700" },
  prescriptionContent: { flex: 1 },
  patientName: { fontSize: 14, fontWeight: "700", color: "#334155" },
  medication: { marginTop: 3, fontSize: 11, color: "#64748B" },
  prescriptionId: { marginTop: 4, fontSize: 10, color: "#94A3B8" },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#FEF3C7",
  },
  readyBadge: { backgroundColor: "#DCFCE7" },
  statusText: { fontSize: 10, fontWeight: "700", color: "#D97706" },
  readyText: { color: "#16A34A" },
});
