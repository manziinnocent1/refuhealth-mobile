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
  patientName?: string;
  patientId?: string;
  onBack?: () => void;
  onRecordVitals?: () => void;
  onAssessment?: () => void;
};

export default function TriageScreen({
  patientName = "John Doe",
  patientId = "PT-001245",
  onBack,
  onRecordVitals,
  onAssessment,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Patient Triage</Text>

        <View style={styles.patientCard}>
          <Text style={styles.label}>CURRENT PATIENT</Text>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.patientId}>{patientId}</Text>
        </View>

        <Text style={styles.sectionTitle}>Triage Progress</Text>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Record Vital Signs</Text>
            <Text style={styles.stepDescription}>
              Capture temperature, blood pressure, pulse and other vitals.
            </Text>
            <Pressable onPress={onRecordVitals}>
              <Text style={styles.stepAction}>Record Vitals →</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Triage Assessment</Text>
            <Text style={styles.stepDescription}>
              Assess symptoms and determine patient priority.
            </Text>
            <Pressable onPress={onAssessment}>
              <Text style={styles.stepAction}>Continue Assessment →</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20 },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: "700",
    color: "#0F172A",
  },
  patientCard: {
    marginTop: 24,
    padding: 17,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
  },
  label: { fontSize: 10, fontWeight: "700", color: "#2563EB" },
  patientName: {
    marginTop: 6,
    fontSize: 19,
    fontWeight: "700",
    color: "#1E293B",
  },
  patientId: { marginTop: 4, fontSize: 11, color: "#64748B" },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 15,
    fontSize: 17,
    fontWeight: "700",
    color: "#334155",
  },
  step: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
  },
  stepNumber: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  stepNumberText: { color: "#FFFFFF", fontWeight: "700" },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 14, fontWeight: "700", color: "#334155" },
  stepDescription: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 17,
    color: "#64748B",
  },
  stepAction: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "700",
    color: "#2563EB",
  },
});
