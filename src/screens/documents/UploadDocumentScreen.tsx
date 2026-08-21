import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

type DocumentCategory =
  | "Laboratory"
  | "Referral"
  | "Prescription"
  | "Clinical"
  | "Other";

export default function UploadDocumentScreen() {
  const [category, setCategory] = useState<DocumentCategory>("Laboratory");
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleSelectFile = () => {
    setSelectedFile("medical_report.pdf");
  };

  const handleUpload = () => {
    if (!documentName.trim()) {
      Alert.alert("Document name required", "Please enter a document name.");
      return;
    }

    if (!selectedFile) {
      Alert.alert("Select a file", "Please select a document to upload.");
      return;
    }

    Alert.alert(
      "Upload Complete",
      "Your document has been securely added to your medical record.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View style={styles.uploadCircle}>
            <Text style={styles.uploadIcon}>↑</Text>
          </View>

          <Text style={styles.title}>Upload Document</Text>

          <Text style={styles.subtitle}>
            Add a medical document to your secure healthcare record.
          </Text>
        </View>

        {/* Upload Area */}
        <TouchableOpacity
          style={[styles.dropZone, selectedFile && styles.selectedDropZone]}
          onPress={handleSelectFile}
          activeOpacity={0.8}
        >
          <View style={styles.fileCircle}>
            <Text style={styles.fileIcon}>＋</Text>
          </View>

          {selectedFile ? (
            <>
              <Text style={styles.fileSelectedTitle}>{selectedFile}</Text>
              <Text style={styles.fileSelectedText}>
                File selected successfully
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.dropTitle}>Select a document</Text>

              <Text style={styles.dropSubtitle}>
                Tap here to choose a file from your device
              </Text>

              <Text style={styles.supported}>
                PDF, JPG, PNG • Maximum 10 MB
              </Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Document information</Text>

        <Text style={styles.label}>Document name</Text>

        <TextInput
          value={documentName}
          onChangeText={setDocumentName}
          placeholder="e.g. Blood Test Report"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />

        <Text style={styles.label}>Category</Text>

        <View style={styles.categories}>
          {(
            [
              "Laboratory",
              "Referral",
              "Prescription",
              "Clinical",
              "Other",
            ] as DocumentCategory[]
          ).map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.categoryButton,
                category === item && styles.selectedCategory,
              ]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Description</Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Add optional information about this document..."
          placeholderTextColor="#94A3B8"
          multiline
          textAlignVertical="top"
          style={[styles.input, styles.descriptionInput]}
        />

        <View style={styles.privacyCard}>
          <Text style={styles.privacyTitle}>🔒 Secure upload</Text>

          <Text style={styles.privacyText}>
            Uploaded documents become part of your healthcare record and should
            only be accessible to authorized users.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleUpload}
          activeOpacity={0.85}
        >
          <Text style={styles.uploadButtonText}>Upload Securely</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 45,
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  uploadCircle: {
    width: 68,
    height: 68,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  uploadIcon: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2563EB",
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 7,
    color: "#64748B",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
  },

  dropZone: {
    minHeight: 190,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 27,
  },

  selectedDropZone: {
    borderColor: "#2563EB",
    backgroundColor: "#F8FBFF",
  },

  fileCircle: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  fileIcon: {
    color: "#2563EB",
    fontSize: 25,
    fontWeight: "700",
  },

  dropTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
  },

  dropSubtitle: {
    marginTop: 5,
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },

  supported: {
    marginTop: 10,
    fontSize: 10,
    color: "#94A3B8",
  },

  fileSelectedTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2563EB",
  },

  fileSelectedText: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    height: 52,
    paddingHorizontal: 15,
    fontSize: 14,
    color: "#111827",
    marginBottom: 17,
  },

  descriptionInput: {
    height: 110,
    paddingTop: 15,
    paddingBottom: 15,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  categoryButton: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  selectedCategory: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  categoryText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },

  selectedCategoryText: {
    color: "#FFFFFF",
  },

  privacyCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 22,
  },

  privacyTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 6,
  },

  privacyText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#475569",
  },

  uploadButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
