import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  onProfile?: () => void;
  onLanguage?: () => void;
  onSecurity?: () => void;
  onNotifications?: () => void;
};

export default function SettingsScreen({
  onProfile,
  onLanguage,
  onSecurity,
  onNotifications,
}: Props) {
  const items = [
    {
      title: "My Profile",
      subtitle: "Personal information",
      onPress: onProfile,
    },
    {
      title: "Language",
      subtitle: "Choose application language",
      onPress: onLanguage,
    },
    {
      title: "Security",
      subtitle: "Password and account security",
      onPress: onSecurity,
    },
    {
      title: "Notifications",
      subtitle: "Manage notification preferences",
      onPress: onNotifications,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>
            Manage your application preferences
          </Text>
        </View>

        <View style={styles.list}>
          {items.map((item) => (
            <Pressable
              key={item.title}
              style={styles.item}
              onPress={item.onPress}
            >
              <View style={styles.icon}>
                <Text style={styles.iconText}>●</Text>
              </View>

              <View style={styles.content}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.version}>Healthcare App • Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 5, fontSize: 13, color: "#64748B" },
  list: { marginTop: 15 },
  item: {
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: { color: "#2563EB", fontSize: 12 },
  content: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: "700", color: "#334155" },
  itemSubtitle: { marginTop: 4, fontSize: 11, color: "#64748B" },
  arrow: { fontSize: 26, color: "#94A3B8" },
  version: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 11,
    color: "#94A3B8",
  },
});
