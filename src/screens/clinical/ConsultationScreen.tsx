import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onMedicalHistory?: () => void;
  onDiagnosis?: () => void;
  onPrescription?: () => void;
  onLaboratory?: () => void;
  onComplete?: () => void;
};

const COLORS = {
  blue: "#1565D8",
  white: "#FFFFFF",
  black: "#111827",
  gray500: "#6B7280",
  gray300: "#D1D5DB",
  gray200: "#E5E7EB",
  background: "#F7F9FC",
  lightBlue: "#EAF2FF",
};

export default function ConsultationScreen({
  onMedicalHistory,
  onDiagnosis,
  onPrescription,
  onLaboratory,
  onComplete,
}: Props) {
  const [notes, setNotes] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.topBar}>
          <View>
            <Text style={styles.label}>CONSULTATION</Text>
            <Text style={styles.title}>Patient assessment</Text>
          </View>

          <View style={styles.status}>
            <View style={styles.dot} />
            <Text style={styles.statusText}>ACTIVE</Text>
          </View>
        </View>

        {/* Patient */}
        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={25} color={COLORS.blue} />
          </View>

          <View style={styles.patientInfo}>
            <Text style={styles.patientName}>Patient #RH-2026-0148</Text>
            <Text style={styles.patientDetails}>32 years • Female</Text>
            <Text style={styles.patientDetails}>Camp Health Facility</Text>
          </View>
        </View>

        {/* Vital Signs */}
        <Text style={styles.sectionTitle}>Vital signs</Text>

        <View style={styles.vitalsRow}>
          <Vital label="Blood Pressure" value="120/80" unit="mmHg" />
          <Vital label="Heart Rate" value="76" unit="bpm" />
        </View>

        <View style={styles.vitalsRow}>
          <Vital label="Temperature" value="36.8" unit="°C" />
          <Vital label="Oxygen" value="98" unit="%" />
        </View>

        {/* Clinical Notes */}
        <Text style={styles.sectionTitle}>Clinical notes</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Record the patient's symptoms, observations and clinical findings..."
            placeholderTextColor={COLORS.gray500}
            multiline
            textAlignVertical="top"
            style={styles.textInput}
          />
        </View>

        {/* Clinical Actions */}
        <Text style={styles.sectionTitle}>Clinical workflow</Text>

        <ClinicalAction
          icon="document-text-outline"
          title="Medical History"
          description="Review previous visits and medical records"
          onPress={onMedicalHistory}
        />

        <ClinicalAction
          icon="fitness-outline"
          title="Diagnosis"
          description="Record assessment and diagnosis"
          onPress={onDiagnosis}
        />

        <ClinicalAction
          icon="medkit-outline"
          title="Prescription"
          description="Create and review medications"
          onPress={onPrescription}
        />

        <ClinicalAction
          icon="flask-outline"
          title="Laboratory Orders"
          description="Request diagnostic laboratory tests"
          onPress={onLaboratory}
        />

        <TouchableOpacity
          style={styles.completeButton}
          onPress={onComplete}
          activeOpacity={0.85}
        >
          <Text style={styles.completeText}>Complete Consultation</Text>

          <Ionicons
            name="checkmark-circle-outline"
            size={22}
            color={COLORS.white}
          />
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

      <View style={styles.vitalValueRow}>
        <Text style={styles.vitalValue}>{value}</Text>
        <Text style={styles.vitalUnit}>{unit}</Text>
      </View>
    </View>
  );
}

function ClinicalAction({
  icon,
  title,
  description,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={22} color={COLORS.blue} />
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionDescription}>{description}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color={COLORS.gray300} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: COLORS.blue,
  },

  title: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.black,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 9,
    paddingVertical: 7,
    borderRadius: 12,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.blue,
    marginRight: 5,
  },

  statusText: {
    fontSize: 8,
    fontWeight: "900",
    color: COLORS.blue,
  },

  patientCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  patientInfo: {
    marginLeft: 13,
    flex: 1,
  },

  patientName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  patientDetails: {
    marginTop: 4,
    fontSize: 10,
    color: COLORS.gray500,
  },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 11,
    fontSize: 16,
    fontWeight: "850",
    color: COLORS.black,
  },

  vitalsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  vitalCard: {
    flex: 1,
    padding: 14,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  vitalLabel: {
    fontSize: 10,
    color: COLORS.gray500,
  },

  vitalValueRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "baseline",
  },

  vitalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.black,
  },

  vitalUnit: {
    marginLeft: 5,
    fontSize: 9,
    color: COLORS.gray500,
  },

  inputContainer: {
    minHeight: 145,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 13,
  },

  textInput: {
    flex: 1,
    minHeight: 115,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.black,
  },

  actionCard: {
    minHeight: 76,
    marginBottom: 10,
    padding: 13,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  actionContent: {
    flex: 1,
    marginLeft: 12,
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
  },

  actionDescription: {
    marginTop: 4,
    fontSize: 10,
    color: COLORS.gray500,
  },

  completeButton: {
    marginTop: 16,
    height: 57,
    borderRadius: 29,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  completeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
