import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EmergencyHandoverScreen() {
  const [receivingFacility, setReceivingFacility] = useState("");
  const [receivingProvider, setReceivingProvider] = useState("");
  const [handoverNotes, setHandoverNotes] = useState("");
  const [urgency, setUrgency] = useState("Immediate");

  const handleHandover = () => {
    if (!receivingFacility.trim() || !receivingProvider.trim()) {
      Alert.alert(
        "Recipient required",
        "Please enter the receiving facility and provider.",
      );
      return;
    }

    Alert.alert(
      "Handover Submitted",
      "The emergency handover has been securely recorded.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.handoverIcon}>
            <Text style={styles.handoverIconText}>→</Text>
          </View>

          <Text style={styles.title}>Emergency Handover</Text>

          <Text style={styles.subtitle}>
            Transfer essential clinical information to the receiving provider
            without losing the patient's care history.
          </Text>
        </View>

        {/* Patient Summary */}
        <View style={styles.patientCard}>
          <View style={styles.patientAvatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>Patient A</Text>

            <Text style={styles.patientMeta}>
              RH-2026-00124 • Age 32 • Female
            </Text>

            <Text style={styles.patientComplaint}>Difficulty breathing</Text>
          </View>
        </View>

        {/* Clinical Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Clinical summary</Text>

          <SummaryRow label="Priority" value="Urgent" />
          <SummaryRow label="Assessment" value="Respiratory distress" />
          <SummaryRow label="Vital signs" value="BP 120/80 • SpO₂ 97%" />
          <SummaryRow
            label="Treatment"
            value="Initial stabilization provided"
          />
        </View>

        {/* Receiving Provider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Receiving provider</Text>

          <Text style={styles.label}>Receiving facility</Text>

          <TextInput
            value={receivingFacility}
            onChangeText={setReceivingFacility}
            placeholder="e.g. District Hospital"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Healthcare provider</Text>

          <TextInput
            value={receivingProvider}
            onChangeText={setReceivingProvider}
            placeholder="Provider name or department"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />
        </View>

        {/* Urgency */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Handover urgency</Text>

          <View style={styles.urgencyRow}>
            {["Immediate", "Urgent", "Routine"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.urgencyButton,
                  urgency === item && styles.selectedUrgency,
                ]}
                onPress={() => setUrgency(item)}
              >
                <Text
                  style={[
                    styles.urgencyText,
                    urgency === item && styles.selectedUrgencyText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Handover notes</Text>

          <TextInput
            value={handoverNotes}
            onChangeText={setHandoverNotes}
            placeholder="Include important information for the receiving provider..."
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            style={styles.notesInput}
          />
        </View>

        {/* Information Being Transferred */}
        <View style={styles.transferCard}>
          <Text style={styles.transferTitle}>Information included</Text>

          <TransferItem text="Patient identification" />
          <TransferItem text="Emergency assessment" />
          <TransferItem text="Vital signs" />
          <TransferItem text="Diagnosis and treatment" />
          <TransferItem text="Relevant medical documents" />
        </View>

        {/* Security */}
        <View style={styles.securityCard}>
          <Text style={styles.securityTitle}>🔐 Secure clinical handover</Text>

          <Text style={styles.securityText}>
            The handover should only be accessible to authorized healthcare
            professionals. Record the transfer for accountability and continuity
            of care.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleHandover}
          activeOpacity={0.85}
        >
          <Text style={styles.submitText}>Submit Secure Handover</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function TransferItem({ text }: { text: string }) {
  return (
    <View style={styles.transferItem}>
      <View style={styles.checkCircle}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.transferText}>{text}</Text>
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
    alignItems: "center",
    marginBottom: 22,
  },

  handoverIcon: {
    width: 65,
    height: 65,
    borderRadius: 23,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 13,
  },

  handoverIconText: {
    color: "#2563EB",
    fontSize: 32,
    fontWeight: "800",
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 7,
    color: "#64748B",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
  },

  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 15,
  },

  patientAvatar: {
    width: 49,
    height: 49,
    borderRadius: 17,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  patientMeta: {
    marginTop: 4,
    fontSize: 10,
    color: "#64748B",
  },

  patientComplaint: {
    marginTop: 5,
    fontSize: 11,
    color: "#334155",
    fontWeight: "600",
  },

  summaryCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 19,
    padding: 17,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 15,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },

  summaryLabel: {
    color: "#64748B",
    fontSize: 11,
  },

  summaryValue: {
    color: "#1E3A8A",
    fontSize: 11,
    fontWeight: "700",
    maxWidth: "60%",
    textAlign: "right",
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 7,
  },

  input: {
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 13,
    color: "#111827",
    marginBottom: 15,
  },

  urgencyRow: {
    flexDirection: "row",
    gap: 8,
  },

  urgencyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  selectedUrgency: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  urgencyText: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "800",
  },

  selectedUrgencyText: {
    color: "#FFFFFF",
  },

  notesInput: {
    height: 120,
    borderRadius: 15,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    fontSize: 12,
    color: "#111827",
  },

  transferCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 15,
  },

  transferTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },

  transferItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 7,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  check: {
    color: "#2563EB",
    fontWeight: "900",
    fontSize: 12,
  },

  transferText: {
    color: "#475569",
    fontSize: 11,
  },

  securityCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },

  securityTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },

  securityText: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 18,
  },

  submitButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
