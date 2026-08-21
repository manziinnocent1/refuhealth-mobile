import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Priority = "Low" | "Medium" | "High" | "Emergency";

type Props = {
  onBack?: () => void;
  onNext?: (priority: Priority, notes: string) => void;
};

export default function TriageAssessmentScreen({ onBack, onNext }: Props) {
  const [priority, setPriority] = useState<Priority>("Medium");
  const [notes, setNotes] = useState("");

  const priorities: Priority[] = ["Low", "Medium", "High", "Emergency"];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.title}>Triage Assessment</Text>
        <Text style={styles.subtitle}>
          Determine the patient's priority level.
        </Text>

        <Text style={styles.label}>Priority Level</Text>

        <View style={styles.priorityGrid}>
          {priorities.map((item) => (
            <Pressable
              key={item}
              style={[
                styles.priorityButton,
                priority === item && styles.selectedPriority,
              ]}
              onPress={() => setPriority(item)}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === item && styles.selectedPriorityText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Assessment Notes</Text>

        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          placeholder="Record symptoms, observations and assessment notes..."
          placeholderTextColor="#94A3B8"
          style={styles.textArea}
        />

        <Pressable
          style={styles.button}
          onPress={() => onNext?.(priority, notes)}
        >
          <Text style={styles.buttonText}>Continue to Provider</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  content: { padding: 20, paddingBottom: 40 },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: {
    marginTop: 15,
    fontSize: 25,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: { marginTop: 6, fontSize: 13, color: "#64748B" },
  label: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  priorityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  priorityButton: {
    width: "47%",
    paddingVertical: 14,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
  },
  selectedPriority: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  priorityText: { fontSize: 12, fontWeight: "700", color: "#475569" },
  selectedPriorityText: { color: "#FFFFFF" },
  textArea: {
    height: 160,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    textAlignVertical: "top",
  },
  button: {
    height: 54,
    marginTop: 28,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});
