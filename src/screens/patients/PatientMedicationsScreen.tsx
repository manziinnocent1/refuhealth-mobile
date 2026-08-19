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

type MedStatus = "active" | "completed" | "discontinued";

type Medication = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  route: string;
  status: MedStatus;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  purpose: string;
  refillsLeft?: number;
  lowStock?: boolean;
};

const STATUS_META: Record<
  MedStatus,
  { label: string; color: string; bg: string }
> = {
  active: { label: "Active", color: COLORS.success, bg: COLORS.successLight },
  completed: { label: "Completed", color: COLORS.gray600, bg: COLORS.gray100 },
  discontinued: {
    label: "Discontinued",
    color: COLORS.error,
    bg: COLORS.errorLight,
  },
};

const mockMedications: Medication[] = [
  {
    id: "m1",
    name: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily, morning",
    route: "Oral tablet",
    status: "active",
    startDate: "Jul 28, 2026",
    prescribedBy: "Dr. P. Nkurunziza",
    purpose: "Hypertension management",
    refillsLeft: 2,
    lowStock: true,
  },
  {
    id: "m2",
    name: "Paracetamol",
    dosage: "500mg",
    frequency: "Every 6 hours as needed",
    route: "Oral tablet",
    status: "active",
    startDate: "Aug 12, 2026",
    prescribedBy: "Dr. E. Bizimana",
    purpose: "Fever and pain relief",
    refillsLeft: 4,
  },
  {
    id: "m3",
    name: "Ferrous Sulfate",
    dosage: "200mg",
    frequency: "Twice daily with food",
    route: "Oral tablet",
    status: "active",
    startDate: "Jul 28, 2026",
    prescribedBy: "Dr. P. Nkurunziza",
    purpose: "Iron deficiency (low hemoglobin)",
    refillsLeft: 1,
    lowStock: true,
  },
  {
    id: "m4",
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    route: "Oral capsule",
    status: "completed",
    startDate: "Jun 10, 2025",
    endDate: "Jun 17, 2025",
    prescribedBy: "Dr. E. Bizimana",
    purpose: "Wound infection, 7-day course",
  },
  {
    id: "m5",
    name: "Sulfamethoxazole",
    dosage: "800mg",
    frequency: "Twice daily",
    route: "Oral tablet",
    status: "discontinued",
    startDate: "Jan 15, 2024",
    endDate: "Jan 17, 2024",
    prescribedBy: "Dr. E. Bizimana",
    purpose: "Stopped after allergic skin reaction",
  },
];

type PatientMedicationsScreenProps = {
  patientName?: string;
  medications?: Medication[];
  onBack: () => void;
  onAddMedication?: () => void;
  onSelectMedication?: (medicationId: string) => void;
};

export default function PatientMedicationsScreen({
  patientName = "Aline Uwimana",
  medications = mockMedications,
  onBack,
  onAddMedication,
  onSelectMedication,
}: PatientMedicationsScreenProps) {
  const [showPast, setShowPast] = useState(false);

  const activeMeds = medications.filter((m) => m.status === "active");
  const pastMeds = medications.filter((m) => m.status !== "active");
  const lowStockCount = activeMeds.filter((m) => m.lowStock).length;

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
            <Text style={styles.topBarTitle}>Medications</Text>
            <Text style={styles.topBarSubtitle} numberOfLines={1}>
              {patientName}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.7}
            onPress={onAddMedication}
          >
            <Ionicons name="add" size={20} color={COLORS.blue} />
          </TouchableOpacity>
        </View>

        {/* Low stock banner */}
        {lowStockCount > 0 && (
          <View style={styles.stockBanner}>
            <View style={styles.stockIconWrap}>
              <Ionicons name="alert-circle" size={18} color={COLORS.warning} />
            </View>

            <View style={styles.stockContent}>
              <Text style={styles.stockTitle}>
                {lowStockCount}{" "}
                {lowStockCount === 1 ? "medication" : "medications"} running low
              </Text>
              <Text style={styles.stockText}>
                Refill soon to avoid a gap in treatment.
              </Text>
            </View>
          </View>
        )}

        {/* Summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{activeMeds.length}</Text>
            <Text style={styles.summaryLabel}>Active</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, { color: COLORS.warning }]}>
              {lowStockCount}
            </Text>
            <Text style={styles.summaryLabel}>Low stock</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{pastMeds.length}</Text>
            <Text style={styles.summaryLabel}>Past</Text>
          </View>
        </View>

        {/* Active medications */}
        <Text style={styles.sectionTitle}>Active</Text>

        {activeMeds.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="medical-outline" size={28} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No active medications</Text>
          </View>
        ) : (
          activeMeds.map((med) => {
            const statusMeta = STATUS_META[med.status];

            return (
              <TouchableOpacity
                key={med.id}
                style={styles.medCard}
                activeOpacity={0.75}
                onPress={() => onSelectMedication?.(med.id)}
              >
                <View style={styles.medIconWrap}>
                  <Ionicons name="medical" size={19} color={COLORS.blue} />
                </View>

                <View style={styles.medContent}>
                  <View style={styles.medTopRow}>
                    <Text style={styles.medName}>
                      {med.name}{" "}
                      <Text style={styles.medDosage}>{med.dosage}</Text>
                    </Text>

                    {med.lowStock && (
                      <View style={styles.lowStockPill}>
                        <Text style={styles.lowStockPillText}>Low</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.medScheduleRow}>
                    <Ionicons
                      name="time-outline"
                      size={12}
                      color={COLORS.gray500}
                    />
                    <Text style={styles.medSchedule}>{med.frequency}</Text>
                  </View>

                  <View style={styles.medScheduleRow}>
                    <Ionicons
                      name="ellipse-outline"
                      size={12}
                      color={COLORS.gray500}
                    />
                    <Text style={styles.medSchedule}>{med.route}</Text>
                  </View>

                  <Text style={styles.medPurpose} numberOfLines={1}>
                    For {med.purpose}
                  </Text>

                  <View style={styles.medFooter}>
                    <Text style={styles.medFooterText}>
                      Since {med.startDate} · {med.prescribedBy}
                    </Text>

                    {med.refillsLeft !== undefined && (
                      <Text
                        style={[
                          styles.refillText,
                          med.lowStock && { color: COLORS.warning },
                        ]}
                      >
                        {med.refillsLeft}{" "}
                        {med.refillsLeft === 1 ? "refill" : "refills"} left
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* Past medications */}
        {pastMeds.length > 0 && (
          <>
            <TouchableOpacity
              style={styles.pastToggle}
              activeOpacity={0.7}
              onPress={() => setShowPast(!showPast)}
            >
              <Text style={styles.sectionTitle}>Past ({pastMeds.length})</Text>

              <Ionicons
                name={showPast ? "chevron-up" : "chevron-down"}
                size={18}
                color={COLORS.gray600}
              />
            </TouchableOpacity>

            {showPast &&
              pastMeds.map((med) => {
                const statusMeta = STATUS_META[med.status];

                return (
                  <TouchableOpacity
                    key={med.id}
                    style={[styles.medCard, styles.medCardMuted]}
                    activeOpacity={0.75}
                    onPress={() => onSelectMedication?.(med.id)}
                  >
                    <View style={[styles.medIconWrap, styles.medIconWrapMuted]}>
                      <Ionicons
                        name="medical-outline"
                        size={19}
                        color={COLORS.gray500}
                      />
                    </View>

                    <View style={styles.medContent}>
                      <View style={styles.medTopRow}>
                        <Text style={[styles.medName, styles.textMuted]}>
                          {med.name}{" "}
                          <Text style={styles.medDosage}>{med.dosage}</Text>
                        </Text>

                        <View
                          style={[
                            styles.statusPill,
                            { backgroundColor: statusMeta.bg },
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusPillText,
                              { color: statusMeta.color },
                            ]}
                          >
                            {statusMeta.label}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.medPurpose} numberOfLines={2}>
                        {med.purpose}
                      </Text>

                      <Text style={styles.medFooterText}>
                        {med.startDate}
                        {med.endDate ? ` – ${med.endDate}` : ""} ·{" "}
                        {med.prescribedBy}
                      </Text>
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

  /* Stock banner */

  stockBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.warningLight,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FBDFAF",
    padding: 12,
    marginBottom: 14,
  },

  stockIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  stockContent: {
    flex: 1,
  },

  stockTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#B45309",
  },

  stockText: {
    fontSize: 10,
    color: "#B45309",
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

  /* Med card */

  medCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 13,
    marginBottom: 10,
  },

  medCardMuted: {
    opacity: 0.8,
  },

  medIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  medIconWrapMuted: {
    backgroundColor: COLORS.gray100,
  },

  medContent: {
    flex: 1,
  },

  medTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  medName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
    flexShrink: 1,
    marginRight: 8,
  },

  medDosage: {
    fontWeight: "600",
    color: COLORS.gray600,
    fontSize: 12,
  },

  textMuted: {
    color: COLORS.gray600,
  },

  lowStockPill: {
    backgroundColor: COLORS.warningLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  lowStockPillText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.warning,
  },

  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },

  statusPillText: {
    fontSize: 9,
    fontWeight: "800",
  },

  medScheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  medSchedule: {
    fontSize: 11,
    color: COLORS.gray600,
    marginLeft: 5,
  },

  medPurpose: {
    fontSize: 11,
    color: COLORS.gray500,
    marginTop: 4,
    marginBottom: 8,
    fontStyle: "italic",
  },

  medFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  medFooterText: {
    fontSize: 10,
    color: COLORS.gray500,
    flexShrink: 1,
    marginRight: 8,
  },

  refillText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.gray600,
  },

  /* Past toggle */

  pastToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
