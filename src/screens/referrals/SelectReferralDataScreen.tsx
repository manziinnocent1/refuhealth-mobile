import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
  onNext?: (data: string[]) => void;
};

const availableData = [
  "Patient Profile",
  "Medical History",
  "Current Visit Notes",
  "Vital Signs",
  "Laboratory Results",
  "Current Medications",
];

export default function SelectReferralDataScreen({ onBack, onNext }: Props) {
  const [selected, setSelected] = useState<string[]>([
    "Patient Profile",
    "Current Visit Notes",
  ]);

  const toggle = (item: string) => {
    setSelected((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Select Referral Data</Text>
        <View style={{ width: 30 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.description}>
          Select the patient information that should be securely shared with the
          receiving facility.
        </Text>

        {availableData.map((item) => {
          const isSelected = selected.includes(item);

          return (
            <Pressable
              key={item}
              style={styles.option}
              onPress={() => toggle(item)}
            >
              <View
                style={[styles.checkbox, isSelected && styles.checkboxSelected]}
              >
                {isSelected && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{item}</Text>
                <Text style={styles.optionDescription}>
                  Include this information in the referral package.
                </Text>
              </View>
            </Pressable>
          );
        })}

        <Pressable
          style={[
            styles.button,
            selected.length === 0 && styles.disabledButton,
          ]}
          onPress={() => selected.length > 0 && onNext?.(selected)}
        >
          <Text style={styles.buttonText}>
            Continue with {selected.length} Item
            {selected.length !== 1 ? "s" : ""}
          </Text>
        </Pressable>
      </ScrollView>
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
  content: { padding: 20, paddingTop: 5, paddingBottom: 40 },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
    marginBottom: 18,
  },
  option: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxSelected: { backgroundColor: "#2563EB" },
  checkmark: { color: "#FFFFFF", fontWeight: "700" },
  optionContent: { flex: 1 },
  optionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },
  optionDescription: {
    marginTop: 4,
    fontSize: 11,
    color: "#64748B",
  },
  button: {
    height: 54,
    marginTop: 15,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#CBD5E1" },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});
