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
  darkBlue: "#0F4CBA",
  white: "#FFFFFF",
  black: "#111827",
  gray900: "#1F2937",
  gray700: "#374151",
  gray500: "#6B7280",
  gray300: "#D1D5DB",
  gray200: "#E5E7EB",
  gray100: "#F3F4F6",
  background: "#F8FAFC",
  red: "#DC2626",
  green: "#16A34A",
};

export default function PatientReferralScreen() {
  const [reason, setReason] = useState("");
  const [destination, setDestination] = useState("");
  const [provider, setProvider] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmitReferral = () => {
    if (!reason.trim() || !destination.trim()) {
      Alert.alert(
        "Incomplete Information",
        "Please provide the referral reason and destination facility.",
      );
      return;
    }

    Alert.alert(
      "Referral Ready",
      "The patient referral has been prepared successfully.",
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
              <Ionicons
                name="git-network-outline"
                size={25}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.headerTextContainer}>
              <Text style={styles.title}>Patient Referral</Text>
              <Text style={styles.subtitle}>
                Refer a patient to another healthcare provider.
              </Text>
            </View>
          </View>

          {/* Patient Information */}
          <View style={styles.patientCard}>
            <View style={styles.patientAvatar}>
              <Ionicons name="person-outline" size={25} color={COLORS.blue} />
            </View>

            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>Patient Name</Text>
              <Text style={styles.patientId}>Patient ID: RF-000001</Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>ACTIVE</Text>
            </View>
          </View>

          {/* Referral Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Referral Information</Text>

            <Text style={styles.label}>
              Reason for Referral <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="medical-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason for referral"
                placeholderTextColor={COLORS.gray500}
                style={styles.input}
                multiline
              />
            </View>

            <Text style={styles.label}>
              Destination Facility <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="business-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={destination}
                onChangeText={setDestination}
                placeholder="e.g. District Hospital"
                placeholderTextColor={COLORS.gray500}
                style={styles.input}
              />

              <Ionicons name="chevron-down" size={20} color={COLORS.gray500} />
            </View>

            <Text style={styles.label}>Receiving Provider</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-circle-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={provider}
                onChangeText={setProvider}
                placeholder="Doctor or healthcare provider"
                placeholderTextColor={COLORS.gray500}
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Clinical Notes</Text>

            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={COLORS.gray500}
              />

              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add relevant clinical information..."
                placeholderTextColor={COLORS.gray500}
                style={[styles.input, styles.textArea]}
                multiline
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Information Notice */}
          <View style={styles.notice}>
            <Ionicons
              name="shield-checkmark-outline"
              size={22}
              color={COLORS.blue}
            />

            <Text style={styles.noticeText}>
              Patient information will be securely shared with the receiving
              healthcare provider.
            </Text>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSubmitReferral}
          >
            <Text style={styles.submitText}>Create Referral</Text>

            <View style={styles.submitIcon}>
              <Ionicons name="arrow-forward" size={20} color={COLORS.blue} />
            </View>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            RefuHealth • Secure Healthcare Coordination
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
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 26,
  },

  patientAvatar: {
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

  statusBadge: {
    backgroundColor: "#EAF8EF",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 10,
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
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray700,
    marginBottom: 8,
    marginTop: 14,
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

  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.black,
    fontSize: 14,
  },

  textAreaContainer: {
    minHeight: 110,
    alignItems: "flex-start",
    paddingTop: 15,
  },

  textArea: {
    height: 90,
  },

  notice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    borderRadius: 16,
    padding: 14,
    marginTop: 18,
  },

  noticeText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.gray700,
  },

  submitButton: {
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

  submitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },

  submitIcon: {
    position: "absolute",
    right: 7,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 11,
    color: COLORS.gray500,
  },
});
