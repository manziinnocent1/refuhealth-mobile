import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const results = [
  {
    name: "Hemoglobin",
    result: "12.8",
    unit: "g/dL",
    reference: "12.0–16.0",
  },
  {
    name: "White blood cells",
    result: "8.4",
    unit: "×10⁹/L",
    reference: "4.0–11.0",
  },
  {
    name: "Platelets",
    result: "250",
    unit: "×10⁹/L",
    reference: "150–450",
  },
];

export default function ReviewResultsScreen() {
  const handleApprove = () => {
    Alert.alert(
      "Results Approved",
      "The laboratory results have been verified and released according to your workflow.",
    );
  };

  const handleReturn = () => {
    Alert.alert(
      "Returned for Correction",
      "The result has been returned to the laboratory technician for correction.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Review Results</Text>

          <Text style={styles.subtitle}>
            Verify the results before they become available for clinical
            decision-making.
          </Text>
        </View>

        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>Patient A</Text>

            <Text style={styles.patientMeta}>
              RH-2026-00124 • Age 32 • Female
            </Text>

            <Text style={styles.testName}>
              Complete Blood Count • LAB-00124
            </Text>
          </View>
        </View>

        <View style={styles.reviewBanner}>
          <View style={styles.bannerDot} />

          <View>
            <Text style={styles.bannerTitle}>Awaiting verification</Text>

            <Text style={styles.bannerText}>
              Review the values and laboratory comments before approval.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Results</Text>

          {results.map((result) => (
            <View key={result.name} style={styles.resultRow}>
              <View style={styles.resultInfo}>
                <Text style={styles.resultName}>{result.name}</Text>
                <Text style={styles.reference}>
                  Reference: {result.reference}
                </Text>
              </View>

              <View style={styles.resultValue}>
                <Text style={styles.value}>{result.result}</Text>
                <Text style={styles.unit}>{result.unit}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Laboratory comments</Text>

          <Text style={styles.comment}>
            Results reviewed against the laboratory's configured reference
            ranges.
          </Text>
        </View>

        <View style={styles.auditCard}>
          <Text style={styles.auditTitle}>Verification record</Text>

          <AuditRow label="Entered by" value="Laboratory Technician" />
          <AuditRow label="Entered at" value="11:06 AM" />
          <AuditRow label="Status" value="Awaiting review" />
        </View>

        <TouchableOpacity
          style={styles.approveButton}
          onPress={handleApprove}
          activeOpacity={0.85}
        >
          <Text style={styles.approveText}>Approve & Release Results</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.returnButton} onPress={handleReturn}>
          <Text style={styles.returnText}>Return for Correction</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function AuditRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.auditRow}>
      <Text style={styles.auditLabel}>{label}</Text>
      <Text style={styles.auditValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 45,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
  },

  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 14,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#2563EB",
    fontSize: 18,
    fontWeight: "900",
  },

  patientInfo: {
    flex: 1,
  },

  patientName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },

  patientMeta: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 10,
  },

  testName: {
    marginTop: 5,
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "700",
  },

  reviewBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 15,
  },

  bannerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB",
    marginRight: 11,
  },

  bannerTitle: {
    color: "#1E3A8A",
    fontSize: 12,
    fontWeight: "800",
  },

  bannerText: {
    marginTop: 3,
    color: "#64748B",
    fontSize: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 15,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  resultInfo: {
    flex: 1,
  },

  resultName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#334155",
  },

  reference: {
    marginTop: 4,
    fontSize: 9,
    color: "#94A3B8",
  },

  resultValue: {
    alignItems: "flex-end",
  },

  value: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0F172A",
  },

  unit: {
    marginTop: 2,
    color: "#64748B",
    fontSize: 9,
  },

  comment: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 18,
  },

  auditCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },

  auditTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  auditRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },

  auditLabel: {
    color: "#64748B",
    fontSize: 10,
  },

  auditValue: {
    color: "#334155",
    fontSize: 10,
    fontWeight: "700",
  },

  approveButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  approveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  returnButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },

  returnText: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "800",
  },
});
