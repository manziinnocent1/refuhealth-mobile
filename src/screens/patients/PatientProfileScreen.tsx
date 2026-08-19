import React, { useState } from "react";
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
 * Full patient profile shape. Swap `mockPatient` for a real
 * API response later — the component itself won't need to change.
 */
type PatientProfile = {
  id: string;
  fullName: string;
  avatarUrl?: string;
  status: "Active" | "Referred" | "Discharged";
  dateOfBirth: string;
  age: number;
  gender: string;
  bloodType: string;
  nationality: string;
  refugeeId: string;
  registrationDate: string;
  campOrSettlement: string;
  block: string;
  phone?: string;
  email?: string;
  languagesSpoken: string[];
  maritalStatus: string;
  occupation?: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  familySize: number;
  disabilityStatus?: string;
};

const mockPatient: PatientProfile = {
  id: "pt_10234",
  fullName: "Aline Uwimana",
  status: "Active",
  dateOfBirth: "March 14, 1992",
  age: 34,
  gender: "Female",
  bloodType: "O+",
  nationality: "Congolese (DRC)",
  refugeeId: "RW-KGL-88213",
  registrationDate: "Jan 9, 2021",
  campOrSettlement: "Kigeme Refugee Camp",
  block: "Block C, Shelter 114",
  phone: "+250 788 123 456",
  email: "aline.uwimana@refumail.org",
  languagesSpoken: ["Kinyarwanda", "Swahili", "French"],
  maritalStatus: "Married",
  occupation: "Tailor",
  emergencyContact: {
    name: "Jean Baptiste Uwimana",
    relation: "Spouse",
    phone: "+250 788 654 321",
  },
  familySize: 4,
  disabilityStatus: "None reported",
};

type InfoRow = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

type PatientProfileScreenProps = {
  patient?: PatientProfile;
  onBack: () => void;
  onEdit?: (patientId: string) => void;
  onNavigate?: (screenKey: string, patientId: string) => void;
};

export default function PatientProfileScreen({
  patient = mockPatient,
  onBack,
  onEdit,
  onNavigate,
}: PatientProfileScreenProps) {
  const [activeTab, setActiveTab] = useState<
    "personal" | "contact" | "household"
  >("personal");

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

  const personalRows: InfoRow[] = [
    {
      icon: "calendar-outline",
      label: "Date of birth",
      value: patient.dateOfBirth,
    },
    { icon: "person-outline", label: "Gender", value: patient.gender },
    { icon: "water-outline", label: "Blood type", value: patient.bloodType },
    { icon: "flag-outline", label: "Nationality", value: patient.nationality },
    {
      icon: "heart-outline",
      label: "Marital status",
      value: patient.maritalStatus,
    },
    {
      icon: "briefcase-outline",
      label: "Occupation",
      value: patient.occupation ?? "Not specified",
    },
    {
      icon: "accessibility-outline",
      label: "Disability status",
      value: patient.disabilityStatus ?? "None reported",
    },
  ];

  const contactRows: InfoRow[] = [
    {
      icon: "call-outline",
      label: "Phone number",
      value: patient.phone ?? "Not provided",
    },
    {
      icon: "mail-outline",
      label: "Email address",
      value: patient.email ?? "Not provided",
    },
    {
      icon: "location-outline",
      label: "Camp / settlement",
      value: patient.campOrSettlement,
    },
    { icon: "home-outline", label: "Block / shelter", value: patient.block },
    {
      icon: "language-outline",
      label: "Languages spoken",
      value: patient.languagesSpoken.join(", "),
    },
  ];

  const householdRows: InfoRow[] = [
    {
      icon: "people-outline",
      label: "Household size",
      value: `${patient.familySize} members`,
    },
    {
      icon: "person-circle-outline",
      label: "Emergency contact",
      value: patient.emergencyContact.name,
    },
    {
      icon: "git-branch-outline",
      label: "Relationship",
      value: patient.emergencyContact.relation,
    },
    {
      icon: "call-outline",
      label: "Emergency phone",
      value: patient.emergencyContact.phone,
    },
  ];

  const activeRows =
    activeTab === "personal"
      ? personalRows
      : activeTab === "contact"
        ? contactRows
        : householdRows;

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

          <Text style={styles.topBarTitle}>Patient Profile</Text>

          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.7}
            onPress={() => onEdit?.(patient.id)}
          >
            <Ionicons name="create-outline" size={18} color={COLORS.blue} />
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.heroCard}>
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

          <Text style={styles.patientName}>{patient.fullName}</Text>

          <View
            style={[styles.statusPill, { backgroundColor: statusStyles.bg }]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: statusStyles.text }]}
            />
            <Text style={[styles.statusPillText, { color: statusStyles.text }]}>
              {patient.status} patient
            </Text>
          </View>

          <View style={styles.idBadge}>
            <Ionicons
              name="finger-print-outline"
              size={13}
              color={COLORS.gray600}
            />
            <Text style={styles.idBadgeText}>{patient.refugeeId}</Text>
          </View>

          <Text style={styles.registeredText}>
            Registered {patient.registrationDate}
          </Text>
        </View>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{patient.age}</Text>
            <Text style={styles.statLabel}>Years old</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{patient.bloodType}</Text>
            <Text style={styles.statLabel}>Blood type</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{patient.familySize}</Text>
            <Text style={styles.statLabel}>Household</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {(
            [
              { key: "personal", label: "Personal" },
              { key: "contact", label: "Contact" },
              { key: "household", label: "Household" },
            ] as const
          ).map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.tabTextActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info card */}
        <View style={styles.infoCard}>
          {activeRows.map((row, index) => (
            <View
              key={row.label}
              style={[
                styles.infoRow,
                index !== activeRows.length - 1 && styles.infoRowBorder,
              ]}
            >
              <View style={styles.infoIconWrap}>
                <Ionicons name={row.icon} size={16} color={COLORS.blue} />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text style={styles.infoValue}>{row.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Related records */}
        <Text style={styles.sectionTitle}>Related records</Text>

        <View style={styles.linksCard}>
          {[
            {
              key: "history",
              label: "Medical history",
              icon: "time-outline" as const,
            },
            {
              key: "documents",
              label: "Documents",
              icon: "document-text-outline" as const,
            },
            {
              key: "qrcode",
              label: "Patient QR code",
              icon: "qr-code-outline" as const,
            },
          ].map((link, index, arr) => (
            <TouchableOpacity
              key={link.key}
              style={[
                styles.linkRow,
                index !== arr.length - 1 && styles.infoRowBorder,
              ]}
              activeOpacity={0.7}
              onPress={() => onNavigate?.(link.key, patient.id)}
            >
              <View style={styles.linkIconWrap}>
                <Ionicons name={link.icon} size={16} color={COLORS.purple} />
              </View>

              <Text style={styles.linkLabel}>{link.label}</Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.gray500}
              />
            </TouchableOpacity>
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

  editButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },

  /* Hero */

  heroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  avatarWrap: {
    marginBottom: 12,
  },

  avatarImage: {
    width: 84,
    height: 84,
    borderRadius: 24,
  },

  avatarFallback: {
    width: 84,
    height: 84,
    borderRadius: 24,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarInitials: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: "800",
  },

  patientName: {
    fontSize: 19,
    fontWeight: "800",
    color: COLORS.black,
    letterSpacing: -0.3,
    marginBottom: 8,
  },

  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 10,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  statusPillText: {
    fontSize: 11,
    fontWeight: "800",
  },

  idBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 8,
  },

  idBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.gray900,
    marginLeft: 5,
  },

  registeredText: {
    fontSize: 10,
    color: COLORS.gray500,
  },

  /* Stats */

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingVertical: 14,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    alignItems: "center",
  },

  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.gray200,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.black,
  },

  statLabel: {
    fontSize: 9,
    color: COLORS.gray600,
    marginTop: 3,
    fontWeight: "600",
  },

  /* Tabs */

  tabsRow: {
    flexDirection: "row",
    backgroundColor: COLORS.gray200,
    borderRadius: 13,
    padding: 4,
    marginBottom: 14,
  },

  tab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
  },

  tabActive: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  tabText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.gray600,
  },

  tabTextActive: {
    color: COLORS.blue,
  },

  /* Info card */

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },

  infoIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 10,
    color: COLORS.gray600,
    fontWeight: "600",
  },

  infoValue: {
    fontSize: 13,
    color: COLORS.black,
    fontWeight: "700",
    marginTop: 2,
  },

  /* Related records */

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 10,
  },

  linksCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 14,
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },

  linkIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.purpleLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  linkLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.black,
  },
});
