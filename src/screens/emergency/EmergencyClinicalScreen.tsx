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

export default function EmergencyClinicalScreen() {
  const [consciousness, setConsciousness] = useState("Alert");
  const [priority, setPriority] = useState("Urgent");
  const [assessment, setAssessment] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");

  const handleSave = () => {
    Alert.alert(
      "Clinical Assessment Saved",
      "The emergency clinical assessment has been recorded.",
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
          <View>
            <Text style={styles.title}>Emergency Assessment</Text>
            <Text style={styles.subtitle}>
              Rapid clinical assessment and treatment documentation.
            </Text>
          </View>

          <View style={styles.caseBadge}>
            <Text style={styles.caseBadgeText}>ER-001</Text>
          </View>
        </View>

        {/* Patient */}
        <View style={styles.patientCard}>
          <View style={styles.patientAvatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>Patient A</Text>
            <Text style={styles.patientMeta}>Patient ID: RH-2026-00124</Text>
            <Text style={styles.patientMeta}>Age 32 • Female</Text>
          </View>

          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>URGENT</Text>
          </View>
        </View>

        {/* Triage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rapid triage</Text>

          <Text style={styles.label}>Level of consciousness</Text>

          <View style={styles.optionsRow}>
            {["Alert", "Confused", "Unresponsive"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  consciousness === item && styles.selectedOption,
                ]}
                onPress={() => setConsciousness(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    consciousness === item && styles.selectedOptionText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Priority level</Text>

          <View style={styles.priorityRow}>
            {["Critical", "Urgent", "Stable"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.priorityOption,
                  priority === item && styles.selectedPriority,
                ]}
                onPress={() => setPriority(item)}
              >
                <Text
                  style={[
                    styles.priorityOptionText,
                    priority === item && styles.selectedPriorityText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vitals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vital signs</Text>

          <View style={styles.vitalsGrid}>
            <Vital label="Blood Pressure" value="120/80" unit="mmHg" />
            <Vital label="Heart Rate" value="82" unit="bpm" />
            <Vital label="Temperature" value="37.2" unit="°C" />
            <Vital label="SpO₂" value="97" unit="%" />
          </View>
        </View>

        {/* Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinical assessment</Text>

          <Text style={styles.label}>Assessment notes</Text>

          <TextInput
            value={assessment}
            onChangeText={setAssessment}
            placeholder="Document clinical findings..."
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            style={styles.textArea}
          />

          <Text style={styles.label}>Working diagnosis</Text>

          <TextInput
            value={diagnosis}
            onChangeText={setDiagnosis}
            placeholder="Enter working diagnosis..."
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Immediate treatment</Text>

          <TextInput
            value={treatment}
            onChangeText={setTreatment}
            placeholder="Record treatment provided..."
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            style={styles.textArea}
          />
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text style={styles.saveText}>Save Clinical Assessment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.handoverButton}>
          <Text style={styles.handoverText}>Continue to Handover</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Vital({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <View style={styles.vitalCard}>
      <Text style={styles.vitalLabel}>{label}</Text>
      <Text style={styles.vitalValue}>{value}</Text>
      <Text style={styles.vitalUnit}>{unit}</Text>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 11,
    lineHeight: 17,
    maxWidth: 260,
  },

  caseBadge: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },

  caseBadgeText: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "900",
  },

  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 18,
  },

  patientAvatar: {
    width: 48,
    height: 48,
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
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  patientMeta: {
    marginTop: 3,
    fontSize: 10,
    color: "#64748B",
  },

  priorityBadge: {
    backgroundColor: "#0F172A",
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  priorityText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
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
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 7,
    marginTop: 5,
  },

  optionsRow: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 17,
  },

  option: {
    flex: 1,
    minHeight: 43,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  selectedOption: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  optionText: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "700",
  },

  selectedOptionText: {
    color: "#FFFFFF",
  },

  priorityRow: {
    flexDirection: "row",
    gap: 8,
  },

  priorityOption: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },

  selectedPriority: {
    backgroundColor: "#0F172A",
    borderColor: "#0F172A",
  },

  priorityOptionText: {
    color: "#64748B",
    fontSize: 10,
    fontWeight: "800",
  },

  selectedPriorityText: {
    color: "#FFFFFF",
  },

  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 9,
  },

  vitalCard: {
    width: "48%",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 13,
  },

  vitalLabel: {
    fontSize: 9,
    color: "#64748B",
  },

  vitalValue: {
    marginTop: 5,
    fontSize: 19,
    fontWeight: "900",
    color: "#0F172A",
  },

  vitalUnit: {
    fontSize: 9,
    color: "#94A3B8",
  },

  textArea: {
    height: 105,
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 13,
    fontSize: 12,
    color: "#111827",
    marginBottom: 15,
  },

  input: {
    height: 50,
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 13,
    fontSize: 12,
    color: "#111827",
    marginBottom: 15,
  },

  saveButton: {
    height: 55,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  handoverButton: {
    height: 55,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },

  handoverText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "800",
  },
});
