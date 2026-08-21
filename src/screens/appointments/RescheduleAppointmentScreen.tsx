// appointments/RescheduleAppointmentScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Appointment,
  AppointmentsStackParamList,
  COLORS,
  TimeSlot,
  mockFetchAppointmentById,
  mockFetchTimeSlots,
} from "./types";

type Props = NativeStackScreenProps<
  AppointmentsStackParamList,
  "RescheduleAppointment"
>;

function nextNDates(n: number): string[] {
  const out: string[] = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d.toISOString().split("T")[0]);
  }
  return out;
}

export default function RescheduleAppointmentScreen({
  navigation,
  route,
}: Props) {
  const { appointmentId } = route.params;
  const [appointment, setAppointment] = useState<Appointment | undefined>();
  const [loading, setLoading] = useState(true);

  const dates = useMemo(() => nextNDates(10), []);
  const [selectedDate, setSelectedDate] = useState<string>(dates[0]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    mockFetchAppointmentById(appointmentId).then((data) => {
      setAppointment(data);
      setLoading(false);
    });
  }, [appointmentId]);

  useEffect(() => {
    if (!appointment) return;
    setLoadingSlots(true);
    setSelectedTime(null);
    mockFetchTimeSlots(selectedDate, appointment.provider.id).then((data) => {
      setSlots(data);
      setLoadingSlots(false);
    });
  }, [selectedDate, appointment]);

  const canConfirm = selectedDate && selectedTime;
  const isSameAsOriginal =
    appointment &&
    appointment.date === selectedDate &&
    appointment.time === selectedTime;

  const handleConfirm = async () => {
    if (!canConfirm || !appointment) return;
    setSubmitting(true);
    // Replace with a real API call, e.g. PATCH /appointments/:id
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    Alert.alert(
      "Appointment rescheduled",
      `Your appointment is now on ${selectedDate} at ${selectedTime}.`,
      [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("AppointmentDetails", {
              appointmentId: appointment.id,
            }),
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (!appointment) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.centered}>
          <Text style={styles.emptyTitle}>Appointment not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Reschedule Appointment</Text>
        <View style={styles.currentCard}>
          <Text style={styles.currentLabel}>Current</Text>
          <Text style={styles.currentValue}>
            {appointment.service.name} with {appointment.provider.name}
          </Text>
          <Text style={styles.currentValueSecondary}>
            {appointment.date} at {appointment.time}
          </Text>
        </View>

        <Section title="New date">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.dateChip,
                  selectedDate === d && styles.dateChipSelected,
                ]}
                onPress={() => setSelectedDate(d)}
              >
                <Text
                  style={[
                    styles.dateChipDay,
                    selectedDate === d && styles.dateChipTextSelected,
                  ]}
                >
                  {weekdayShort(d)}
                </Text>
                <Text
                  style={[
                    styles.dateChipNum,
                    selectedDate === d && styles.dateChipTextSelected,
                  ]}
                >
                  {d.split("-")[2]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Section>

        <Section title="New time">
          {loadingSlots ? (
            <ActivityIndicator
              color={COLORS.primary}
              style={{ marginTop: 12 }}
            />
          ) : (
            <View style={styles.slotGrid}>
              {slots.map((slot) => (
                <TouchableOpacity
                  key={slot.time}
                  disabled={!slot.available}
                  style={[
                    styles.slot,
                    !slot.available && styles.slotDisabled,
                    selectedTime === slot.time && styles.slotSelected,
                  ]}
                  onPress={() => setSelectedTime(slot.time)}
                >
                  <Text
                    style={[
                      styles.slotText,
                      !slot.available && styles.slotTextDisabled,
                      selectedTime === slot.time && styles.slotTextSelected,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </Section>

        {isSameAsOriginal && (
          <Text style={styles.warningText}>
            This is the same as the current appointment time.
          </Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.cancelLink}
        >
          <Text style={styles.cancelLinkText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !canConfirm && styles.confirmButtonDisabled,
          ]}
          disabled={!canConfirm || submitting}
          onPress={handleConfirm}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.confirmButtonText}>Save New Time</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function weekdayShort(iso: string) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(iso).getDay()];
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingBottom: 12 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  currentCard: {
    backgroundColor: "#EEF3F8",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  currentLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  currentValue: { fontSize: 14, fontWeight: "600", color: COLORS.textPrimary },
  currentValueSecondary: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  dateChip: {
    width: 56,
    height: 68,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  dateChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateChipDay: { fontSize: 12, color: COLORS.textSecondary, fontWeight: "600" },
  dateChipNum: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontWeight: "700",
    marginTop: 2,
  },
  dateChipTextSelected: { color: "#fff" },
  slotGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  slotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  slotDisabled: { backgroundColor: "#F0F1F3", borderColor: "#F0F1F3" },
  slotText: { fontSize: 13, fontWeight: "600", color: COLORS.textPrimary },
  slotTextSelected: { color: "#fff" },
  slotTextDisabled: { color: "#B7BCC3" },
  warningText: { fontSize: 13, color: COLORS.accent, fontWeight: "600" },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  cancelLink: { paddingVertical: 15 },
  cancelLinkText: {
    color: COLORS.textSecondary,
    fontWeight: "600",
    fontSize: 15,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  confirmButtonDisabled: { backgroundColor: "#A9C0D2" },
  confirmButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary },
});
