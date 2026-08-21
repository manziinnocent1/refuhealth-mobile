import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
};

type Props = {
  query?: string;
  onBack?: () => void;
  onSelectPatient?: (patientId: string) => void;
};

const patients: Patient[] = [
  {
    id: "PT-001245",
    name: "John Doe",
    age: 34,
    gender: "Male",
    phone: "+250 788 123 456",
  },
  {
    id: "PT-001987",
    name: "John David",
    age: 41,
    gender: "Male",
    phone: "+250 788 555 123",
  },
];

export default function PatientSearchResultsScreen({
  query = "John",
  onBack,
  onSelectPatient,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Search Results</Text>
          <Text style={styles.subtitle}>Results for "{query}"</Text>
        </View>
      </View>

      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.patientCard}
            onPress={() => onSelectPatient?.(item.id)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                {item.gender} • {item.age} years
              </Text>
              <Text style={styles.meta}>{item.phone}</Text>
              <Text style={styles.id}>{item.id}</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
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
    marginRight: 14,
    color: "#334155",
  },
  title: { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 3, fontSize: 12, color: "#64748B" },
  list: { padding: 20 },
  patientCard: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { color: "#FFFFFF", fontWeight: "700" },
  content: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  meta: { marginTop: 4, fontSize: 12, color: "#64748B" },
  id: { marginTop: 5, fontSize: 10, color: "#94A3B8" },
  arrow: { fontSize: 28, color: "#94A3B8" },
});
