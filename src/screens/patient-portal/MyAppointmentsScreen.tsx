import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  blue: "#1565D8",
  white: "#FFFFFF",
  black: "#111827",
  gray700: "#374151",
  gray500: "#6B7280",
  gray200: "#E5E7EB",
  background: "#F8FAFC",
  green: "#16A34A",
};

export default function MyAppointmentsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Ionicons name="calendar-outline" size={25} color={COLORS.blue} />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>Appointments</Text>
            <Text style={styles.subtitle}>Manage your healthcare visits.</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Upcoming</Text>

        <View style={styles.appointmentCard}>
          <View style={styles.dateBox}>
            <Text style={styles.month}>AUG</Text>
            <Text style={styles.day}>24</Text>
          </View>

          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTitle}>General Consultation</Text>

            <Text style={styles.provider}>Healthcare Provider</Text>

            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={14} color={COLORS.gray500} />

              <Text style={styles.detail}>10:30 AM</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color={COLORS.gray500}
              />

              <Text style={styles.detail}>Refugee Health Centre</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color={COLORS.white} />

          <Text style={styles.addText}>Request Appointment</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 28 }]}>
          Previous appointments
        </Text>

        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="calendar-clear-outline"
              size={25}
              color={COLORS.blue}
            />
          </View>

          <Text style={styles.emptyTitle}>No previous appointments</Text>

          <Text style={styles.emptyText}>
            Your completed healthcare visits will appear here.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 22,
    paddingBottom: 45,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.gray500,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 14,
  },

  appointmentCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 21,
    padding: 17,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  dateBox: {
    width: 58,
    height: 68,
    borderRadius: 17,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  month: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.blue,
  },

  day: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.blue,
    marginTop: 2,
  },

  appointmentInfo: {
    flex: 1,
    marginLeft: 14,
  },

  appointmentTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.black,
  },

  provider: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.gray500,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  detail: {
    marginLeft: 6,
    fontSize: 11,
    color: COLORS.gray500,
  },

  addButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 17,
  },

  addText: {
    marginLeft: 7,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 13,
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  emptyText: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.gray500,
    textAlign: "center",
  },
});
