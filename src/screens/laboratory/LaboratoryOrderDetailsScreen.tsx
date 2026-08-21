import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LaboratoryOrderDetailsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Order Details</Text>
            <Text style={styles.orderId}>LAB-00124</Text>
          </View>

          <View style={styles.pendingBadge}>
            <Text style={styles.pendingText}>PENDING</Text>
          </View>
        </View>

        {/* Patient */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Patient</Text>

          <View style={styles.patientRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>P</Text>
            </View>

            <View>
              <Text style={styles.patientName}>Patient A</Text>
              <Text style={styles.patientMeta}>
                RH-2026-00124 • Age 32 • Female
              </Text>
            </View>
          </View>
        </View>

        {/* Order */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Laboratory request</Text>

          <InfoRow label="Requested test" value="Complete Blood Count" />
          <InfoRow label="Priority" value="Urgent" />
          <InfoRow label="Requested by" value="Dr. Provider" />
          <InfoRow label="Department" value="Clinical Services" />
          <InfoRow label="Requested at" value="10:42 AM" />
        </View>

        {/* Clinical reason */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Clinical information</Text>

          <Text style={styles.label}>Reason for request</Text>

          <Text style={styles.description}>
            Patient presenting with weakness and suspected infection. CBC
            requested to support clinical assessment.
          </Text>

          <Text style={styles.label}>Relevant information</Text>

          <Text style={styles.description}>
            No known allergies recorded in the current emergency encounter.
          </Text>
        </View>

        {/* Sample */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sample information</Text>

          <InfoRow label="Sample type" value="Blood" />
          <InfoRow label="Collection status" value="Not collected" />
          <InfoRow label="Sample ID" value="Pending" />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryText}>Accept Laboratory Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Request Clarification</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
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
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },

  orderId: {
    marginTop: 4,
    fontSize: 10,
    color: "#64748B",
    fontWeight: "700",
  },

  pendingBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 6,
  },

  pendingText: {
    color: "#475569",
    fontSize: 8,
    fontWeight: "900",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  patientRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#2563EB",
    fontSize: 18,
    fontWeight: "900",
  },

  patientName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },

  patientMeta: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  infoLabel: {
    fontSize: 11,
    color: "#64748B",
  },

  infoValue: {
    fontSize: 11,
    color: "#0F172A",
    fontWeight: "700",
    maxWidth: "55%",
    textAlign: "right",
  },

  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#334155",
    marginTop: 8,
    marginBottom: 6,
  },

  description: {
    color: "#64748B",
    fontSize: 11,
    lineHeight: 18,
  },

  primaryButton: {
    height: 55,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  secondaryButton: {
    height: 55,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "800",
  },
});
