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

export default function DiagnosisScreen() {
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.label}>CLINICAL ASSESSMENT</Text>
        <Text style={styles.title}>Diagnosis</Text>

        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={22} color={COLORS.blue} />
          </View>

          <View>
            <Text style={styles.patientName}>Patient #RH-2026-0148</Text>
            <Text style={styles.patientDetails}>32 years • Female</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Primary diagnosis</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={diagnosis}
            onChangeText={setDiagnosis}
            placeholder="Enter diagnosis"
            placeholderTextColor={COLORS.gray500}
            style={styles.input}
          />
        </View>

        <Text style={styles.sectionTitle}>Clinical assessment</Text>

        <View style={styles.largeInput}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Describe clinical findings and assessment..."
            placeholderTextColor={COLORS.gray500}
            multiline
            textAlignVertical="top"
            style={styles.textArea}
          />
        </View>

        <Text style={styles.sectionTitle}>Diagnosis classification</Text>

        <View style={styles.classificationCard}>
          <Ionicons name="analytics-outline" size={22} color={COLORS.blue} />

          <View style={styles.classificationContent}>
            <Text style={styles.classificationTitle}>Clinical coding</Text>

            <Text style={styles.classificationText}>
              Add the appropriate clinical classification when available.
            </Text>
          </View>

          <Ionicons name="chevron-forward" size={20} color={COLORS.gray300} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Diagnosis</Text>

          <Ionicons
            name="checkmark-circle-outline"
            size={21}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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

  label: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: COLORS.blue,
  },

  title: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.black,
  },

  patientCard: {
    marginTop: 22,
    padding: 15,
    borderRadius: 19,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 47,
    height: 47,
    borderRadius: 16,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  patientName: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
  },

  patientDetails: {
    marginLeft: 12,
    marginTop: 4,
    fontSize: 10,
    color: COLORS.gray500,
  },

  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "850",
    color: COLORS.black,
  },

  inputContainer: {
    height: 55,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 14,
    justifyContent: "center",
  },

  input: {
    fontSize: 13,
    color: COLORS.black,
  },

  largeInput: {
    minHeight: 150,
    padding: 14,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  textArea: {
    minHeight: 120,
    fontSize: 13,
    lineHeight: 20,
    color: COLORS.black,
  },

  classificationCard: {
    minHeight: 76,
    padding: 14,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  classificationContent: {
    flex: 1,
    marginLeft: 12,
  },

  classificationTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.black,
  },

  classificationText: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.gray500,
  },

  button: {
    marginTop: 25,
    height: 57,
    borderRadius: 29,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
