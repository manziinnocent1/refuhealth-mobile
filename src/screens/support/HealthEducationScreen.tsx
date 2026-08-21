import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type EducationItem = {
  id: string;
  title: string;
  description: string;
  category: string;
};

type Props = {
  onBack?: () => void;
  onOpenArticle?: (articleId: string) => void;
};

const articles: EducationItem[] = [
  {
    id: "EDU-001",
    title: "Preventing Common Infections",
    description: "Learn practical ways to reduce infection risks.",
    category: "Prevention",
  },
  {
    id: "EDU-002",
    title: "Managing Diabetes",
    description: "Basic guidance for healthy diabetes management.",
    category: "Chronic Care",
  },
  {
    id: "EDU-003",
    title: "Healthy Pregnancy",
    description: "Important information for maternal health.",
    category: "Maternal Health",
  },
];

export default function HealthEducationScreen({
  onBack,
  onOpenArticle,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Health Education</Text>
          <Text style={styles.subtitle}>Trusted health information</Text>
        </View>
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => onOpenArticle?.(item.id)}
          >
            <View style={styles.category}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>

            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <Text style={styles.readMore}>Read More ›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
    marginRight: 14,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 3, fontSize: 12, color: "#64748B" },
  list: { padding: 20 },
  card: {
    padding: 17,
    marginBottom: 12,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  category: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#EFF6FF",
  },
  categoryText: { fontSize: 9, fontWeight: "700", color: "#2563EB" },
  articleTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  description: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 19,
    color: "#64748B",
  },
  readMore: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: "700",
    color: "#2563EB",
  },
});
