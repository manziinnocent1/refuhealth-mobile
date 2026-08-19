import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  blue: "#1565D8",
  blueDark: "#0D47A1",
  blueLight: "#EAF2FF",
  blueVeryLight: "#F5F9FF",

  white: "#FFFFFF",
  black: "#111827",

  gray900: "#344054",
  gray600: "#667085",
  gray500: "#98A2B3",
  gray300: "#D0D5DD",
  gray200: "#E4E7EC",
  gray100: "#F2F4F7",

  success: "#12B76A",
  successLight: "#E9F9F0",
  warning: "#F79009",
  warningLight: "#FFF6E9",
  error: "#D92D20",
  errorLight: "#FDECEA",
  purple: "#7A5AF8",
  purpleLight: "#F1EDFF",
};

/**
 * Shape of the data this screen expects.
 * Swap `mockPatient` for a real API response later —
 * the component itself doesn't need to change.
 */
type Patient = {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  bloodType: string;
  avatarUrl?: string;
  status: "Active" | "Referred" | "Discharged";
  refugeeId: string;
  campOrSettlement: string;
  lastVisitDate: string;
  nextAppointment?: string;
  vitals: {
    label: string;
    value: string;
    unit: string;
    status: "normal" | "warning" | "critical";
  }[];
  alerts: {
    id: string;
    label: string;
    type: "allergy" | "condition";
  }[];
  recentActivity: {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[];
};

const mockPatient: Patient = {
  id: "pt_10234",
  fullName: "Aline Uwimana",
  age: 34,
  gender: "Female",
  bloodType: "O+",
  status: "Active",
  refugeeId: "RW-KGL-88213",
  campOrSettlement: "Kigeme Refugee Camp",
  lastVisitDate: "Aug 12, 2026",
  nextAppointment: "Aug 26, 2026 · 10:30 AM",
  vitals: [
    {
      label: "Blood Pressure",
      value: "118/76",
      unit: "mmHg",
      status: "normal",
    },
    { label: "Heart Rate", value: "78", unit: "bpm", status: "normal" },
    { label: "Temperature", value: "38.4", unit: "°C", status: "warning" },
    { label: "SpO2", value: "97", unit: "%", status: "normal" },
  ],
  alerts: [
    { id: "a1", label: "Penicillin allergy", type: "allergy" },
    { id: "a2", label: "Hypertension", type: "condition" },
  ],
  recentActivity: [
    {
      id: "r1",
      title: "Lab results uploaded",
      subtitle: "Malaria rapid test — Negative",
      date: "2 days ago",
      icon: "flask-outline",
    },
    {
      id: "r2",
      title: "Visit completed",
      subtitle: "General consultation with Dr. Bizimana",
      date: "5 days ago",
      icon: "medkit-outline",
    },
    {
      id: "r3",
      title: "Referral issued",
      subtitle: "Referred to Kigali District Hospital",
      date: "1 week ago",
      icon: "arrow-redo-outline",
    },
  ],
};

type QuickAction = {
  key: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    key: "profile",
    label: "Profile",
    icon: "person-outline",
    color: COLORS.blue,
    bg: COLORS.blueLight,
  },
  {
    key: "history",
    label: "History",
    icon: "time-outline",
    color: COLORS.purple,
    bg: COLORS.purpleLight,
  },
  {
    key: "visits",
    label: "Visits",
    icon: "calendar-outline",
    color: COLORS.success,
    bg: COLORS.successLight,
  },
  {
    key: "medications",
    label: "Medications",
    icon: "medical-outline",
    color: COLORS.warning,
    bg: COLORS.warningLight,
  },
  {
    key: "allergies",
    label: "Allergies",
    icon: "alert-circle-outline",
    color: COLORS.error,
    bg: COLORS.errorLight,
  },
  {
    key: "labs",
    label: "Lab History",
    icon: "flask-outline",
    color: COLORS.blue,
    bg: COLORS.blueLight,
  },
  {
    key: "referrals",
    label: "Referrals",
    icon: "swap-horizontal-outline",
    color: COLORS.purple,
    bg: COLORS.purpleLight,
  },
  {
    key: "documents",
    label: "Documents",
    icon: "document-text-outline",
    color: COLORS.gray900,
    bg: COLORS.gray100,
  },
  {
    key: "qrcode",
    label: "QR Code",
    icon: "qr-code-outline",
    color: COLORS.blueDark,
    bg: COLORS.blueLight,
  },
  {
    key: "access",
    label: "Access History",
    icon: "shield-checkmark-outline",
    color: COLORS.success,
    bg: COLORS.successLight,
  },
];

type PatientOverviewScreenProps = {
  patient?: Patient;
  onBack: () => void;
  onNavigate: (screenKey: string, patientId: string) => void;
};

export default function PatientOverviewScreen({
  patient = mockPatient,
  onBack,
  onNavigate,
}: PatientOverviewScreenProps) {
  const initials = patient.fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const statusStyles = {
    Active: { bg: COLORS.successLight, text: COLORS.success },
    Referred: { bg: COLORS.warningLight, text: COLORS.warning },
    Discharged: { bg: COLORS.gray100, text: COLORS.gray600 },
  }[patient.status];

  const vitalDotColor = {
    normal: COLORS.success,
    warning: COLORS.warning,
    critical: COLORS.error,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={17} color={COLORS.blue} />
          </TouchableOpacity>

          <Text style={styles.topBarTitle}>Patient Overview</Text>

          <TouchableOpacity
            style={styles.moreButton}
            activeOpacity={0.7}
            onPress={() => onNavigate("access", patient.id)}
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              color={COLORS.gray900}
            />
          </TouchableOpacity>
        </View>

        {/* Patient identity card */}
        <View style={styles.identityCard}>
          <View style={styles.identityTop}>
            <View style={styles.avatarWrap}>
              {patient.avatarUrl ? (
                <Image
                  source={{ uri: patient.avatarUrl }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarInitials}>{initials}</Text>
                </View>
              )}
            </View>

            <View style={styles.identityInfo}>
              <Text style={styles.patientName}>{patient.fullName}</Text>

              <Text style={styles.patientMeta}>
                {patient.age} yrs · {patient.gender} · {patient.bloodType}
              </Text>

              <View style={styles.idRow}>
                <Ionicons
                  name="finger-print-outline"
                  size={12}
                  color={COLORS.gray500}
                />
                <Text style={styles.idText}>{patient.refugeeId}</Text>
              </View>
            </View>

            <View
              style={[styles.statusPill, { backgroundColor: statusStyles.bg }]}
            >
              <Text
                style={[styles.statusPillText, { color: statusStyles.text }]}
              >
                {patient.status}
              </Text>
            </View>
          </View>

          <View style={styles.identityDivider} />

          <View style={styles.identityBottom}>
            <View style={styles.identityBottomItem}>
              <Ionicons
                name="location-outline"
                size={14}
                color={COLORS.gray500}
              />
              <Text style={styles.identityBottomText} numberOfLines={1}>
                {patient.campOrSettlement}
              </Text>
            </View>

            <View style={styles.identityBottomItem}>
              <Ionicons
                name="calendar-outline"
                size={14}
                color={COLORS.gray500}
              />
              <Text style={styles.identityBottomText}>
                Last visit {patient.lastVisitDate}
              </Text>
            </View>
          </View>
        </View>

        {/* Alerts */}
        {patient.alerts.length > 0 && (
          <View style={styles.alertsRow}>
            {patient.alerts.map((alert) => (
              <View
                key={alert.id}
                style={[
                  styles.alertChip,
                  alert.type === "allergy"
                    ? styles.alertChipError
                    : styles.alertChipWarning,
                ]}
              >
                <Ionicons
                  name={
                    alert.type === "allergy" ? "alert-circle" : "pulse-outline"
                  }
                  size={13}
                  color={
                    alert.type === "allergy" ? COLORS.error : COLORS.warning
                  }
                />
                <Text
                  style={[
                    styles.alertChipText,
                    {
                      color:
                        alert.type === "allergy"
                          ? COLORS.error
                          : COLORS.warning,
                    },
                  ]}
                >
                  {alert.label}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Next appointment */}
        {patient.nextAppointment && (
          <View style={styles.appointmentBanner}>
            <View style={styles.appointmentIcon}>
              <Ionicons name="calendar" size={18} color={COLORS.blue} />
            </View>

            <View style={styles.appointmentContent}>
              <Text style={styles.appointmentLabel}>Next appointment</Text>
              <Text style={styles.appointmentValue}>
                {patient.nextAppointment}
              </Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color={COLORS.gray500} />
          </View>
        )}

        {/* Vitals */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Latest vitals</Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onNavigate("history", patient.id)}
          >
            <Text style={styles.sectionAction}>View history</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.vitalsGrid}>
          {patient.vitals.map((vital) => (
            <View key={vital.label} style={styles.vitalCard}>
              <View style={styles.vitalTopRow}>
                <Text style={styles.vitalLabel}>{vital.label}</Text>
                <View
                  style={[
                    styles.vitalDot,
                    { backgroundColor: vitalDotColor[vital.status] },
                  ]}
                />
              </View>

              <View style={styles.vitalValueRow}>
                <Text style={styles.vitalValue}>{vital.value}</Text>
                <Text style={styles.vitalUnit}>{vital.unit}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick actions */}
        <Text style={[styles.sectionTitle, styles.sectionTitleSpaced]}>
          Patient records
        </Text>

        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity
              key={action.key}
              style={styles.actionCard}
              activeOpacity={0.75}
              onPress={() => onNavigate(action.key, patient.id)}
            >
              <View
                style={[styles.actionIconWrap, { backgroundColor: action.bg }]}
              >
                <Ionicons name={action.icon} size={20} color={action.color} />
              </View>

              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent activity */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent activity</Text>
        </View>

        <View style={styles.activityCard}>
          {patient.recentActivity.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.activityRow,
                index !== patient.recentActivity.length - 1 &&
                  styles.activityRowBorder,
              ]}
            >
              <View style={styles.activityIconWrap}>
                <Ionicons name={item.icon} size={16} color={COLORS.blue} />
              </View>

              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activitySubtitle} numberOfLines={1}>
                  {item.subtitle}
                </Text>
              </View>

              <Text style={styles.activityDate}>{item.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },

  /* Top bar */

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  topBarTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.black,
  },

  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Identity card */

  identityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 12,
  },

  identityTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatarWrap: {
    marginRight: 12,
  },

  avatarImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },

  avatarFallback: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarInitials: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },

  identityInfo: {
    flex: 1,
  },

  patientName: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.black,
  },

  patientMeta: {
    fontSize: 12,
    color: COLORS.gray600,
    marginTop: 3,
  },

  idRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  idText: {
    fontSize: 11,
    color: COLORS.gray500,
    marginLeft: 4,
    fontWeight: "600",
  },

  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  statusPillText: {
    fontSize: 10,
    fontWeight: "800",
  },

  identityDivider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: 12,
  },

  identityBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  identityBottomItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  identityBottomText: {
    fontSize: 11,
    color: COLORS.gray600,
    marginLeft: 5,
    flexShrink: 1,
  },

  /* Alerts */

  alertsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },

  alertChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },

  alertChipError: {
    backgroundColor: COLORS.errorLight,
  },

  alertChipWarning: {
    backgroundColor: COLORS.warningLight,
  },

  alertChipText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 5,
  },

  /* Appointment banner */

  appointmentBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.blueVeryLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DCEAFF",
    padding: 12,
    marginBottom: 20,
  },

  appointmentIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  appointmentContent: {
    flex: 1,
  },

  appointmentLabel: {
    fontSize: 10,
    color: COLORS.gray600,
    fontWeight: "600",
  },

  appointmentValue: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: "800",
    marginTop: 2,
  },

  /* Sections */

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  sectionTitleSpaced: {
    marginTop: 4,
    marginBottom: 12,
  },

  sectionAction: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.blue,
  },

  /* Vitals */

  vitalsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  vitalCard: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 12,
    marginBottom: 10,
  },

  vitalTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  vitalLabel: {
    fontSize: 10,
    color: COLORS.gray600,
    fontWeight: "600",
    flexShrink: 1,
  },

  vitalDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },

  vitalValueRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 8,
  },

  vitalValue: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.black,
  },

  vitalUnit: {
    fontSize: 11,
    color: COLORS.gray500,
    marginLeft: 4,
    marginBottom: 3,
  },

  /* Quick actions */

  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  actionCard: {
    width: "31%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  actionIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  actionLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gray900,
    textAlign: "center",
  },

  /* Activity */

  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 14,
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  activityRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },

  activityIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.black,
  },

  activitySubtitle: {
    fontSize: 10,
    color: COLORS.gray600,
    marginTop: 2,
  },

  activityDate: {
    fontSize: 9,
    color: COLORS.gray500,
    marginLeft: 8,
  },
});
