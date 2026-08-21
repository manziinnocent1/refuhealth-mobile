import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
};

export default function FeedbackScreen({ onBack }: Props) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const submit = () => {
    if (!feedback.trim()) {
      Alert.alert("Feedback Required", "Please enter your feedback.");
      return;
    }

    Alert.alert("Thank You", "Your feedback has been submitted.");
    setFeedback("");
    setRating(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Send Feedback</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>How is your experience?</Text>

        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((value) => (
            <Pressable key={value} onPress={() => setRating(value)}>
              <Text
                style={[styles.star, value <= rating && styles.selectedStar]}
              >
                ★
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Your Feedback</Text>

        <TextInput
          value={feedback}
          onChangeText={setFeedback}
          multiline
          placeholder="Tell us what you think..."
          placeholderTextColor="#94A3B8"
          style={styles.textArea}
        />

        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </Pressable>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20 },
  heading: {
    marginTop: 15,
    fontSize: 19,
    fontWeight: "700",
    color: "#334155",
    textAlign: "center",
  },
  ratingRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  star: { fontSize: 35, color: "#CBD5E1" },
  selectedStar: { color: "#F59E0B" },
  label: {
    marginTop: 30,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
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
    marginTop: 25,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
});
