import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ConflictChoice = "local" | "server" | null;

type Props = {
  syncId?: string;
  onResolved?: () => void;
  onBack?: () => void;
};

export default function SyncConflictScreen({
  syncId,
  onResolved,
  onBack,
}: Props) {
  const [selectedChoice, setSelectedChoice] = useState<ConflictChoice>(null);

  const resolveConflict = () => {
    if (!selectedChoice) {
      Alert.alert(
        "Select a Version",
        "Please choose which version you want to keep.",
      );
      return;
    }

    Alert.alert(
      "Conflict Resolved",
      `The ${
        selectedChoice === "local" ? "offline" : "server"
      } version was selected.`,
      [
        {
          text: "Done",
          onPress: onResolved,
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Resolve Sync Conflict</Text>

        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.warningIcon}>
          <Text style={styles.warningText}>!</Text>
        </View>

        <Text style={styles.title}>Conflicting Changes Found</Text>

        <Text style={styles.description}>
          The same medication record was changed on this device and on another
          device. Choose which version you want to keep.
        </Text>

        <Text style={styles.syncIdText}>Sync ID: {syncId ?? "N/A"}</Text>

        <Pressable
          style={[
            styles.versionCard,
            selectedChoice === "local" && styles.selectedCard,
          ]}
          onPress={() => setSelectedChoice("local")}
        >
          <View style={styles.versionHeader}>
            <Text style={styles.versionTitle}>This Device</Text>
            <Text style={styles.versionBadge}>OFFLINE VERSION</Text>
          </View>

          <Text style={styles.versionValue}>Medication: 1 tablet daily</Text>

          <Text style={styles.versionDate}>Modified: Today, 9:42 AM</Text>
        </Pressable>

        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>OR</Text>
        </View>

        <Pressable
          style={[
            styles.versionCard,
            selectedChoice === "server" && styles.selectedCard,
          ]}
          onPress={() => setSelectedChoice("server")}
        >
          <View style={styles.versionHeader}>
            <Text style={styles.versionTitle}>Server Version</Text>
            <Text style={styles.versionBadge}>CLOUD VERSION</Text>
          </View>

          <Text style={styles.versionValue}>Medication: 2 tablets daily</Text>

          <Text style={styles.versionDate}>Modified: Today, 9:55 AM</Text>
        </Pressable>

        <Pressable
          style={[
            styles.resolveButton,
            !selectedChoice && styles.disabledButton,
          ]}
          onPress={resolveConflict}
        >
          <Text style={styles.resolveButtonText}>Resolve Conflict</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    height: 70,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  warningIcon: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignSelf: "center",
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
  },
  warningText: {
    fontSize: 34,
    fontWeight: "700",
    color: "#D97706",
  },
  title: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },
  description: {
    marginTop: 9,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },
  syncIdText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 10,
    color: "#94A3B8",
  },
  versionCard: {
    marginTop: 22,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E2E8F0",
  },
  selectedCard: {
    borderColor: "#2563EB",
    backgroundColor: "#F8FBFF",
  },
  versionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  versionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
  },
  versionBadge: {
    fontSize: 9,
    fontWeight: "700",
    color: "#2563EB",
  },
  versionValue: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  versionDate: {
    marginTop: 7,
    fontSize: 11,
    color: "#94A3B8",
  },
  vsContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  vsText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
  },
  resolveButton: {
    height: 52,
    marginTop: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2563EB",
  },
  disabledButton: {
    backgroundColor: "#CBD5E1",
  },
  resolveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
