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

export default function EnterResultsScreen() {
  const [hemoglobin, setHemoglobin] = useState("");
  const [whiteCells, setWhiteCells] = useState("");
  const [platelets, setPlatelets] = useState("");
  const [comments, setComments] = useState("");

  const handleSave = () => {
    Alert.alert(
      "Results Saved",
      "The laboratory results have been saved and are ready for review.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Enter Results</Text>

          <Text style={styles.subtitle}>
            Record the laboratory findings accurately before submitting them for
            verification.
          </Text>
        </View>

        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>

          <View>
            <Text style={styles.patientName}>Patient A</Text>
            <Text style={styles.patientMeta}>
              LAB-00124 • Complete Blood Count
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Test results</Text>

          <ResultInput
            label="Hemoglobin"
            unit="g/dL"
            value={hemoglobin}
            onChangeText={setHemoglobin}
          />

          <ResultInput
            label="White blood cells"
            unit="×10⁹/L"
            value={whiteCells}
            onChangeText={setWhiteCells}
          />

          <ResultInput
            label="Platelets"
            unit="×10⁹/L"
            value={platelets}
            onChangeText={setPlatelets}
          />

          <Text style={styles.referenceTitle}>Reference ranges</Text>

          <Text style={styles.referenceText}>
            Reference ranges should be configured according to the laboratory's
            approved standards and patient-specific factors where applicable.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Laboratory comments</Text>

          <TextInput
            value={comments}
            onChangeText={setComments}
            placeholder="Add relevant laboratory observations..."
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            style={styles.notesInput}
          />
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Before submission</Text>

          <Text style={styles.warningText}>
            Confirm that all entered values are accurate and correspond to the
            correct patient and specimen.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveText}>Save & Submit for Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ResultInput({
  label,
  unit,
  value,
  onChangeText,
}: {
  label: string;
  unit: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.resultRow}>
      <View style={styles.resultLabel}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="—"
        placeholderTextColor="#94A3B8"
        keyboardType="decimal-pad"
        style={styles.resultInput}
      />
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
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },

  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 15,
  },

  avatar: {
    width: 47,
    height: 47,
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

  patientName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },

  patientMeta: {
    marginTop: 5,
    fontSize: 10,
    color: "#64748B",
  },

  card: {
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
    marginBottom: 16,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  resultLabel: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },

  unit: {
    marginTop: 3,
    fontSize: 9,
    color: "#94A3B8",
  },

  resultInput: {
    width: 110,
    height: 47,
    borderRadius: 13,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 13,
    textAlign: "center",
    color: "#111827",
    fontSize: 13,
    fontWeight: "700",
  },

  referenceTitle: {
    marginTop: 7,
    fontSize: 11,
    fontWeight: "800",
    color: "#334155",
  },

  referenceText: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 10,
    lineHeight: 17,
  },

  notesInput: {
    height: 110,
    borderRadius: 15,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 13,
    color: "#111827",
    fontSize: 12,
  },

  warningCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
  },

  warningTitle: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "800",
  },

  warningText: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 10,
    lineHeight: 17,
  },

  saveButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
