import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type HistoryItem = {
  id: string;
  medication: string;
  patient: string;
  date: string;
  quantity: string;
  status: "Dispensed" | "Cancelled";
};

type Props = {
  onBack?: () => void;
};

const history: HistoryItem[] = [
  {
    id: "RX-0998",
    medication: "Paracetamol 500 mg",
    patient: "Mary Smith",
    date: "Today, 9:30 AM",
    quantity: "20 tablets",
    status: "Dispensed",
  },
  {
    id: "RX-0997",
    medication: "Metformin 500 mg",
    patient: "David Wilson",
    date: "Yesterday",
    quantity: "30 tablets",
    status: "Dispensed",
  },
  {
    id: "RX-0996",
    medication: "Ibuprofen 400 mg",
    patient: "John Doe",
    date: "Aug 19",
    quantity: "14 tablets",
    status: "Cancelled",
  },
];

export default function MedicationHistoryScreen({ onBack }: Props) {
  const [filter, setFilter] = useState<"All" | "Dispensed" | "Cancelled">(
    "All",
  );

  const filtered = useMemo(
    () =>
      filter === "All"
        ? history
        : history.filter((item) => item.status === filter),
    [filter],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Medication History</Text>
          <Text style={styles.subtitle}>Previous dispensing activity</Text>
        </View>
      </View>

      <View style={styles.filters}>
        {(["All", "Dispensed", "Cancelled"] as const).map((item) => (
          <Pressable
            key={item}
            style={[styles.filter, filter === item && styles.activeFilter]}
            onPress={() => setFilter(item)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.icon}>
              <Text style={styles.iconText}>Rx</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.medication}>{item.medication}</Text>
              <Text style={styles.patient}>{item.patient}</Text>
              <Text style={styles.meta}>
                {item.quantity} • {item.date}
              </Text>
            </View>

            <Text
              style={[
                styles.status,
                item.status === "Cancelled" && styles.cancelled,
              ]}
            >
              {item.status}
            </Text>
          </View>
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
  filters: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 8,
  },
  filter: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    alignItems: "center",
    backgroundColor: "#E2E8F0",
  },
  activeFilter: { backgroundColor: "#2563EB" },
  filterText: { fontSize: 11, fontWeight: "600", color: "#64748B" },
  activeFilterText: { color: "#FFFFFF" },
  list: { padding: 20 },
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
    marginRight: 12,
  },
  iconText: { color: "#2563EB", fontWeight: "700" },
  content: { flex: 1 },
  medication: { fontSize: 14, fontWeight: "700", color: "#334155" },
  patient: { marginTop: 4, fontSize: 12, color: "#64748B" },
  meta: { marginTop: 5, fontSize: 10, color: "#94A3B8" },
  status: { fontSize: 10, fontWeight: "700", color: "#16A34A" },
  cancelled: { color: "#DC2626" },
});
