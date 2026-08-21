import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

type Props = {
  onBack?: () => void;
  onLanguageSelected?: (language: string) => void;
};

const languages = ["English", "Kinyarwanda", "Français"];

export default function LanguageScreen({ onBack, onLanguageSelected }: Props) {
  const [selected, setSelected] = useState("English");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Language</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Choose the language used throughout the application.
        </Text>

        {languages.map((language) => (
          <Pressable
            key={language}
            style={styles.option}
            onPress={() => {
              setSelected(language);
              onLanguageSelected?.(language);
            }}
          >
            <Text style={styles.optionText}>{language}</Text>

            <View
              style={[
                styles.radio,
                selected === language && styles.radioSelected,
              ]}
            >
              {selected === language && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        ))}
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
  description: { fontSize: 13, lineHeight: 20, color: "#64748B" },
  option: {
    marginTop: 12,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: { fontSize: 14, fontWeight: "600", color: "#334155" },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#94A3B8",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: "#2563EB" },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2563EB",
  },
});
