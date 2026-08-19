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
import QRCode from "react-native-qrcode-svg";

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

type PatientQRCodeScreenProps = {
  patientName?: string;
  refugeeId?: string;
  patientRecordId?: string;
  qrValue?: string;
  expiresLabel?: string;
  onBack: () => void;
  onShare?: () => void;
  onDownload?: () => void;
  onRegenerate?: () => void;
};

export default function PatientQRCodeScreen({
  patientName = "Aline Uwimana",
  refugeeId = "RW-KGL-88213",
  patientRecordId = "pt_10234",
  qrValue,
  expiresLabel = "Valid until Sep 19, 2026",
  onBack,
  onShare,
  onDownload,
  onRegenerate,
}: PatientQRCodeScreenProps) {
  const [revealed, setRevealed] = useState(true);

  const initials = patientName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // In production this should be a signed token, not raw patient data.
  const codeValue =
    qrValue ?? `refuhealth://patient/${patientRecordId}?id=${refugeeId}`;

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

          <Text style={styles.topBarTitle}>Patient QR Code</Text>

          <TouchableOpacity
            style={styles.regenButton}
            activeOpacity={0.7}
            onPress={onRegenerate}
          >
            <Ionicons name="refresh" size={18} color={COLORS.gray900} />
          </TouchableOpacity>
        </View>

        {/* QR Card */}
        <View style={styles.qrCard}>
          <View style={styles.patientRow}>
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>

            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patientName}</Text>
              <Text style={styles.patientId}>{refugeeId}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.qrWrap}>
            {revealed ? (
              <QRCode
                value={codeValue}
                size={200}
                color={COLORS.black}
                backgroundColor={COLORS.white}
              />
            ) : (
              <View style={styles.qrHidden}>
                <Ionicons
                  name="eye-off-outline"
                  size={28}
                  color={COLORS.gray500}
                />
                <Text style={styles.qrHiddenText}>Code hidden</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.revealToggle}
            activeOpacity={0.7}
            onPress={() => setRevealed(!revealed)}
          >
            <Ionicons
              name={revealed ? "eye-off-outline" : "eye-outline"}
              size={14}
              color={COLORS.blue}
            />
            <Text style={styles.revealToggleText}>
              {revealed ? "Hide code" : "Show code"}
            </Text>
          </TouchableOpacity>

          <View style={styles.expiryBadge}>
            <Ionicons name="time-outline" size={12} color={COLORS.gray600} />
            <Text style={styles.expiryText}>{expiresLabel}</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryAction]}
            activeOpacity={0.85}
            onPress={onShare}
          >
            <Ionicons name="share-outline" size={17} color={COLORS.white} />
            <Text style={styles.primaryActionText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryAction]}
            activeOpacity={0.85}
            onPress={onDownload}
          >
            <Ionicons name="download-outline" size={17} color={COLORS.blue} />
            <Text style={styles.secondaryActionText}>Download</Text>
          </TouchableOpacity>
        </View>

        {/* How it works */}
        <Text style={styles.sectionTitle}>How this code is used</Text>

        <View style={styles.infoCard}>
          {[
            {
              icon: "scan-outline" as const,
              title: "Scan at any facility",
              text: "Clinicians scan this code to instantly pull up the patient's record.",
            },
            {
              icon: "shield-checkmark-outline" as const,
              title: "Access is logged",
              text: "Every scan is recorded in the patient's access history for accountability.",
            },
            {
              icon: "time-outline" as const,
              title: "Expires automatically",
              text: "The code refreshes periodically and can be regenerated at any time.",
            },
          ].map((item, index, arr) => (
            <View
              key={item.title}
              style={[
                styles.infoRow,
                index !== arr.length - 1 && styles.infoRowBorder,
              ]}
            >
              <View style={styles.infoIconWrap}>
                <Ionicons name={item.icon} size={16} color={COLORS.blue} />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>{item.title}</Text>
                <Text style={styles.infoText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Security notice */}
        <View style={styles.securityNotice}>
          <Ionicons name="lock-closed" size={13} color={COLORS.gray500} />
          <Text style={styles.securityNoticeText}>
            Keep this code private. Only share it with verified healthcare
            staff.
          </Text>
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

  regenButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
  },

  /* QR Card */

  qrCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 18,
    alignItems: "center",
    marginBottom: 16,
  },

  patientRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 14,
  },

  avatarFallback: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarInitials: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
  },

  patientInfo: {
    flex: 1,
  },

  patientName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  patientId: {
    fontSize: 10,
    color: COLORS.gray500,
    marginTop: 2,
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    alignSelf: "stretch",
    marginBottom: 18,
  },

  qrWrap: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  qrHidden: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: COLORS.gray100,
    alignItems: "center",
    justifyContent: "center",
  },

  qrHiddenText: {
    fontSize: 11,
    color: COLORS.gray500,
    fontWeight: "600",
    marginTop: 8,
  },

  revealToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  revealToggleText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.blue,
    marginLeft: 5,
  },

  expiryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  expiryText: {
    fontSize: 10,
    color: COLORS.gray600,
    fontWeight: "600",
    marginLeft: 5,
  },

  /* Actions */

  actionsRow: {
    flexDirection: "row",
    marginBottom: 22,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 15,
  },

  primaryAction: {
    backgroundColor: COLORS.blue,
    marginRight: 8,

    shadowColor: COLORS.blue,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },

  primaryActionText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 7,
  },

  secondaryAction: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginLeft: 8,
  },

  secondaryActionText: {
    color: COLORS.blue,
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 7,
  },

  /* Info card */

  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 10,
  },

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
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

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 2,
  },

  infoText: {
    fontSize: 11,
    color: COLORS.gray600,
    lineHeight: 16,
  },

  /* Security notice */

  securityNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  securityNoticeText: {
    fontSize: 10,
    color: COLORS.gray500,
    marginLeft: 6,
    textAlign: "center",
    flexShrink: 1,
  },
});
