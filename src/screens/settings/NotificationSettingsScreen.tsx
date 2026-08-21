import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

type Props = {
  onBack?: () => void;
};

export default function NotificationSettingsScreen({ onBack }: Props) {
  const [prescriptions, setPrescriptions] = useState(true);
  const [referrals, setReferrals] = useState(true);
  const [messages, setMessages] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(false);

  const options = [
    {
      title: "Prescription Updates",
      subtitle: "Receive prescription status notifications",
      value: prescriptions,
      setValue: setPrescriptions,
    },
    {
      title: "Referral Updates",
      subtitle: "Receive referral progress notifications",
      value: referrals,
      setValue: setReferrals,
    },
    {
      title: "Messages",
      subtitle: "Receive secure message alerts",
      value: messages,
      setValue: setMessages,
    },
    {
      title: "System Updates",
      subtitle: "Receive application and maintenance notices",
      value: systemUpdates,
      setValue: setSystemUpdates,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        {options.map((option) => (
          <View key={option.title} style={styles.option}>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </View>

            <Switch value={option.value} onValueChange={option.setValue} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    height: 70,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: { fontSize: 34, lineHeight: 34, color: "#334155" },
  title: { fontSize: 18, fontWeight: "700", color: "#0F172A" },
  content: { padding: 20 },
  option: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
  },
  optionContent: { flex: 1, paddingRight: 15 },
  optionTitle: { fontSize: 14, fontWeight: "700", color: "#334155" },
  optionSubtitle: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 17,
    color: "#64748B",
  },
});
