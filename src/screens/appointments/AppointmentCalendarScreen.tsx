// appointments/AppointmentCalendarScreen.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Appointment,
  AppointmentsStackParamList,
  COLORS,
  mockFetchAppointments,
} from "./types";

type Props = NativeStackScreenProps<
  AppointmentsStackParamList,
  "AppointmentCalendar"
>;

type FilterTab = "upcoming" | "past";

export default function AppointmentCalendarScreen({ navigation }: Props) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<FilterTab>("upcoming");

  const load = useCallback(async () => {
    const data = await mockFetchAppointments();
    setAppointments(data);
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const filtered = useMemo(() => {
    return appointments
      .filter((a) =>
        tab === "upcoming" ? a.status === "upcoming" : a.status !== "upcoming",
      )
      .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }, [appointments, tab]);

  const renderItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("AppointmentDetails", { appointmentId: item.id })
      }
    >
      <View style={styles.dateBlock}>
        <Text style={styles.dateDay}>{item.date.split("-")[2]}</Text>
        <Text style={styles.dateMonth}>{monthShort(item.date)}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.providerName}>{item.provider.name}</Text>
        <Text style={styles.serviceName}>{item.service.name}</Text>
        <Text style={styles.timeText}>{formatTime(item.time)}</Text>
      </View>
      <StatusPill status={item.status} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => navigation.navigate("BookAppointment")}
        >
          <Text style={styles.newButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        {(["upcoming", "past"] as FilterTab[]).map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, tab === t && styles.tabActive]}
            onPress={() => setTab(t)}
          >
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === "upcoming" ? "Upcoming" : "Past"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>Nothing here yet</Text>
          <Text style={styles.emptySubtitle}>
            {tab === "upcoming"
              ? "You don't have any upcoming appointments."
              : "You don't have any past appointments."}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
}

function StatusPill({ status }: { status: Appointment["status"] }) {
  const map = {
    upcoming: { label: "Upcoming", bg: "#E7F0F7", color: COLORS.primary },
    completed: { label: "Completed", bg: "#E5F3EC", color: COLORS.success },
    cancelled: { label: "Cancelled", bg: "#FBEAE9", color: COLORS.danger },
  } as const;
  const s = map[status];
  return (
    <View style={[pillStyles.pill, { backgroundColor: s.bg }]}>
      <Text style={[pillStyles.pillText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

function monthShort(iso: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const idx = parseInt(iso.split("-")[1], 10) - 1;
  return months[idx] ?? "";
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

const pillStyles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  pillText: { fontSize: 12, fontWeight: "600" },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 26, fontWeight: "700", color: COLORS.textPrimary },
  newButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: "#EEF1F4",
    borderRadius: 10,
    padding: 4,
    marginBottom: 8,
  },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center" },
  tabActive: { backgroundColor: COLORS.card },
  tabText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: "600" },
  tabTextActive: { color: COLORS.textPrimary },
  listContent: { padding: 20, paddingTop: 8 },
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateBlock: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: "#EEF3F8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  dateDay: { fontSize: 18, fontWeight: "700", color: COLORS.primaryDark },
  dateMonth: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  cardBody: { flex: 1 },
  providerName: { fontSize: 15, fontWeight: "700", color: COLORS.textPrimary },
  serviceName: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  timeText: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});
