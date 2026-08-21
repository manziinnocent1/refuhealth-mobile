import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onSearchPatients?: () => void;
  onRegisterPatient?: () => void;
  onCreateVisit?: () => void;
  onOpenQueue?: () => void;
};

export default function ReceptionDashboardScreen({
  onSearchPatients,
  onRegisterPatient,
  onCreateVisit,
  onOpenQueue,
}: Props) {
  const actions = [
    { title: "Find Patient", icon: "⌕", onPress: onSearchPatients },
    { title: "Register Patient", icon: "+", onPress: onRegisterPatient },
    { title: "Create Visit", icon: "◷", onPress: onCreateVisit },
    { title: "View Queue", icon: "☰", onPress: onOpenQueue },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Reception</Text>
            <Text style={styles.subtitle}>
              Patient registration and visit management
            </Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>RC</Text>
          </View>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.number}>24</Text>
            <Text style={styles.label}>Today's Visits</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.number}>8</Text>
            <Text style={styles.label}>Waiting</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryItem}>
            <Text style={styles.number}>5</Text>
            <Text style={styles.label}>New Patients</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionGrid}>
          {actions.map((action) => (
            <Pressable
              key={action.title}
              style={styles.actionCard}
              onPress={action.onPress}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.queueCard}>
          <View>
            <Text style={styles.queueTitle}>Current Queue</Text>
            <Text style={styles.queueText}>
              8 patients are currently waiting
            </Text>
          </View>

          <Pressable onPress={onOpenQueue}>
            <Text style={styles.queueLink}>Open Queue</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 4, fontSize: 13, color: "#64748B" },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#FFFFFF", fontWeight: "700" },
  summary: {
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  summaryItem: { flex: 1, alignItems: "center" },
  number: { fontSize: 22, fontWeight: "700", color: "#2563EB" },
  label: { marginTop: 5, fontSize: 10, color: "#64748B" },
  divider: { width: 1, height: 38, backgroundColor: "#E2E8F0" },
  sectionTitle: {
    marginTop: 26,
    marginHorizontal: 20,
    fontSize: 17,
    fontWeight: "700",
    color: "#334155",
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 15,
    gap: 10,
  },
  actionCard: {
    width: "47%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionIcon: { fontSize: 24, color: "#2563EB" },
  actionTitle: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
  queueCard: {
    margin: 20,
    marginTop: 8,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  queueTitle: { fontSize: 15, fontWeight: "700", color: "#1E40AF" },
  queueText: { marginTop: 4, fontSize: 11, color: "#3B82F6" },
  queueLink: { fontSize: 12, fontWeight: "700", color: "#2563EB" },
});
