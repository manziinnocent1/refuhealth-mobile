import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  patientId?: string;
  patientName?: string;
  onBack?: () => void;
  onNext?: (reason: string) => void;
};

export default function CreateReferralScreen({
  patientId = "PT-001245",
  patientName = "John Doe",
  onBack,
  onNext,
}: Props) {
  const [reason, setReason] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Create Referral</Text>
        <Text style={styles.subtitle}>Start a referral for this patient.</Text>

        <View style={styles.patientCard}>
          <Text style={styles.patientLabel}>PATIENT</Text>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.patientId}>{patientId}</Text>
        </View>

        <Text style={styles.label}>Reason for Referral *</Text>

        <TextInput
          value={reason}
          onChangeText={setReason}
          multiline
          placeholder="Describe why the patient needs a referral..."
          placeholderTextColor="#94A3B8"
          style={styles.textArea}
        />

        <Text style={styles.hint}>
          Include relevant symptoms, diagnosis, or services required.
        </Text>

        <Pressable
          style={[styles.nextButton, !reason.trim() && styles.disabledButton]}
          onPress={() => reason.trim() && onNext?.(reason.trim())}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: {
    marginTop: 14,
    fontSize: 25,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: { marginTop: 6, fontSize: 13, color: "#64748B" },
  patientCard: {
    marginTop: 24,
    padding: 16,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
  },
  patientLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2563EB",
  },
  patientName: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  patientId: {
    marginTop: 4,
    fontSize: 11,
    color: "#64748B",
  },
  label: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  textArea: {
    height: 150,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
    color: "#1E293B",
  },
  hint: {
    marginTop: 8,
    fontSize: 11,
    lineHeight: 17,
    color: "#94A3B8",
  },
  nextButton: {
    height: 54,
    marginTop: 30,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: { backgroundColor: "#CBD5E1" },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
