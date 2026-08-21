import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  prescriptionId?: string;
  onBack?: () => void;
  onDispensed?: () => void;
};

export default function DispenseMedicationScreen({
  prescriptionId = "RX-1001",
  onBack,
  onDispensed,
}: Props) {
  const [quantity, setQuantity] = useState("21");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const dispense = () => {
    if (!confirmed) {
      Alert.alert(
        "Confirmation Required",
        "Please confirm that you have checked the medication and dosage.",
      );
      return;
    }

    Alert.alert(
      "Medication Dispensed",
      `Prescription ${prescriptionId} has been successfully completed.`,
      [{ text: "Done", onPress: onDispensed }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Dispense Medication</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.prescriptionCard}>
          <Text style={styles.rxLabel}>{prescriptionId}</Text>
          <Text style={styles.patient}>John Doe</Text>
          <Text style={styles.medication}>Amoxicillin 500 mg</Text>
          <Text style={styles.instructions}>
            1 capsule • 3 times daily • 7 days
          </Text>
        </View>

        <Text style={styles.label}>Quantity to Dispense</Text>
        <TextInput
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter quantity"
        />

        <Text style={styles.label}>Pharmacist Notes</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          style={[styles.input, styles.notesInput]}
          placeholder="Optional notes..."
          placeholderTextColor="#94A3B8"
        />

        <Pressable
          style={styles.confirmRow}
          onPress={() => setConfirmed(!confirmed)}
        >
          <View style={[styles.checkbox, confirmed && styles.checkboxSelected]}>
            {confirmed && <Text style={styles.checkmark}>✓</Text>}
          </View>

          <Text style={styles.confirmText}>
            I confirm the medication, dosage, quantity, and patient have been
            verified.
          </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={dispense}>
          <Text style={styles.buttonText}>Confirm Dispensing</Text>
        </Pressable>
      </View>
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
  content: { padding: 20 },
  prescriptionCard: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
  },
  rxLabel: { fontSize: 10, fontWeight: "700", color: "#2563EB" },
  patient: {
    marginTop: 7,
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },
  medication: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
  },
  instructions: { marginTop: 6, fontSize: 12, color: "#64748B" },
  label: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  input: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    color: "#1E293B",
  },
  notesInput: {
    height: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  confirmRow: {
    flexDirection: "row",
    marginTop: 22,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#2563EB",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: { backgroundColor: "#2563EB" },
  checkmark: { color: "#FFFFFF", fontWeight: "700" },
  confirmText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#475569",
  },
  button: {
    height: 54,
    marginTop: 28,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
});
