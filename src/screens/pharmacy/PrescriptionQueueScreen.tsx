import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Prescription = {
  id: string;
  patient: string;
  medication: string;
  doctor: string;
  time: string;
  status: "Pending" | "Ready" | "Attention";
};

type Props = {
  onBack?: () => void;
  onOpenPrescription?: (id: string) => void;
};

const prescriptions: Prescription[] = [
  {
    id: "RX-1001",
    patient: "John Doe",
    medication: "Amoxicillin 500 mg",
    doctor: "Dr. Sarah Johnson",
    time: "10 minutes ago",
    status: "Pending",
  },
  {
    id: "RX-1002",
    patient: "Mary Smith",
    medication: "Paracetamol 500 mg",
    doctor: "Dr. James Wilson",
    time: "25 minutes ago",
    status: "Ready",
  },
  {
    id: "RX-1003",
    patient: "David Wilson",
    medication: "Metformin 500 mg",
    doctor: "Dr. Sarah Johnson",
    time: "1 hour ago",
    status: "Attention",
  },
];

export default function PrescriptionQueueScreen({
  onBack,
  onOpenPrescription,
}: Props) {
  const [filter, setFilter] = useState<
    "All" | "Pending" | "Ready" | "Attention"
  >("All");

  const filtered = useMemo(() => {
    return filter === "All"
      ? prescriptions
      : prescriptions.filter((item) => item.status === filter);
  }, [filter]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Prescription Queue</Text>
          <Text style={styles.subtitle}>
            {filtered.length} prescription{filtered.length !== 1 ? "s" : ""}
          </Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        {(["All", "Pending", "Ready", "Attention"] as const).map((item) => (
          <Pressable
            key={item}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilter,
            ]}
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
          <Pressable
            style={styles.card}
            onPress={() => onOpenPrescription?.(item.id)}
          >
            <View style={styles.icon}>
              <Text style={styles.iconText}>Rx</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={styles.patient}>{item.patient}</Text>
                <View
                  style={[
                    styles.status,
                    item.status === "Ready" && styles.ready,
                    item.status === "Attention" && styles.attention,
                  ]}
                >
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <Text style={styles.medication}>{item.medication}</Text>
              <Text style={styles.doctor}>{item.doctor}</Text>
              <Text style={styles.time}>
                {item.id} • {item.time}
              </Text>
            </View>
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
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 6,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
  },
  activeFilter: { backgroundColor: "#2563EB" },
  filterText: { fontSize: 10, fontWeight: "600", color: "#64748B" },
  activeFilterText: { color: "#FFFFFF" },
  list: { padding: 16, paddingTop: 4 },
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: { fontWeight: "700", color: "#2563EB" },
  content: { flex: 1 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  patient: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  status: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#FEF3C7",
  },
  ready: { backgroundColor: "#DCFCE7" },
  attention: { backgroundColor: "#FEE2E2" },
  statusText: { fontSize: 9, fontWeight: "700", color: "#92400E" },
  medication: { marginTop: 5, fontSize: 13, color: "#475569" },
  doctor: { marginTop: 4, fontSize: 11, color: "#64748B" },
  time: { marginTop: 5, fontSize: 10, color: "#94A3B8" },
});
