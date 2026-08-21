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
  patientId?: string;
  patientName?: string;
  onBack?: () => void;
  onVisitCreated?: () => void;
};

export default function CreateVisitScreen({
  patientId = "PT-001245",
  patientName = "John Doe",
  onBack,
  onVisitCreated,
}: Props) {
  const [reason, setReason] = useState("");
  const [department, setDepartment] = useState("General Consultation");

  const createVisit = () => {
    if (!reason.trim()) {
      Alert.alert("Reason Required", "Please enter the reason for the visit.");
      return;
    }

    onVisitCreated?.();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Create Visit</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.patientCard}>
          <Text style={styles.patientLabel}>PATIENT</Text>
          <Text style={styles.patientName}>{patientName}</Text>
          <Text style={styles.patientId}>{patientId}</Text>
        </View>

        <Text style={styles.label}>Department</Text>
        <Pressable
          style={styles.select}
          onPress={() =>
            setDepartment(
              department === "General Consultation"
                ? "Specialist Clinic"
                : "General Consultation",
            )
          }
        >
          <Text style={styles.selectText}>{department}</Text>
          <Text style={styles.arrow}>⌄</Text>
        </Pressable>

        <Text style={styles.label}>Reason for Visit *</Text>
        <TextInput
          value={reason}
          onChangeText={setReason}
          multiline
          placeholder="Describe the reason for today's visit..."
          placeholderTextColor="#94A3B8"
          style={styles.reasonInput}
        />

        <Pressable style={styles.createButton} onPress={createVisit}>
          <Text style={styles.createButtonText}>
            Create Visit & Add to Queue
          </Text>
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
  title: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20 },
  patientCard: {
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
  patientId: { marginTop: 4, fontSize: 11, color: "#64748B" },
  label: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  select: {
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: { fontSize: 13, color: "#334155" },
  arrow: { fontSize: 20, color: "#64748B" },
  reasonInput: {
    height: 120,
    padding: 14,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    textAlignVertical: "top",
  },
  createButton: {
    height: 54,
    marginTop: 28,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
