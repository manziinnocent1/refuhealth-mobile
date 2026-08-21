import React from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

type Props = {
  patientName?: string;
  patientId?: string;
  onCreateVisit?: () => void;
  onDone?: () => void;
};

export default function PatientRegistrationSuccessScreen({
  patientName = "John Doe",
  patientId = "PT-001245",
  onCreateVisit,
  onDone,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Text style={styles.successIcon}>✓</Text>
        </View>

        <Text style={styles.title}>Patient Registered</Text>

        <Text style={styles.description}>
          {patientName} has been successfully registered in the healthcare
          system.
        </Text>

        <View style={styles.idCard}>
          <Text style={styles.idLabel}>PATIENT ID</Text>
          <Text style={styles.idValue}>{patientId}</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={onCreateVisit}>
          <Text style={styles.primaryButtonText}>Create a Visit</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onDone}>
          <Text style={styles.secondaryButtonText}>Done</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
  },
  content: { padding: 28, alignItems: "center" },
  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: { fontSize: 45, fontWeight: "700", color: "#16A34A" },
  title: {
    marginTop: 22,
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  description: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },
  idCard: {
    width: "100%",
    marginTop: 25,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  idLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#94A3B8",
  },
  idValue: {
    marginTop: 7,
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
  },
  primaryButton: {
    width: "100%",
    height: 54,
    marginTop: 28,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "700" },
  secondaryButton: {
    width: "100%",
    height: 52,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#64748B",
    fontWeight: "700",
  },
});
