import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  blue: "#1565D8",
  white: "#FFFFFF",
  black: "#111827",
  gray700: "#374151",
  gray500: "#6B7280",
  gray300: "#D1D5DB",
  gray200: "#E5E7EB",
  gray100: "#F3F4F6",
  background: "#F8FAFC",
  green: "#16A34A",
  red: "#DC2626",
};

export default function PatientVisitScreen() {
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");

  const handleSaveVisit = () => {
    if (!chiefComplaint.trim()) {
      Alert.alert(
        "Incomplete Information",
        "Please enter the patient's chief complaint.",
      );
      return;
    }

    Alert.alert(
      "Visit Saved",
      "The patient visit has been recorded successfully.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <Ionicons name="medkit-outline" size={25} color={COLORS.blue} />
            </View>

            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Patient Visit</Text>
              <Text style={styles.subtitle}>
                Record today's clinical encounter.
              </Text>
            </View>
          </View>

          {/* Patient Card */}
          <View style={styles.patientCard}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={24} color={COLORS.blue} />
            </View>

            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>Patient Name</Text>
              <Text style={styles.patientId}>ID: RF-000001</Text>
            </View>

            <View style={styles.visitBadge}>
              <Ionicons name="time-outline" size={13} color={COLORS.green} />
              <Text style={styles.visitBadgeText}>TODAY</Text>
            </View>
          </View>

          {/* Visit Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Visit Details</Text>

            <Text style={styles.label}>
              Chief Complaint <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={chiefComplaint}
                onChangeText={setChiefComplaint}
                placeholder="What brought the patient today?"
                placeholderTextColor={COLORS.gray500}
                style={styles.input}
                multiline
              />
            </View>

            <Text style={styles.label}>Symptoms & Observations</Text>

            <View style={[styles.inputContainer, styles.largeInput]}>
              <Ionicons name="pulse-outline" size={20} color={COLORS.gray500} />

              <TextInput
                value={symptoms}
                onChangeText={setSymptoms}
                placeholder="Record symptoms and observations..."
                placeholderTextColor={COLORS.gray500}
                style={[styles.input, styles.textArea]}
                multiline
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.label}>Diagnosis</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="clipboard-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={diagnosis}
                onChangeText={setDiagnosis}
                placeholder="Enter diagnosis"
                placeholderTextColor={COLORS.gray500}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Treatment / Prescription</Text>

            <View style={[styles.inputContainer, styles.largeInput]}>
              <Ionicons
                name="medical-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={treatment}
                onChangeText={setTreatment}
                placeholder="Treatment or prescription details..."
                placeholderTextColor={COLORS.gray500}
                style={[styles.input, styles.textArea]}
                multiline
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.label}>Additional Notes</Text>

            <View style={[styles.inputContainer, styles.largeInput]}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any additional clinical notes..."
                placeholderTextColor={COLORS.gray500}
                style={[styles.input, styles.textArea]}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Privacy Notice */}
          <View style={styles.securityNotice}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Secure Patient Record</Text>

              <Text style={styles.securityText}>
                This information is part of the patient's medical record and
                should only be accessed by authorized healthcare providers.
              </Text>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={handleSaveVisit}
          >
            <Text style={styles.saveButtonText}>Save Visit</Text>

            <View style={styles.saveIcon}>
              <Ionicons name="checkmark" size={21} color={COLORS.blue} />
            </View>
          </TouchableOpacity>

          <Text style={styles.footer}>
            RefuHealth • Patient-Centered Healthcare
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.gray500,
  },

  patientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 24,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  patientInfo: {
    flex: 1,
    marginLeft: 12,
  },

  patientName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
  },

  patientId: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.gray500,
  },

  visitBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EAF8EF",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },

  visitBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.green,
  },

  section: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray700,
    marginTop: 14,
    marginBottom: 8,
  },

  required: {
    color: COLORS.red,
  },

  inputContainer: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
    backgroundColor: COLORS.gray100,
    borderRadius: 15,
    paddingHorizontal: 14,
  },

  largeInput: {
    minHeight: 110,
    alignItems: "flex-start",
    paddingTop: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 14,
  },

  textArea: {
    height: 90,
  },

  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    borderRadius: 18,
    padding: 14,
    marginTop: 18,
  },

  securityIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  securityContent: {
    flex: 1,
    marginLeft: 11,
  },

  securityTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
  },

  securityText: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.gray500,
  },

  saveButton: {
    height: 58,
    marginTop: 22,
    borderRadius: 30,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    paddingHorizontal: 60,
    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 7,
  },

  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  saveIcon: {
    position: "absolute",
    right: 7,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 11,
    color: COLORS.gray500,
  },
});
