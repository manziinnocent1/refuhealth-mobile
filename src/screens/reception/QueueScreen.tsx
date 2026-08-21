import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type QueuePatient = {
  id: string;
  position: number;
  name: string;
  department: string;
  waitTime: string;
  status: "Waiting" | "In Progress";
};

type Props = {
  onBack?: () => void;
  onOpenPatient?: (patientId: string) => void;
};

const queueData: QueuePatient[] = [
  {
    id: "PT-001245",
    position: 1,
    name: "John Doe",
    department: "General Consultation",
    waitTime: "5 min",
    status: "Waiting",
  },
  {
    id: "PT-001987",
    position: 2,
    name: "Mary Smith",
    department: "General Consultation",
    waitTime: "12 min",
    status: "Waiting",
  },
  {
    id: "PT-001555",
    position: 3,
    name: "David Wilson",
    department: "Specialist Clinic",
    waitTime: "18 min",
    status: "In Progress",
  },
];

export default function QueueScreen({ onBack, onOpenPatient }: Props) {
  const [department, setDepartment] = useState<
    "All" | "General" | "Specialist"
  >("All");

  const filteredQueue = useMemo(() => {
    if (department === "All") {
      return queueData;
    }

    return queueData.filter((item) =>
      department === "General"
        ? item.department.includes("General")
        : item.department.includes("Specialist"),
    );
  }, [department]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Patient Queue</Text>
          <Text style={styles.subtitle}>
            {filteredQueue.length} patients currently listed
          </Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>{filteredQueue.length}</Text>
        <Text style={styles.summaryText}>Patients Waiting</Text>
      </View>

      <View style={styles.filters}>
        {(["All", "General", "Specialist"] as const).map((item) => (
          <Pressable
            key={item}
            style={[styles.filter, department === item && styles.activeFilter]}
            onPress={() => setDepartment(item)}
          >
            <Text
              style={[
                styles.filterText,
                department === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredQueue}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.queueCard}
            onPress={() => onOpenPatient?.(item.id)}
          >
            <View style={styles.position}>
              <Text style={styles.positionText}>{item.position}</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.department}>{item.department}</Text>
              <Text style={styles.waitTime}>Waiting: {item.waitTime}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                item.status === "In Progress" && styles.progressBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.status === "In Progress" && styles.progressText,
                ]}
              >
                {item.status}
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
    marginRight: 14,
    color: "#334155",
  },
  title: { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 3, fontSize: 12, color: "#64748B" },
  summaryCard: {
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2563EB",
  },
  summaryText: { marginTop: 4, fontSize: 12, color: "#3B82F6" },
  filters: {
    flexDirection: "row",
    padding: 20,
    paddingBottom: 10,
    gap: 8,
  },
  filter: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
  },
  activeFilter: { backgroundColor: "#2563EB" },
  filterText: { fontSize: 11, fontWeight: "600", color: "#64748B" },
  activeFilterText: { color: "#FFFFFF" },
  list: { padding: 20, paddingTop: 5 },
  queueCard: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  position: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
    marginRight: 12,
  },
  positionText: { color: "#FFFFFF", fontWeight: "700" },
  content: { flex: 1 },
  name: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  department: { marginTop: 4, fontSize: 11, color: "#64748B" },
  waitTime: { marginTop: 5, fontSize: 10, color: "#94A3B8" },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: "#FEF3C7",
  },
  progressBadge: { backgroundColor: "#DBEAFE" },
  statusText: { fontSize: 9, fontWeight: "700", color: "#D97706" },
  progressText: { color: "#2563EB" },
});
