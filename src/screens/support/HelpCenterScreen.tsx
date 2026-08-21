import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  onContactHospital?: () => void;
  onFeedback?: () => void;
  onHealthEducation?: () => void;
};

const helpTopics = [
  "How to register a patient",
  "How to create a referral",
  "How to use offline mode",
  "How to secure my account",
];

export default function HelpCenterScreen({
  onContactHospital,
  onFeedback,
  onHealthEducation,
}: Props) {
  const [query, setQuery] = useState("");

  const filteredTopics = helpTopics.filter((topic) =>
    topic.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Help Center</Text>
        <Text style={styles.subtitle}>Find answers and get support</Text>
      </View>

      <View style={styles.content}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search help topics..."
          placeholderTextColor="#94A3B8"
          style={styles.search}
        />

        <Text style={styles.sectionTitle}>Popular Topics</Text>

        <FlatList
          data={filteredTopics}
          keyExtractor={(item) => item}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable style={styles.topic}>
              <Text style={styles.topicText}>{item}</Text>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          )}
        />

        <Text style={styles.sectionTitle}>More Support</Text>

        <Pressable style={styles.action} onPress={onContactHospital}>
          <Text style={styles.actionTitle}>Contact Hospital</Text>
          <Text style={styles.actionText}>Get in touch with your facility</Text>
        </Pressable>

        <Pressable style={styles.action} onPress={onFeedback}>
          <Text style={styles.actionTitle}>Send Feedback</Text>
          <Text style={styles.actionText}>Help us improve the application</Text>
        </Pressable>

        <Pressable style={styles.action} onPress={onHealthEducation}>
          <Text style={styles.actionTitle}>Health Education</Text>
          <Text style={styles.actionText}>Access educational resources</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 5, fontSize: 13, color: "#64748B" },
  content: { paddingHorizontal: 20 },
  search: {
    height: 52,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  topic: {
    padding: 15,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topicText: { fontSize: 13, color: "#334155", fontWeight: "600" },
  arrow: { fontSize: 24, color: "#94A3B8" },
  action: {
    padding: 15,
    marginBottom: 9,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
  },
  actionTitle: { fontSize: 14, fontWeight: "700", color: "#1E40AF" },
  actionText: { marginTop: 4, fontSize: 11, color: "#3B82F6" },
});
