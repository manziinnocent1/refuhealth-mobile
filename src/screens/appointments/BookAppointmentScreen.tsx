// appointments/BookAppointmentScreen.tsx
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
  AppointmentsStackParamList,
  COLORS,
  MOCK_PROVIDERS,
  MOCK_SERVICES,
  Provider,
  Service,
  TimeSlot,
  mockFetchTimeSlots,
} from "./types";

type Props = NativeStackScreenProps<
  AppointmentsStackParamList,
  "BookAppointment"
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

export default function BookAppointmentScreen({ navigation, route }: Props) {
  const preselectedProviderId = route.params?.providerId;

  const [provider, setProvider] = useState<Provider | undefined>(
    MOCK_PROVIDERS.find((p) => p.id === preselectedProviderId) ??
      MOCK_PROVIDERS[0],
  );
  const [service, setService] = useState<Service>(MOCK_SERVICES[0]);
  const dates = useMemo(() => nextNDates(10), []);
  const [selectedDate, setSelectedDate] = useState<string>(dates[0]);
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!provider) return;
    setLoadingSlots(true);
    setSelectedTime(null);
    mockFetchTimeSlots(selectedDate, provider.id).then((data) => {
      setSlots(data);
      setLoadingSlots(false);
    });
  }, [selectedDate, provider]);

  const canConfirm = provider && service && selectedDate && selectedTime;

  const handleConfirm = async () => {
    if (!canConfirm) return;
    setSubmitting(true);
    // Replace with a real API call, e.g. POST /appointments
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitting(false);
    Alert.alert(
      "Appointment booked",
      `${service.name} with ${provider?.name} on ${selectedDate} at ${selectedTime}.`,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("AppointmentCalendar"),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Book an Appointment</Text>

        <Section title="Provider">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_PROVIDERS.map((p) => (
              <SelectChip
                key={p.id}
                label={p.name}
                sublabel={p.specialty}
                selected={provider?.id === p.id}
                onPress={() => setProvider(p)}
              />
            ))}
          </ScrollView>
        </Section>

        <Section title="Service">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {MOCK_SERVICES.map((s) => (
              <SelectChip
                key={s.id}
                label={s.name}
                sublabel={`${s.durationMinutes} min · $${s.price}`}
                selected={service.id === s.id}
                onPress={() => setService(s)}
              />
            ))}
          </ScrollView>
        </Section>

        <Section title="Date">
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

        <Section title="Time">
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
      </ScrollView>

      <View style={styles.footer}>
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
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
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

function SelectChip({
  label,
  sublabel,
  selected,
  onPress,
}: {
  label: string;
  sublabel: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipLabel, selected && styles.chipTextSelected]}>
        {label}
      </Text>
      <Text style={[styles.chipSublabel, selected && styles.chipTextSelected]}>
        {sublabel}
      </Text>
    </TouchableOpacity>
  );
}

function weekdayShort(iso: string) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(iso).getDay()];
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20, paddingBottom: 12 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  chip: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
    minWidth: 140,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipLabel: { fontSize: 14, fontWeight: "700", color: COLORS.textPrimary },
  chipSublabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  chipTextSelected: { color: "#fff" },
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  confirmButtonDisabled: { backgroundColor: "#A9C0D2" },
  confirmButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
