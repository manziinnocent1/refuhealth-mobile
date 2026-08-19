import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

type HistoryCategory =
  | "visit"
  | "diagnosis"
  | "lab"
  | "medication"
  | "referral"
  | "vaccination"
  | "surgery";

type HistoryEntry = {
  id: string;
  category: HistoryCategory;
  title: string;
  detail: string;
  facility: string;
  clinician: string;
  date: string;
  dateGroup: string; // e.g. "2026", "2025"
};

const CATEGORY_META: Record<
  HistoryCategory,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    bg: string;
  }
> = {
  visit: {
    label: "Visit",
    icon: "medkit-outline",
    color: COLORS.blue,
    bg: COLORS.blueLight,
  },
  diagnosis: {
    label: "Diagnosis",
    icon: "pulse-outline",
    color: COLORS.error,
    bg: COLORS.errorLight,
  },
  lab: {
    label: "Lab",
    icon: "flask-outline",
    color: COLORS.purple,
    bg: COLORS.purpleLight,
  },
  medication: {
    label: "Medication",
    icon: "medical-outline",
    color: COLORS.warning,
    bg: COLORS.warningLight,
  },
  referral: {
    label: "Referral",
    icon: "swap-horizontal-outline",
    color: COLORS.blueDark,
    bg: COLORS.blueLight,
  },
  vaccination: {
    label: "Vaccination",
    icon: "shield-checkmark-outline",
    color: COLORS.success,
    bg: COLORS.successLight,
  },
  surgery: {
    label: "Procedure",
    icon: "cut-outline",
    color: COLORS.gray900,
    bg: COLORS.gray100,
  },
};

const mockHistory: HistoryEntry[] = [
  {
    id: "h1",
    category: "lab",
    title: "Malaria rapid test",
    detail: "Result: Negative",
    facility: "Kigeme Health Post",
    clinician: "Nurse J. Mukamana",
    date: "Aug 12, 2026",
    dateGroup: "2026",
  },
  {
    id: "h2",
    category: "visit",
    title: "General consultation",
    detail: "Fever and fatigue, prescribed rest and fluids",
    facility: "Kigeme Health Post",
    clinician: "Dr. E. Bizimana",
    date: "Aug 12, 2026",
    dateGroup: "2026",
  },
  {
    id: "h3",
    category: "referral",
    title: "Referred to district hospital",
    detail: "Suspected hypertension complications",
    facility: "Kigeme Health Post",
    clinician: "Dr. E. Bizimana",
    date: "Aug 6, 2026",
    dateGroup: "2026",
  },
  {
    id: "h4",
    category: "medication",
    title: "Amlodipine 5mg prescribed",
    detail: "Once daily, 30-day supply",
    facility: "Kigali District Hospital",
    clinician: "Dr. P. Nkurunziza",
    date: "Jul 28, 2026",
    dateGroup: "2026",
  },
  {
    id: "h5",
    category: "diagnosis",
    title: "Hypertension confirmed",
    detail: "Stage 1, monitoring recommended",
    facility: "Kigali District Hospital",
    clinician: "Dr. P. Nkurunziza",
    date: "Jul 28, 2026",
    dateGroup: "2026",
  },
  {
    id: "h6",
    category: "vaccination",
    title: "Tetanus booster",
    detail: "Routine immunization, next due 2031",
    facility: "Kigeme Health Post",
    clinician: "Nurse A. Uwase",
    date: "Nov 2, 2025",
    dateGroup: "2025",
  },
  {
    id: "h7",
    category: "surgery",
    title: "Minor wound debridement",
    detail: "Left forearm laceration, sutured",
    facility: "Kigeme Health Post",
    clinician: "Dr. E. Bizimana",
    date: "Jun 15, 2025",
    dateGroup: "2025",
  },
  {
    id: "h8",
    category: "visit",
    title: "Antenatal checkup",
    detail: "Routine follow-up, no concerns",
    facility: "Kigeme Health Post",
    clinician: "Nurse J. Mukamana",
    date: "Feb 3, 2025",
    dateGroup: "2025",
  },
];

const FILTERS: { key: "all" | HistoryCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "visit", label: "Visits" },
  { key: "diagnosis", label: "Diagnoses" },
  { key: "lab", label: "Labs" },
  { key: "medication", label: "Medications" },
  { key: "referral", label: "Referrals" },
  { key: "vaccination", label: "Vaccinations" },
];

type PatientHistoryScreenProps = {
  patientName?: string;
  history?: HistoryEntry[];
  onBack: () => void;
  onSelectEntry?: (entryId: string) => void;
};

export default function PatientHistoryScreen({
  patientName = "Aline Uwimana",
  history = mockHistory,
  onBack,
  onSelectEntry,
}: PatientHistoryScreenProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | HistoryCategory>(
    "all",
  );

  const filtered =
    activeFilter === "all"
      ? history
      : history.filter((h) => h.category === activeFilter);

  // Group by dateGroup, preserving order of first appearance
  const groups: { label: string; entries: HistoryEntry[] }[] = [];
  filtered.forEach((entry) => {
    const existing = groups.find((g) => g.label === entry.dateGroup);
    if (existing) {
      existing.entries.push(entry);
    } else {
      groups.push({ label: entry.dateGroup, entries: [entry] });
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={17} color={COLORS.blue} />
        </TouchableOpacity>

        <View style={styles.topBarTitleWrap}>
          <Text style={styles.topBarTitle}>Medical History</Text>
          <Text style={styles.topBarSubtitle} numberOfLines={1}>
            {patientName}
          </Text>
        </View>

        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Ionicons name="funnel-outline" size={17} color={COLORS.gray900} />
        </TouchableOpacity>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipScrollContent}
      >
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter.key;
          return (
            <TouchableOpacity
              key={filter.key}
              style={[styles.chip, isActive && styles.chipActive]}
              activeOpacity={0.8}
              onPress={() => setActiveFilter(filter.key)}
            >
              <Text
                style={[styles.chipText, isActive && styles.chipTextActive]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Timeline */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {groups.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={32} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No records in this category</Text>
          </View>
        )}

        {groups.map((group) => (
          <View key={group.label} style={styles.yearGroup}>
            <Text style={styles.yearLabel}>{group.label}</Text>

            <View style={styles.timeline}>
              {group.entries.map((entry, index) => {
                const meta = CATEGORY_META[entry.category];
                const isLast = index === group.entries.length - 1;

                return (
                  <TouchableOpacity
                    key={entry.id}
                    style={styles.timelineRow}
                    activeOpacity={0.7}
                    onPress={() => onSelectEntry?.(entry.id)}
                  >
                    <View style={styles.timelineRail}>
                      <View
                        style={[
                          styles.timelineDot,
                          { backgroundColor: meta.color },
                        ]}
                      />
                      {!isLast && <View style={styles.timelineLine} />}
                    </View>

                    <View style={styles.entryCard}>
                      <View style={styles.entryTopRow}>
                        <View
                          style={[
                            styles.categoryBadge,
                            { backgroundColor: meta.bg },
                          ]}
                        >
                          <Ionicons
                            name={meta.icon}
                            size={11}
                            color={meta.color}
                          />
                          <Text
                            style={[
                              styles.categoryBadgeText,
                              { color: meta.color },
                            ]}
                          >
                            {meta.label}
                          </Text>
                        </View>

                        <Text style={styles.entryDate}>{entry.date}</Text>
                      </View>

                      <Text style={styles.entryTitle}>{entry.title}</Text>
                      <Text style={styles.entryDetail} numberOfLines={2}>
                        {entry.detail}
                      </Text>

                      <View style={styles.entryFooter}>
                        <Ionicons
                          name="business-outline"
                          size={11}
                          color={COLORS.gray500}
                        />
                        <Text style={styles.entryFooterText} numberOfLines={1}>
                          {entry.facility} · {entry.clinician}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },

  /* Top bar */

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  topBarTitleWrap: {
    alignItems: "center",
  },

  topBarTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.black,
  },

  topBarSubtitle: {
    fontSize: 10,
    color: COLORS.gray600,
    marginTop: 1,
    maxWidth: 180,
  },

  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Filter chips */

  chipScroll: {
    flexGrow: 0,
    marginBottom: 6,
  },

  chipScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },

  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.gray600,
  },

  chipTextActive: {
    color: COLORS.white,
  },

  /* Scroll */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },

  /* Empty */

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },

  emptyText: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 10,
    fontWeight: "600",
  },

  /* Year group */

  yearGroup: {
    marginBottom: 8,
  },

  yearLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.gray500,
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  timeline: {},

  timelineRow: {
    flexDirection: "row",
  },

  timelineRail: {
    width: 20,
    alignItems: "center",
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },

  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.gray200,
    marginTop: 2,
  },

  /* Entry card */

  entryCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 13,
    marginLeft: 8,
    marginBottom: 14,
  },

  entryTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  categoryBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    marginLeft: 4,
  },

  entryDate: {
    fontSize: 10,
    color: COLORS.gray500,
    fontWeight: "600",
  },

  entryTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 3,
  },

  entryDetail: {
    fontSize: 11,
    color: COLORS.gray600,
    lineHeight: 16,
    marginBottom: 9,
  },

  entryFooter: {
    flexDirection: "row",
    alignItems: "center",
  },

  entryFooterText: {
    fontSize: 10,
    color: COLORS.gray500,
    marginLeft: 5,
    flexShrink: 1,
  },
});
