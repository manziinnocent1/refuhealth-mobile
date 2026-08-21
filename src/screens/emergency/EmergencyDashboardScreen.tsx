import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const emergencyCases = [
  {
    id: "ER-001",
    patient: "Patient A",
    age: "32",
    status: "Critical",
    arrival: "10:42 AM",
    complaint: "Difficulty breathing",
  },
  {
    id: "ER-002",
    patient: "Patient B",
    age: "24",
    status: "Urgent",
    arrival: "10:35 AM",
    complaint: "Severe abdominal pain",
  },
  {
    id: "ER-003",
    patient: "Patient C",
    age: "51",
    status: "Stable",
    arrival: "10:18 AM",
    complaint: "High fever",
  },
];

export default function EmergencyDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Emergency Care</Text>
            <Text style={styles.subtitle}>
              Fast access to patients requiring immediate attention.
            </Text>
          </View>

          <View style={styles.emergencyIcon}>
            <Text style={styles.emergencyIconText}>!</Text>
          </View>
        </View>

        {/* Emergency Status */}
        <View style={styles.statusBanner}>
          <View style={styles.statusIndicator} />

          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Emergency Unit Active</Text>

            <Text style={styles.statusText}>
              Patient monitoring and emergency services are currently active.
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsRow}>
          <StatCard number="03" label="Active Cases" />
          <StatCard number="01" label="Critical" />
          <StatCard number="02" label="Waiting" />
        </View>

        {/* New Emergency */}
        <TouchableOpacity
          style={styles.newEmergencyButton}
          activeOpacity={0.85}
        >
          <View style={styles.plusCircle}>
            <Text style={styles.plus}>+</Text>
          </View>

          <View>
            <Text style={styles.newEmergencyTitle}>
              Register Emergency Patient
            </Text>

            <Text style={styles.newEmergencyText}>
              Start immediate emergency registration
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Active Cases */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active emergency cases</Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {emergencyCases.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.caseCard}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.priorityIndicator,
                item.status === "Critical"
                  ? styles.critical
                  : item.status === "Urgent"
                    ? styles.urgent
                    : styles.stable,
              ]}
            />

            <View style={styles.caseInfo}>
              <View style={styles.caseTopRow}>
                <Text style={styles.patientName}>{item.patient}</Text>

                <View
                  style={[
                    styles.statusBadge,
                    item.status === "Critical"
                      ? styles.criticalBadge
                      : item.status === "Urgent"
                        ? styles.urgentBadge
                        : styles.stableBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusBadgeText,
                      item.status === "Critical"
                        ? styles.criticalText
                        : item.status === "Urgent"
                          ? styles.urgentText
                          : styles.stableText,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.caseMeta}>
                {item.id} • Age {item.age} • {item.arrival}
              </Text>

              <Text style={styles.complaint}>{item.complaint}</Text>
            </View>

            <Text style={styles.caseArrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Emergency Reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderTitle}>Emergency response reminder</Text>

          <Text style={styles.reminderText}>
            Prioritize immediate clinical assessment, record essential
            information, and maintain a clear handover trail.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 12,
    lineHeight: 18,
    maxWidth: 280,
  },

  emergencyIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
  },

  emergencyIconText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },

  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    borderRadius: 19,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 15,
  },

  statusIndicator: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#2563EB",
    marginRight: 12,
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E3A8A",
  },

  statusText: {
    marginTop: 4,
    color: "#475569",
    fontSize: 11,
    lineHeight: 17,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  statNumber: {
    fontSize: 23,
    fontWeight: "900",
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 10,
  },

  newEmergencyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 16,
    marginBottom: 27,
  },

  plusCircle: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  plus: {
    color: "#2563EB",
    fontSize: 25,
    fontWeight: "700",
  },

  newEmergencyTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  newEmergencyText: {
    marginTop: 3,
    color: "#DBEAFE",
    fontSize: 10,
  },

  arrow: {
    marginLeft: "auto",
    color: "#FFFFFF",
    fontSize: 28,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
  },

  viewAll: {
    color: "#2563EB",
    fontSize: 11,
    fontWeight: "800",
  },

  caseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  priorityIndicator: {
    width: 5,
    height: 50,
    borderRadius: 3,
    marginRight: 12,
  },

  critical: {
    backgroundColor: "#0F172A",
  },

  urgent: {
    backgroundColor: "#2563EB",
  },

  stable: {
    backgroundColor: "#94A3B8",
  },

  caseInfo: {
    flex: 1,
  },

  caseTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  patientName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  statusBadge: {
    borderRadius: 9,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  criticalBadge: {
    backgroundColor: "#E2E8F0",
  },

  urgentBadge: {
    backgroundColor: "#EFF6FF",
  },

  stableBadge: {
    backgroundColor: "#F1F5F9",
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: "800",
  },

  criticalText: {
    color: "#0F172A",
  },

  urgentText: {
    color: "#1D4ED8",
  },

  stableText: {
    color: "#64748B",
  },

  caseMeta: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 10,
  },

  complaint: {
    marginTop: 5,
    color: "#334155",
    fontSize: 11,
  },

  caseArrow: {
    fontSize: 25,
    color: "#2563EB",
    marginLeft: 8,
  },

  reminderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  reminderTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },

  reminderText: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 11,
    lineHeight: 18,
  },
});
