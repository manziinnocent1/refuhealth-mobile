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

export default function EmergencyRegistrationScreen() {
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Female");
  const [complaint, setComplaint] = useState("");
  const [arrivalMode, setArrivalMode] = useState("Walk-in");

  const handleRegister = () => {
    if (!patientName.trim() || !complaint.trim()) {
      Alert.alert(
        "Required information",
        "Please provide the patient's name and chief complaint.",
      );
      return;
    }

    Alert.alert(
      "Emergency Patient Registered",
      "The emergency case has been created and is ready for clinical assessment.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.emergencyBadge}>
            <Text style={styles.badgeText}>EMERGENCY</Text>
          </View>

          <Text style={styles.title}>Emergency Registration</Text>

          <Text style={styles.subtitle}>
            Capture essential patient information quickly so clinical care can
            begin immediately.
          </Text>
        </View>

        {/* Patient Identification */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Patient identification</Text>

          <Text style={styles.label}>Patient name</Text>

          <TextInput
            value={patientName}
            onChangeText={setPatientName}
            placeholder="Enter patient name"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.label}>Existing Patient ID</Text>

          <TextInput
            value={patientId}
            onChangeText={setPatientId}
            placeholder="e.g. RH-2026-00124"
            placeholderTextColor="#94A3B8"
            style={styles.input}
          />

          <Text style={styles.helper}>
            If the patient already has a RefuHealth record, use their existing
            Patient ID.
          </Text>

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Age</Text>

              <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="Age"
                keyboardType="numeric"
                placeholderTextColor="#94A3B8"
                style={styles.input}
              />
            </View>

            <View style={styles.half}>
              <Text style={styles.label}>Sex</Text>

              <View style={styles.sexRow}>
                {["Female", "Male", "Other"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.sexButton,
                      sex === item && styles.selectedSex,
                    ]}
                    onPress={() => setSex(item)}
                  >
                    <Text
                      style={[
                        styles.sexText,
                        sex === item && styles.selectedSexText,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Emergency Information */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Emergency information</Text>

          <Text style={styles.label}>Chief complaint</Text>

          <TextInput
            value={complaint}
            onChangeText={setComplaint}
            placeholder="What brought the patient to emergency care?"
            placeholderTextColor="#94A3B8"
            multiline
            textAlignVertical="top"
            style={[styles.input, styles.complaintInput]}
          />

          <Text style={styles.label}>Arrival method</Text>

          <View style={styles.arrivalRow}>
            {["Walk-in", "Ambulance", "Referral"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.arrivalButton,
                  arrivalMode === item && styles.selectedArrival,
                ]}
                onPress={() => setArrivalMode(item)}
              >
                <Text
                  style={[
                    styles.arrivalText,
                    arrivalMode === item && styles.selectedArrivalText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Immediate Alert */}
        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Immediate clinical attention</Text>

          <Text style={styles.alertText}>
            Registration does not replace emergency clinical assessment.
            Transfer the patient to the appropriate clinical provider as soon as
            possible.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          activeOpacity={0.85}
        >
          <Text style={styles.registerText}>Register Emergency Patient</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    marginBottom: 22,
  },

  emergencyBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#0F172A",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 7,
    color: "#64748B",
    fontSize: 12,
    lineHeight: 19,
  },

  sectionCard: {
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
  },

  input: {
    height: 50,
    borderRadius: 15,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 14,
    fontSize: 13,
    color: "#111827",
    marginBottom: 15,
  },

  helper: {
    marginTop: -8,
    marginBottom: 15,
    color: "#94A3B8",
    fontSize: 10,
    lineHeight: 16,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  half: {
    flex: 1,
  },

  sexRow: {
    flexDirection: "row",
    gap: 5,
  },

  sexButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },

  selectedSex: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  sexText: {
    color: "#64748B",
    fontSize: 9,
    fontWeight: "700",
  },

  selectedSexText: {
    color: "#FFFFFF",
  },

  complaintInput: {
    height: 100,
    paddingTop: 14,
    paddingBottom: 14,
  },

  arrivalRow: {
    flexDirection: "row",
    gap: 8,
  },

  arrivalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },

  selectedArrival: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },

  arrivalText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748B",
  },

  selectedArrivalText: {
    color: "#2563EB",
  },

  alertCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },

  alertTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },

  alertText: {
    marginTop: 6,
    fontSize: 11,
    color: "#64748B",
    lineHeight: 18,
  },

  registerButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  registerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
