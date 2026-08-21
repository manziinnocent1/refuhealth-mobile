// appointments/AppointmentDetailsScreen.tsx
import React, { useEffect, useState } from "react";
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
  mockFetchAppointmentById,
} from "./types";

type Props = NativeStackScreenProps<
  AppointmentsStackParamList,
  "AppointmentDetails"
>;

export default function AppointmentDetailsScreen({ navigation, route }: Props) {
  const { appointmentId } = route.params;
  const [appointment, setAppointment] = useState<Appointment | undefined>();
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    mockFetchAppointmentById(appointmentId).then((data) => {
      setAppointment(data);
      setLoading(false);
    });
  }, [appointmentId]);

  const handleCancel = () => {
    Alert.alert(
      "Cancel appointment?",
      "This cannot be undone. You will need to book a new appointment if you change your mind.",
      [
        { text: "Keep appointment", style: "cancel" },
        {
          text: "Cancel appointment",
          style: "destructive",
          onPress: async () => {
            setCancelling(true);
            // Replace with a real API call, e.g. DELETE /appointments/:id
            await new Promise((resolve) => setTimeout(resolve, 500));
            setCancelling(false);
            navigation.navigate("AppointmentCalendar");
          },
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 12 }}
          >
            <Text style={styles.linkText}>Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isUpcoming = appointment.status === "upcoming";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusRow}>
          <StatusPill status={appointment.status} />
        </View>

        <Text style={styles.serviceName}>{appointment.service.name}</Text>
        <Text style={styles.providerName}>{appointment.provider.name}</Text>
        <Text style={styles.specialty}>{appointment.provider.specialty}</Text>

        <View style={styles.card}>
          <InfoRow label="Date" value={formatDate(appointment.date)} />
          <Divider />
          <InfoRow label="Time" value={formatTime(appointment.time)} />
          <Divider />
          <InfoRow
            label="Duration"
            value={`${appointment.service.durationMinutes} min`}
          />
          <Divider />
          <InfoRow label="Price" value={`$${appointment.service.price}`} />
        </View>

        {appointment.notes ? (
          <View style={styles.notesCard}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesText}>{appointment.notes}</Text>
          </View>
        ) : null}
      </ScrollView>

      {isUpcoming && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? (
              <ActivityIndicator color={COLORS.danger} />
            ) : (
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate("RescheduleAppointment", {
                appointmentId: appointment.id,
              })
            }
          >
            <Text style={styles.primaryButtonText}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function StatusPill({ status }: { status: Appointment["status"] }) {
  const map = {
    upcoming: { label: "Upcoming", bg: "#E7F0F7", color: COLORS.primary },
    completed: { label: "Completed", bg: "#E5F3EC", color: COLORS.success },
    cancelled: { label: "Cancelled", bg: "#FBEAE9", color: COLORS.danger },
  } as const;
  const s = map[status];
  return (
    <View style={[styles.pill, { backgroundColor: s.bg }]}>
      <Text style={[styles.pillText, { color: s.color }]}>{s.label}</Text>
    </View>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 20 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  statusRow: { marginBottom: 12 },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  pillText: { fontSize: 12, fontWeight: "600" },
  serviceName: { fontSize: 24, fontWeight: "700", color: COLORS.textPrimary },
  providerName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  specialty: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoLabel: { fontSize: 14, color: COLORS.textSecondary },
  infoValue: { fontSize: 14, fontWeight: "600", color: COLORS.textPrimary },
  divider: { height: 1, backgroundColor: COLORS.border },
  notesCard: {
    marginTop: 16,
    backgroundColor: "#FFF8F0",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3E3CC",
  },
  notesLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  notesText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 },
  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  primaryButtonText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#FBEAE9",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.danger,
    fontWeight: "700",
    fontSize: 15,
  },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary },
  linkText: { color: COLORS.primary, fontWeight: "600" },
});
