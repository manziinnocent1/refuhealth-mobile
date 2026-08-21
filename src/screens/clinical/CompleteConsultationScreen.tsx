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
  gray500: "#6B7280",
  gray200: "#E5E7EB",
  background: "#F7F9FC",
  lightBlue: "#EAF2FF",
  green: "#16855B",
  lightGreen: "#E9F8F1",
};

type Props = {
  onComplete?: () => void;
};

export default function CompleteConsultationScreen({ onComplete }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="clipboard-check-outline"
            size={38}
            color={COLORS.blue}
          />
        </View>

        <Text style={styles.title}>Complete consultation</Text>

        <Text style={styles.subtitle}>
          Review the information below before completing this patient's
          consultation.
        </Text>

        {/* Patient */}
        <View style={styles.patientCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={23} color={COLORS.blue} />
          </View>

          <View>
            <Text style={styles.patientName}>Patient #RH-2026-0148</Text>
            <Text style={styles.patientDetails}>32 years • Female</Text>
          </View>
        </View>

        <ReviewItem icon="pulse-outline" title="Vital signs" value="Recorded" />

        <ReviewItem
          icon="document-text-outline"
          title="Clinical notes"
          value="Recorded"
        />

        <ReviewItem
          icon="analytics-outline"
          title="Diagnosis"
          value="Recorded"
        />

        <ReviewItem
          icon="medkit-outline"
          title="Prescription"
          value="No medication added"
        />

        <ReviewItem
          icon="flask-outline"
          title="Laboratory"
          value="No tests ordered"
        />

        {/* Important */}
        <View style={styles.notice}>
          <Ionicons
            name="shield-checkmark-outline"
            size={21}
            color={COLORS.blue}
          />

          <Text style={styles.noticeText}>
            Completing this consultation will save the clinical information to
            the patient's record and make it available to authorized providers.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          activeOpacity={0.85}
          onPress={onComplete}
        >
          <Text style={styles.completeText}>Complete & Save Consultation</Text>

          <Ionicons name="checkmark-circle" size={22} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Continue Editing</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function ReviewItem({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewIcon}>
        <Ionicons name={icon} size={20} color={COLORS.blue} />
      </View>

      <View style={styles.reviewContent}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewValue}>{value}</Text>
      </View>

      <Ionicons name="checkmark-circle" size={20} color={COLORS.green} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: 20,
    paddingBottom: 45,
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  title: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 27,
    fontWeight: "900",
    color: COLORS.black,
  },

  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.gray500,
  },

  patientCard: {
    marginTop: 25,
    padding: 15,
    borderRadius: 19,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  patientName: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
  },

  patientDetails: {
    marginLeft: 12,
    marginTop: 4,
    fontSize: 10,
    color: COLORS.gray500,
  },

  reviewCard: {
    minHeight: 69,
    marginTop: 10,
    padding: 12,
    borderRadius: 17,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
  },

  reviewIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  reviewContent: {
    flex: 1,
    marginLeft: 11,
  },

  reviewTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.black,
  },

  reviewValue: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.gray500,
  },

  notice: {
    marginTop: 20,
    padding: 14,
    borderRadius: 17,
    backgroundColor: COLORS.lightBlue,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  noticeText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 10,
    lineHeight: 16,
    color: COLORS.gray500,
  },

  completeButton: {
    marginTop: 22,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  completeText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  cancelButton: {
    height: 50,
    marginTop: 9,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.blue,
  },
});
