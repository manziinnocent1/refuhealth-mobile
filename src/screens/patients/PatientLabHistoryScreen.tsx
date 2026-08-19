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

type LabCategory =
  | "hematology"
  | "microbiology"
  | "chemistry"
  | "serology"
  | "imaging";
type ResultFlag = "normal" | "abnormal" | "critical" | "pending";

type LabResultItem = {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: ResultFlag;
};

type LabTest = {
  id: string;
  testName: string;
  category: LabCategory;
  date: string;
  facility: string;
  orderedBy: string;
  overallFlag: ResultFlag;
  results: LabResultItem[];
};

const CATEGORY_META: Record<
  LabCategory,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  hematology: { label: "Hematology", icon: "water-outline" },
  microbiology: { label: "Microbiology", icon: "bug-outline" },
  chemistry: { label: "Chemistry", icon: "flask-outline" },
  serology: { label: "Serology", icon: "shield-outline" },
  imaging: { label: "Imaging", icon: "scan-outline" },
};

const FLAG_META: Record<
  ResultFlag,
  { label: string; color: string; bg: string }
> = {
  normal: { label: "Normal", color: COLORS.success, bg: COLORS.successLight },
  abnormal: {
    label: "Abnormal",
    color: COLORS.warning,
    bg: COLORS.warningLight,
  },
  critical: { label: "Critical", color: COLORS.error, bg: COLORS.errorLight },
  pending: { label: "Pending", color: COLORS.gray600, bg: COLORS.gray100 },
};

const mockLabTests: LabTest[] = [
  {
    id: "lt1",
    testName: "Malaria Rapid Diagnostic Test",
    category: "microbiology",
    date: "Aug 12, 2026",
    facility: "Kigeme Health Post",
    orderedBy: "Dr. E. Bizimana",
    overallFlag: "normal",
    results: [
      {
        parameter: "P. falciparum antigen",
        value: "Not detected",
        unit: "",
        referenceRange: "Negative",
        flag: "normal",
      },
    ],
  },
  {
    id: "lt2",
    testName: "Complete Blood Count (CBC)",
    category: "hematology",
    date: "Jul 28, 2026",
    facility: "Kigali District Hospital",
    orderedBy: "Dr. P. Nkurunziza",
    overallFlag: "abnormal",
    results: [
      {
        parameter: "Hemoglobin",
        value: "10.8",
        unit: "g/dL",
        referenceRange: "12.0–15.5",
        flag: "abnormal",
      },
      {
        parameter: "White Blood Cells",
        value: "7.2",
        unit: "×10⁹/L",
        referenceRange: "4.0–11.0",
        flag: "normal",
      },
      {
        parameter: "Platelets",
        value: "245",
        unit: "×10⁹/L",
        referenceRange: "150–400",
        flag: "normal",
      },
      {
        parameter: "Hematocrit",
        value: "33",
        unit: "%",
        referenceRange: "36–46",
        flag: "abnormal",
      },
    ],
  },
  {
    id: "lt3",
    testName: "Basic Metabolic Panel",
    category: "chemistry",
    date: "Jul 28, 2026",
    facility: "Kigali District Hospital",
    orderedBy: "Dr. P. Nkurunziza",
    overallFlag: "critical",
    results: [
      {
        parameter: "Fasting Glucose",
        value: "182",
        unit: "mg/dL",
        referenceRange: "70–99",
        flag: "critical",
      },
      {
        parameter: "Sodium",
        value: "139",
        unit: "mmol/L",
        referenceRange: "135–145",
        flag: "normal",
      },
      {
        parameter: "Potassium",
        value: "4.1",
        unit: "mmol/L",
        referenceRange: "3.5–5.0",
        flag: "normal",
      },
      {
        parameter: "Creatinine",
        value: "0.9",
        unit: "mg/dL",
        referenceRange: "0.6–1.3",
        flag: "normal",
      },
    ],
  },
  {
    id: "lt4",
    testName: "HIV Rapid Test",
    category: "serology",
    date: "Feb 3, 2025",
    facility: "Kigeme Health Post",
    orderedBy: "Nurse J. Mukamana",
    overallFlag: "normal",
    results: [
      {
        parameter: "HIV 1/2 Antibody",
        value: "Non-reactive",
        unit: "",
        referenceRange: "Non-reactive",
        flag: "normal",
      },
    ],
  },
  {
    id: "lt5",
    testName: "Chest X-Ray",
    category: "imaging",
    date: "Jul 28, 2026",
    facility: "Kigali District Hospital",
    orderedBy: "Radiology Dept.",
    overallFlag: "pending",
    results: [
      {
        parameter: "Radiologist review",
        value: "Awaiting report",
        unit: "",
        referenceRange: "—",
        flag: "pending",
      },
    ],
  },
];

const FILTERS: { key: "all" | LabCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hematology", label: "Hematology" },
  { key: "chemistry", label: "Chemistry" },
  { key: "microbiology", label: "Microbiology" },
  { key: "serology", label: "Serology" },
  { key: "imaging", label: "Imaging" },
];

type PatientLabHistoryScreenProps = {
  patientName?: string;
  labTests?: LabTest[];
  onBack: () => void;
  onSelectTest?: (testId: string) => void;
};

export default function PatientLabHistoryScreen({
  patientName = "Aline Uwimana",
  labTests = mockLabTests,
  onBack,
  onSelectTest,
}: PatientLabHistoryScreenProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | LabCategory>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeFilter === "all"
      ? labTests
      : labTests.filter((t) => t.category === activeFilter);

  const criticalCount = labTests.filter(
    (t) => t.overallFlag === "critical",
  ).length;
  const pendingCount = labTests.filter(
    (t) => t.overallFlag === "pending",
  ).length;

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
          <Text style={styles.topBarTitle}>Lab History</Text>
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

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{labTests.length}</Text>
            <Text style={styles.summaryLabel}>Total tests</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.error }]}>
              {criticalCount}
            </Text>
            <Text style={styles.summaryLabel}>Critical</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.gray600 }]}>
              {pendingCount}
            </Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="flask-outline" size={30} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No lab tests in this category</Text>
          </View>
        ) : (
          filtered.map((test) => {
            const catMeta = CATEGORY_META[test.category];
            const flagMeta = FLAG_META[test.overallFlag];
            const isExpanded = expandedId === test.id;

            return (
              <View key={test.id} style={styles.testCard}>
                <TouchableOpacity
                  style={styles.testHeader}
                  activeOpacity={0.75}
                  onPress={() => setExpandedId(isExpanded ? null : test.id)}
                >
                  <View
                    style={[
                      styles.testIconWrap,
                      { backgroundColor: flagMeta.bg },
                    ]}
                  >
                    <Ionicons
                      name={catMeta.icon}
                      size={19}
                      color={flagMeta.color}
                    />
                  </View>

                  <View style={styles.testHeaderContent}>
                    <Text style={styles.testName}>{test.testName}</Text>
                    <Text style={styles.testMeta}>
                      {test.date} · {catMeta.label}
                    </Text>
                  </View>

                  <View
                    style={[styles.flagPill, { backgroundColor: flagMeta.bg }]}
                  >
                    <Text
                      style={[styles.flagPillText, { color: flagMeta.color }]}
                    >
                      {flagMeta.label}
                    </Text>
                  </View>

                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={16}
                    color={COLORS.gray500}
                    style={styles.chevron}
                  />
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.testBody}>
                    {test.results.map((result, index) => {
                      const resultFlag = FLAG_META[result.flag];
                      return (
                        <View
                          key={result.parameter}
                          style={[
                            styles.resultRow,
                            index !== test.results.length - 1 &&
                              styles.resultRowBorder,
                          ]}
                        >
                          <View style={styles.resultLeft}>
                            <Text style={styles.resultParam}>
                              {result.parameter}
                            </Text>
                            <Text style={styles.resultRange}>
                              Reference: {result.referenceRange}
                            </Text>
                          </View>

                          <View style={styles.resultRight}>
                            <Text
                              style={[
                                styles.resultValue,
                                { color: resultFlag.color },
                              ]}
                            >
                              {result.value} {result.unit}
                            </Text>
                          </View>
                        </View>
                      );
                    })}

                    <View style={styles.testFooter}>
                      <Ionicons
                        name="business-outline"
                        size={11}
                        color={COLORS.gray500}
                      />
                      <Text style={styles.testFooterText} numberOfLines={1}>
                        {test.facility} · Ordered by {test.orderedBy}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.viewFullButton}
                      activeOpacity={0.7}
                      onPress={() => onSelectTest?.(test.id)}
                    >
                      <Text style={styles.viewFullButtonText}>
                        View full report
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={13}
                        color={COLORS.blue}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })
        )}
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

  /* Chips */

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
    paddingTop: 4,
    paddingBottom: 40,
  },

  /* Summary */

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingVertical: 14,
    marginBottom: 16,
  },

  summaryCard: {
    flex: 1,
    alignItems: "center",
  },

  summaryDivider: {
    width: 1,
    height: 28,
    backgroundColor: COLORS.gray200,
  },

  summaryValue: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.black,
  },

  summaryLabel: {
    fontSize: 9,
    color: COLORS.gray600,
    marginTop: 3,
    fontWeight: "600",
  },

  /* Empty */

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },

  emptyText: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 10,
    fontWeight: "600",
  },

  /* Test card */

  testCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: 10,
    overflow: "hidden",
  },

  testHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
  },

  testIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  testHeaderContent: {
    flex: 1,
    marginRight: 6,
  },

  testName: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 2,
  },

  testMeta: {
    fontSize: 10,
    color: COLORS.gray500,
    fontWeight: "600",
  },

  flagPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
  },

  flagPillText: {
    fontSize: 9,
    fontWeight: "800",
  },

  chevron: {
    marginLeft: 2,
  },

  /* Test body */

  testBody: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    paddingHorizontal: 13,
    paddingTop: 4,
    paddingBottom: 13,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  resultRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },

  resultLeft: {
    flex: 1,
    marginRight: 10,
  },

  resultParam: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.black,
  },

  resultRange: {
    fontSize: 10,
    color: COLORS.gray500,
    marginTop: 2,
  },

  resultRight: {
    alignItems: "flex-end",
  },

  resultValue: {
    fontSize: 13,
    fontWeight: "800",
  },

  testFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 10,
  },

  testFooterText: {
    fontSize: 10,
    color: COLORS.gray500,
    marginLeft: 5,
    flexShrink: 1,
  },

  viewFullButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blueLight,
    borderRadius: 12,
    paddingVertical: 10,
  },

  viewFullButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.blue,
    marginRight: 6,
  },
});
