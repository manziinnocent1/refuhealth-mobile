import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Facility = {
  id: string;
  name: string;
  specialty: string;
  distance: string;
};

type Props = {
  onBack?: () => void;
  onSelectFacility?: (facilityId: string) => void;
};

const facilities: Facility[] = [
  {
    id: "FAC-001",
    name: "Kigali Referral Hospital",
    specialty: "Specialist and Advanced Care",
    distance: "3.2 km away",
  },
  {
    id: "FAC-002",
    name: "University Teaching Hospital",
    specialty: "Surgery and Specialist Services",
    distance: "5.8 km away",
  },
  {
    id: "FAC-003",
    name: "Community Health Centre",
    specialty: "Primary and Community Care",
    distance: "1.4 km away",
  },
];

export default function ReferralNetworkScreen({
  onBack,
  onSelectFacility,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backButton}>‹</Text>
        </Pressable>

        <View>
          <Text style={styles.title}>Referral Network</Text>
          <Text style={styles.subtitle}>Available healthcare facilities</Text>
        </View>
      </View>

      <FlatList
        data={facilities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => onSelectFacility?.(item.id)}
          >
            <View style={styles.icon}>
              <Text style={styles.iconText}>+</Text>
            </View>

            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <Text style={styles.distance}>{item.distance}</Text>
            </View>

            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    fontSize: 34,
    lineHeight: 34,
    color: "#334155",
    marginRight: 14,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#0F172A" },
  subtitle: { marginTop: 3, fontSize: 12, color: "#64748B" },
  list: { padding: 20 },
  card: {
    padding: 14,
    marginBottom: 10,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: { fontSize: 24, fontWeight: "700", color: "#2563EB" },
  content: { flex: 1 },
  name: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  specialty: { marginTop: 4, fontSize: 11, color: "#64748B" },
  distance: { marginTop: 5, fontSize: 10, color: "#2563EB" },
  arrow: { fontSize: 28, color: "#94A3B8" },
});
