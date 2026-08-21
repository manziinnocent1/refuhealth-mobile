import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DocumentViewerScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Document Viewer</Text>
            <Text style={styles.subtitle}>Laboratory Report</Text>
          </View>

          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareIcon}>↗</Text>
          </TouchableOpacity>
        </View>

        {/* Secure Badge */}
        <View style={styles.secureBadge}>
          <Text style={styles.secureText}>🔒 Secure medical document</Text>
        </View>

        {/* Document Preview */}
        <ScrollView
          style={styles.previewContainer}
          contentContainerStyle={styles.previewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.document}>
            <View style={styles.documentHeader}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>RH</Text>
              </View>

              <View>
                <Text style={styles.hospitalName}>RefuHealth</Text>
                <Text style={styles.hospitalSubtitle}>
                  Healthcare Information System
                </Text>
              </View>
            </View>

            <View style={styles.documentDivider} />

            <Text style={styles.documentTitle}>LABORATORY REPORT</Text>

            <View style={styles.patientInfo}>
              <InfoRow label="Patient" value="Patient Name" />
              <InfoRow label="Patient ID" value="RH-2026-00124" />
              <InfoRow label="Date" value="12 August 2026" />
            </View>

            <Text style={styles.resultTitle}>Laboratory Results</Text>

            <View style={styles.resultTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Test</Text>
                <Text style={styles.tableHeaderText}>Result</Text>
                <Text style={styles.tableHeaderText}>Reference</Text>
              </View>

              <ResultRow
                test="Hemoglobin"
                result="13.4 g/dL"
                reference="12–16"
              />

              <ResultRow
                test="White Blood Cells"
                result="6.8 ×10⁹/L"
                reference="4–11"
              />

              <ResultRow
                test="Platelets"
                result="245 ×10⁹/L"
                reference="150–450"
              />
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Digitally recorded healthcare document
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryText}>Share Securely</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ResultRow({
  test,
  result,
  reference,
}: {
  test: string;
  result: string;
  reference: string;
}) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultCell}>{test}</Text>
      <Text style={styles.resultCell}>{result}</Text>
      <Text style={styles.resultCell}>{reference}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 3,
    color: "#64748B",
    fontSize: 12,
  },

  shareButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  shareIcon: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "800",
  },

  secureBadge: {
    alignSelf: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginBottom: 12,
  },

  secureText: {
    color: "#1E3A8A",
    fontSize: 11,
    fontWeight: "700",
  },

  previewContainer: {
    flex: 1,
  },

  previewContent: {
    padding: 15,
    paddingBottom: 25,
  },

  document: {
    backgroundColor: "#FFFFFF",
    minHeight: 600,
    padding: 25,
    borderRadius: 4,
  },

  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  logoText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 14,
  },

  hospitalName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },

  hospitalSubtitle: {
    marginTop: 2,
    fontSize: 9,
    color: "#64748B",
  },

  documentDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 20,
  },

  documentTitle: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 20,
  },

  patientInfo: {
    marginBottom: 25,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },

  infoLabel: {
    fontSize: 11,
    color: "#64748B",
  },

  infoValue: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },

  resultTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  resultTable: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },

  tableHeaderText: {
    flex: 1,
    fontSize: 9,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  resultRow: {
    flexDirection: "row",
    paddingVertical: 11,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  resultCell: {
    flex: 1,
    fontSize: 9,
    color: "#475569",
  },

  footer: {
    marginTop: 35,
    alignItems: "center",
  },

  footerText: {
    color: "#94A3B8",
    fontSize: 9,
  },

  bottomActions: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 10,
  },

  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryText: {
    color: "#334155",
    fontWeight: "800",
    fontSize: 13,
  },

  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },
});
