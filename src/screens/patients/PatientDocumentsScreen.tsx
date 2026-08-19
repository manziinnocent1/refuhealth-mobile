import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

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

type DocCategory =
  | "identification"
  | "lab"
  | "referral"
  | "consent"
  | "imaging"
  | "other";
type FileKind = "pdf" | "image" | "doc";

type PatientDocument = {
  id: string;
  name: string;
  category: DocCategory;
  fileKind: FileKind;
  sizeLabel: string;
  uploadedDate: string;
  uploadedBy: string;
};

const CATEGORY_META: Record<
  DocCategory,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    bg: string;
  }
> = {
  identification: {
    label: "Identification",
    icon: "id-card-outline",
    color: COLORS.blue,
    bg: COLORS.blueLight,
  },
  lab: {
    label: "Lab Report",
    icon: "flask-outline",
    color: COLORS.purple,
    bg: COLORS.purpleLight,
  },
  referral: {
    label: "Referral",
    icon: "swap-horizontal-outline",
    color: COLORS.blueDark,
    bg: COLORS.blueLight,
  },
  consent: {
    label: "Consent Form",
    icon: "document-text-outline",
    color: COLORS.warning,
    bg: COLORS.warningLight,
  },
  imaging: {
    label: "Imaging",
    icon: "scan-outline",
    color: COLORS.gray900,
    bg: COLORS.gray100,
  },
  other: {
    label: "Other",
    icon: "attach-outline",
    color: COLORS.gray600,
    bg: COLORS.gray100,
  },
};

const FILE_KIND_ICON: Record<FileKind, keyof typeof Ionicons.glyphMap> = {
  pdf: "document-outline",
  image: "image-outline",
  doc: "document-text-outline",
};

const mockDocuments: PatientDocument[] = [
  {
    id: "d1",
    name: "UNHCR Identification Card",
    category: "identification",
    fileKind: "image",
    sizeLabel: "1.2 MB",
    uploadedDate: "Jan 9, 2021",
    uploadedBy: "Registration Officer",
  },
  {
    id: "d2",
    name: "Malaria Rapid Test Result",
    category: "lab",
    fileKind: "pdf",
    sizeLabel: "340 KB",
    uploadedDate: "Aug 12, 2026",
    uploadedBy: "Nurse J. Mukamana",
  },
  {
    id: "d3",
    name: "Referral Letter — District Hospital",
    category: "referral",
    fileKind: "pdf",
    sizeLabel: "210 KB",
    uploadedDate: "Aug 6, 2026",
    uploadedBy: "Dr. E. Bizimana",
  },
  {
    id: "d4",
    name: "Treatment Consent Form",
    category: "consent",
    fileKind: "pdf",
    sizeLabel: "180 KB",
    uploadedDate: "Jul 28, 2026",
    uploadedBy: "Dr. P. Nkurunziza",
  },
  {
    id: "d5",
    name: "Chest X-Ray Scan",
    category: "imaging",
    fileKind: "image",
    sizeLabel: "4.8 MB",
    uploadedDate: "Jul 28, 2026",
    uploadedBy: "Radiology Dept.",
  },
  {
    id: "d6",
    name: "Blood Panel Report",
    category: "lab",
    fileKind: "pdf",
    sizeLabel: "295 KB",
    uploadedDate: "Jul 28, 2026",
    uploadedBy: "Kigali District Hospital",
  },
  {
    id: "d7",
    name: "Vaccination Record Card",
    category: "other",
    fileKind: "doc",
    sizeLabel: "150 KB",
    uploadedDate: "Nov 2, 2025",
    uploadedBy: "Nurse A. Uwase",
  },
];

const FILTERS: { key: "all" | DocCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "identification", label: "ID" },
  { key: "lab", label: "Labs" },
  { key: "referral", label: "Referrals" },
  { key: "consent", label: "Consent" },
  { key: "imaging", label: "Imaging" },
  { key: "other", label: "Other" },
];

type PatientDocumentsScreenProps = {
  patientName?: string;
  documents?: PatientDocument[];
  onBack: () => void;
  onUpload?: () => void;
  onOpenDocument?: (documentId: string) => void;
};

export default function PatientDocumentsScreen({
  patientName = "Aline Uwimana",
  documents = mockDocuments,
  onBack,
  onUpload,
  onOpenDocument,
}: PatientDocumentsScreenProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | DocCategory>("all");
  const [search, setSearch] = useState("");

  const filtered = documents.filter((doc) => {
    const matchesFilter =
      activeFilter === "all" || doc.category === activeFilter;
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={17} color={COLORS.blue} />
        </TouchableOpacity>

        <View style={styles.topBarTitleWrap}>
          <Text style={styles.topBarTitle}>Documents</Text>
          <Text style={styles.topBarSubtitle} numberOfLines={1}>
            {patientName}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.uploadButton}
          activeOpacity={0.7}
          onPress={onUpload}
        >
          <Ionicons name="cloud-upload-outline" size={18} color={COLORS.blue} />
        </TouchableOpacity>
      </View>

      <View style={styles.headerFixed}>
        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={17} color={COLORS.gray500} />
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
            placeholder="Search documents"
            placeholderTextColor={COLORS.gray500}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={17} color={COLORS.gray500} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipScrollContent}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                style={[styles.chip, isActive && styles.chipActive]}
                activeOpacity={0.8}
                onPress={() => setActiveFilter(filter.key)}
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Document list */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        bounces={true}
      >
        <Text style={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? "document" : "documents"}
        </Text>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="folder-open-outline"
              size={30}
              color={COLORS.gray300}
            />
            <Text style={styles.emptyText}>No documents found</Text>
          </View>
        ) : (
          filtered.map((doc) => {
            const catMeta = CATEGORY_META[doc.category];

            return (
              <TouchableOpacity
                key={doc.id}
                style={styles.docCard}
                activeOpacity={0.75}
                onPress={() => onOpenDocument?.(doc.id)}
              >
                <View
                  style={[styles.docIconWrap, { backgroundColor: catMeta.bg }]}
                >
                  <Ionicons
                    name={FILE_KIND_ICON[doc.fileKind]}
                    size={20}
                    color={catMeta.color}
                  />
                </View>

                <View style={styles.docContent}>
                  <Text style={styles.docName} numberOfLines={1}>
                    {doc.name}
                  </Text>

                  <View style={styles.docMetaRow}>
                    <View
                      style={[
                        styles.categoryTag,
                        { backgroundColor: catMeta.bg },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryTagText,
                          { color: catMeta.color },
                        ]}
                      >
                        {catMeta.label}
                      </Text>
                    </View>
                    <Text style={styles.docMetaText}>{doc.sizeLabel}</Text>
                  </View>

                  <Text style={styles.docFooterText}>
                    {doc.uploadedDate} · {doc.uploadedBy}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={COLORS.gray500}
                />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.gray100,
  },

  /* Top bar */

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  topBarTitleWrap: {
    alignItems: "center",
  },

  topBarTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.black,
  },

  topBarSubtitle: {
    fontSize: 10,
    color: COLORS.gray600,
    marginTop: 1,
  },

  uploadButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Header fixed section */

  headerFixed: {
    paddingHorizontal: 20,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.black,
    marginLeft: 8,
  },

  /* Chips */

  chipScroll: {
    flexGrow: 0,
    marginHorizontal: -20,
  },

  chipScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginRight: 8,
  },

  chipActive: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },

  chipText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.gray600,
  },

  chipTextActive: {
    color: COLORS.white,
  },

  /* Scroll */

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },

  resultCount: {
    fontSize: 11,
    color: COLORS.gray500,
    fontWeight: "600",
    marginBottom: 10,
  },

  /* Empty */

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },

  emptyText: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 10,
    fontWeight: "600",
  },

  /* Doc card */

  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: 12,
    marginBottom: 10,
  },

  docIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  docContent: {
    flex: 1,
    marginRight: 6,
  },

  docName: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.black,
    marginBottom: 5,
  },

  docMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 7,
    marginRight: 8,
  },

  categoryTagText: {
    fontSize: 9,
    fontWeight: "800",
  },

  docMetaText: {
    fontSize: 10,
    color: COLORS.gray500,
    fontWeight: "600",
  },

  docFooterText: {
    fontSize: 10,
    color: COLORS.gray500,
  },
});
