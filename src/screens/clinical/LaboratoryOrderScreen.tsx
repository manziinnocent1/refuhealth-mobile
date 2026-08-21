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

const tests = [
  "Complete Blood Count",
  "Malaria Test",
  "Urinalysis",
  "Blood Glucose",
  "HIV Test",
  "Liver Function",
];

export default function LaboratoryOrderScreen() {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const toggleTest = (test: string) => {
    setSelectedTests((current) =>
      current.includes(test)
        ? current.filter((item) => item !== test)
        : [...current, test],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.label}>DIAGNOSTIC SERVICES</Text>
        <Text style={styles.title}>Laboratory order</Text>

        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={22} color={COLORS.blue} />
          </View>

          <View>
            <Text style={styles.patientName}>Patient #RH-2026-0148</Text>
            <Text style={styles.patientDetails}>32 years • Female</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select laboratory tests</Text>

        {tests.map((test) => {
          const selected = selectedTests.includes(test);

          return (
            <TouchableOpacity
              key={test}
              style={[styles.testCard, selected && styles.selectedTest]}
              onPress={() => toggleTest(test)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, selected && styles.checked]}>
                {selected && (
                  <Ionicons name="checkmark" size={16} color={COLORS.white} />
                )}
              </View>

              <Text style={styles.testText}>{test}</Text>
            </TouchableOpacity>
          );
        })}

        <Text style={styles.sectionTitle}>Clinical notes</Text>

        <View style={styles.notesContainer}>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Add relevant information for the laboratory..."
            placeholderTextColor={COLORS.gray500}
            multiline
            textAlignVertical="top"
            style={styles.notes}
          />
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>Selected tests</Text>
          <Text style={styles.summaryNumber}>{selectedTests.length}</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Laboratory Order</Text>

          <Ionicons name="send-outline" size={20} color={COLORS.white} />
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
    marginBottom: 11,
    fontSize: 15,
    fontWeight: "850",
    color: COLORS.black,
  },

  testCard: {
    height: 55,
    marginBottom: 9,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  selectedTest: {
    borderColor: COLORS.blue,
    backgroundColor: COLORS.lightBlue,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    alignItems: "center",
    justifyContent: "center",
  },

  checked: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },

  testText: {
    marginLeft: 11,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.black,
  },

  notesContainer: {
    minHeight: 130,
    padding: 13,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  notes: {
    minHeight: 100,
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.black,
  },

  summary: {
    marginTop: 18,
    padding: 15,
    borderRadius: 17,
    backgroundColor: COLORS.lightBlue,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.black,
  },

  summaryNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.blue,
  },

  button: {
    marginTop: 20,
    height: 57,
    borderRadius: 29,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },
});
