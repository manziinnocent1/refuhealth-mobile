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
  red: "#DC2626",
};

export default function MyDocumentsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Ionicons name="documents-outline" size={25} color={COLORS.blue} />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.title}>My Documents</Text>
            <Text style={styles.subtitle}>
              Access your healthcare documents.
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="shield-checkmark-outline"
            size={21}
            color={COLORS.blue}
          />

          <Text style={styles.infoText}>
            Your documents are securely stored and available to authorized
            healthcare providers.
          </Text>
        </View>

        <DocumentCard
          icon="document-text-outline"
          title="Medical Report"
          type="PDF"
          date="24 August 2026"
        />

        <DocumentCard
          icon="flask-outline"
          title="Laboratory Results"
          type="PDF"
          date="20 August 2026"
        />

        <DocumentCard
          icon="medkit-outline"
          title="Prescription"
          type="PDF"
          date="18 August 2026"
        />

        <View style={styles.emptyCard}>
          <View style={styles.emptyIcon}>
            <Ionicons
              name="folder-open-outline"
              size={25}
              color={COLORS.blue}
            />
          </View>

          <Text style={styles.emptyTitle}>Need another document?</Text>

          <Text style={styles.emptyText}>
            Ask your healthcare provider to upload a document to your RefuHealth
            record.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DocumentCard({
  icon,
  title,
  type,
  date,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  type: string;
  date: string;
}) {
  return (
    <TouchableOpacity style={styles.documentCard} activeOpacity={0.8}>
      <View style={styles.documentIcon}>
        <Ionicons name={icon} size={23} color={COLORS.blue} />
      </View>

      <View style={styles.documentInfo}>
        <Text style={styles.documentTitle}>{title}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.type}>{type}</Text>

          <View style={styles.dot} />

          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <View style={styles.downloadButton}>
        <Ionicons name="download-outline" size={20} color={COLORS.blue} />
      </View>
    </TouchableOpacity>
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
    marginBottom: 23,
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

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 18,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.gray700,
  },

  documentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  documentIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },

  documentTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.black,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  type: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.blue,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray500,
    marginHorizontal: 7,
  },

  date: {
    fontSize: 10,
    color: COLORS.gray500,
  },

  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#E8F1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 25,
    alignItems: "center",
    marginTop: 8,
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
    marginTop: 6,
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    color: COLORS.gray500,
  },
});
