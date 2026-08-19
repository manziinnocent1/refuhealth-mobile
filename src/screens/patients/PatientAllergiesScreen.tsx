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

type AllergyType = "medication" | "food" | "environmental" | "other";
type Severity = "mild" | "moderate" | "severe";

type Allergy = {
  id: string;
  allergen: string;
  type: AllergyType;
  severity: Severity;
  reaction: string;
  firstNoted: string;
  notedBy: string;
  status: "active" | "resolved";
};

const TYPE_META: Record<
  AllergyType,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  medication: { label: "Medication", icon: "medical-outline" },
  food: { label: "Food", icon: "restaurant-outline" },
  environmental: { label: "Environmental", icon: "leaf-outline" },
  other: { label: "Other", icon: "alert-circle-outline" },
};

const SEVERITY_META: Record<
  Severity,
  { label: string; color: string; bg: string }
> = {
  mild: { label: "Mild", color: COLORS.success, bg: COLORS.successLight },
  moderate: {
    label: "Moderate",
    color: COLORS.warning,
    bg: COLORS.warningLight,
  },
  severe: { label: "Severe", color: COLORS.error, bg: COLORS.errorLight },
};

const mockAllergies: Allergy[] = [
  {
    id: "al1",
    allergen: "Penicillin",
    type: "medication",
    severity: "severe",
    reaction: "Swelling of face and throat, difficulty breathing",
    firstNoted: "Mar 4, 2023",
    notedBy: "Dr. E. Bizimana",
    status: "active",
  },
  {
    id: "al2",
    allergen: "Peanuts",
    type: "food",
    severity: "moderate",
    reaction: "Hives and mild swelling of lips",
    firstNoted: "Jun 19, 2022",
    notedBy: "Nurse J. Mukamana",
    status: "active",
  },
  {
    id: "al3",
    allergen: "Dust mites",
    type: "environmental",
    severity: "mild",
    reaction: "Sneezing, watery eyes, mild congestion",
    firstNoted: "Nov 2, 2021",
    notedBy: "Dr. P. Nkurunziza",
    status: "active",
  },
  {
    id: "al4",
    allergen: "Sulfa drugs",
    type: "medication",
    severity: "moderate",
    reaction: "Skin rash after 2 days of use",
    firstNoted: "Jan 15, 2024",
    notedBy: "Dr. E. Bizimana",
    status: "resolved",
  },
];

type PatientAllergiesScreenProps = {
  patientName?: string;
  allergies?: Allergy[];
  onBack: () => void;
  onAddAllergy?: () => void;
  onSelectAllergy?: (allergyId: string) => void;
};

export default function PatientAllergiesScreen({
  patientName = "Aline Uwimana",
  allergies = mockAllergies,
  onBack,
  onAddAllergy,
  onSelectAllergy,
}: PatientAllergiesScreenProps) {
  const [showResolved, setShowResolved] = useState(false);

  const activeAllergies = allergies.filter((a) => a.status === "active");
  const resolvedAllergies = allergies.filter((a) => a.status === "resolved");
  const severeCount = activeAllergies.filter(
    (a) => a.severity === "severe",
  ).length;

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

          <View style={styles.topBarTitleWrap}>
            <Text style={styles.topBarTitle}>Allergies</Text>
            <Text style={styles.topBarSubtitle} numberOfLines={1}>
              {patientName}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={onAddAllergy}
          >
            <Ionicons name="add" size={20} color={COLORS.blue} />
          </TouchableOpacity>
        </View>

        {/* Critical alert banner */}
        {severeCount > 0 && (
          <View style={styles.criticalBanner}>
            <View style={styles.criticalIconWrap}>
              <Ionicons name="warning" size={18} color={COLORS.error} />
            </View>

            <View style={styles.criticalContent}>
              <Text style={styles.criticalTitle}>
                {severeCount} severe{" "}
                {severeCount === 1 ? "allergy" : "allergies"} on record
              </Text>
              <Text style={styles.criticalText}>
                Review before prescribing or administering treatment.
              </Text>
            </View>
          </View>
        )}

        {/* Summary row */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{activeAllergies.length}</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.error }]}>
              {severeCount}
            </Text>
            <Text style={styles.summaryLabel}>Severe</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{resolvedAllergies.length}</Text>
            <Text style={styles.summaryLabel}>Resolved</Text>
          </View>
        </View>

        {/* Active allergies */}
        <Text style={styles.sectionTitle}>Active</Text>

        {activeAllergies.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="checkmark-circle-outline"
              size={28}
              color={COLORS.success}
            />
            <Text style={styles.emptyText}>No known active allergies</Text>
          </View>
        ) : (
          activeAllergies.map((allergy) => {
            const typeMeta = TYPE_META[allergy.type];
            const sevMeta = SEVERITY_META[allergy.severity];

            return (
              <TouchableOpacity
                key={allergy.id}
                style={[
                  styles.allergyCard,
                  allergy.severity === "severe" && styles.allergyCardSevere,
                ]}
                activeOpacity={0.75}
                onPress={() => onSelectAllergy?.(allergy.id)}
              >
                <View
                  style={[
                    styles.allergyIconWrap,
                    { backgroundColor: sevMeta.bg },
                  ]}
                >
                  <Ionicons
                    name={typeMeta.icon}
                    size={19}
                    color={sevMeta.color}
                  />
                </View>

                <View style={styles.allergyContent}>
                  <View style={styles.allergyTopRow}>
                    <Text style={styles.allergyName}>{allergy.allergen}</Text>

                    <View
                      style={[
                        styles.severityPill,
                        { backgroundColor: sevMeta.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.severityPillText,
                          { color: sevMeta.color },
                        ]}
                      >
                        {sevMeta.label}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.allergyType}>
                    {typeMeta.label} allergy
                  </Text>

                  <Text style={styles.allergyReaction} numberOfLines={2}>
                    {allergy.reaction}
                  </Text>

                  <View style={styles.allergyFooter}>
                    <Ionicons
                      name="calendar-outline"
                      size={11}
                      color={COLORS.gray500}
                    />
                    <Text style={styles.allergyFooterText}>
                      Noted {allergy.firstNoted} · {allergy.notedBy}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* Resolved allergies */}
        {resolvedAllergies.length > 0 && (
          <>
            <TouchableOpacity
              style={styles.resolvedToggle}
              activeOpacity={0.7}
              onPress={() => setShowResolved(!showResolved)}
            >
              <Text style={styles.sectionTitle}>
                Resolved ({resolvedAllergies.length})
              </Text>

              <Ionicons
                name={showResolved ? "chevron-up" : "chevron-down"}
                size={18}
                color={COLORS.gray600}
              />
            </TouchableOpacity>

            {showResolved &&
              resolvedAllergies.map((allergy) => {
                const typeMeta = TYPE_META[allergy.type];

                return (
                  <TouchableOpacity
                    key={allergy.id}
                    style={[styles.allergyCard, styles.allergyCardResolved]}
                    activeOpacity={0.75}
                    onPress={() => onSelectAllergy?.(allergy.id)}
                  >
                    <View
                      style={[
                        styles.allergyIconWrap,
                        { backgroundColor: COLORS.gray100 },
                      ]}
                    >
                      <Ionicons
                        name={typeMeta.icon}
                        size={19}
                        color={COLORS.gray500}
                      />
                    </View>

                    <View style={styles.allergyContent}>
                      <View style={styles.allergyTopRow}>
                        <Text style={[styles.allergyName, styles.textMuted]}>
                          {allergy.allergen}
                        </Text>

                        <View style={styles.resolvedPill}>
                          <Ionicons
                            name="checkmark"
                            size={11}
                            color={COLORS.gray600}
                          />
                          <Text style={styles.resolvedPillText}>Resolved</Text>
                        </View>
                      </View>

                      <Text style={styles.allergyType}>
                        {typeMeta.label} allergy
                      </Text>

                      <View style={styles.allergyFooter}>
                        <Ionicons
                          name="calendar-outline"
                          size={11}
                          color={COLORS.gray500}
                        />
                        <Text style={styles.allergyFooterText}>
                          Noted {allergy.firstNoted} · {allergy.notedBy}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </>
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
    marginBottom: 14,
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

  addButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Critical banner */

  criticalBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.errorLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F9CFCB",
    padding: 12,
    marginBottom: 14,
  },

  criticalIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  criticalContent: {
    flex: 1,
  },

  criticalTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.error,
  },

  criticalText: {
    fontSize: 10,
    color: "#B4271F",
    marginTop: 2,
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
    marginBottom: 20,
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

  /* Section */

  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 10,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingVertical: 30,
    marginBottom: 20,
  },

  emptyText: {
    fontSize: 12,
    color: COLORS.gray600,
    marginTop: 8,
    fontWeight: "600",
  },

  /* Allergy card */

  allergyCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 13,
    marginBottom: 10,
  },

  allergyCardSevere: {
    borderColor: "#F5B7B1",
  },

  allergyCardResolved: {
    opacity: 0.75,
  },

  allergyIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  allergyContent: {
    flex: 1,
  },

  allergyTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
  },

  allergyName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
    flexShrink: 1,
    marginRight: 8,
  },

  textMuted: {
    color: COLORS.gray600,
  },

  severityPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  severityPillText: {
    fontSize: 9,
    fontWeight: "800",
  },

  resolvedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  resolvedPillText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.gray600,
    marginLeft: 3,
  },

  allergyType: {
    fontSize: 10,
    color: COLORS.gray500,
    fontWeight: "600",
    marginBottom: 6,
  },

  allergyReaction: {
    fontSize: 11,
    color: COLORS.gray600,
    lineHeight: 16,
    marginBottom: 8,
  },

  allergyFooter: {
    flexDirection: "row",
    alignItems: "center",
  },

  allergyFooterText: {
    fontSize: 10,
    color: COLORS.gray500,
    marginLeft: 5,
  },

  /* Resolved toggle */

  resolvedToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
