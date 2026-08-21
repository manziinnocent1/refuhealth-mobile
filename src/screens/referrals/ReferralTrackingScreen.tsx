import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Referral = {
  id: string;
  patient: string;
  facility: string;
  date: string;
  status: "Pending" | "Accepted" | "Completed";
};

type Props = {
  onBack?: () => void;
  onOpenReferral?: (id: string) => void;
};

const referrals: Referral[] = [
  {
    id: "REF-2026-00124",
    patient: "John Doe",
    facility: "Kigali Referral Hospital",
    date: "Today",
    status: "Pending",
  },
  {
    id: "REF-2026-00118",
    patient: "Mary Smith",
    facility: "University Teaching Hospital",
    date: "Yesterday",
    status: "Accepted",
  },
  {
    id: "REF-2026-00105",
    patient: "David Wilson",
    facility: "Specialist Clinic",
    date: "Aug 18",
    status: "Completed",
  },
];

export default function ReferralTrackingScreen({
  onBack,
  onOpenReferral,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Referral Tracking</Text>
          <Text style={styles.subtitle}>Monitor referral progress</Text>
        </View>
      </View>

      <FlatList
        data={referrals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => onOpenReferral?.(item.id)}
          >
            <View style={styles.icon}>
              <Text style={styles.iconText}>↗</Text>
            </View>

            <View style={styles.content}>
              <View style={styles.row}>
                <Text style={styles.patient}>{item.patient}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status === "Accepted" && styles.accepted,
                    item.status === "Completed" && styles.completed,
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <Text style={styles.facility}>{item.facility}</Text>
              <Text style={styles.meta}>
                {item.id} • {item.date}
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
  list: { padding: 20 },
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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: { fontSize: 20, color: "#2563EB" },
  content: { flex: 1 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  patient: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  status: { fontSize: 10, fontWeight: "700", color: "#D97706" },
  accepted: { color: "#2563EB" },
  completed: { color: "#16A34A" },
  facility: { marginTop: 5, fontSize: 12, color: "#64748B" },
  meta: { marginTop: 5, fontSize: 10, color: "#94A3B8" },
});
