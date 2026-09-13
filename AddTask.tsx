import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
const API_URL = "https://task-management-s7bu.onrender.com/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AddTask = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending",
  );

  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      console.log("Title is required");
      return;
    }

    const task = {
      title: title.trim(),
      description,
      status,
      priority,
      dueDate: dueDate.toISOString(),
    };

    console.log("TASK:", task);

    const token = await AsyncStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(task),
    });

    const result = await res.json();

    console.log("RESULT:", result);
    if(result.success){
      navigation.replace("Home");
    }
    else
      console.error(result.message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.heading}>Create Task</Text>

            <Text style={styles.subHeading}>
              Add a new task and keep your work organized.
            </Text>
          </View>

          {/* Title */}
          <View style={styles.field}>
            <Text style={styles.label}>Title</Text>

            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              placeholderTextColor="#A1A1AA"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Description */}
          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>

            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Add some details..."
              placeholderTextColor="#A1A1AA"
              value={description}
              onChangeText={setDescription}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Status */}
          <View style={styles.field}>
            <Text style={styles.label}>Status</Text>

            <View style={styles.optionsRow}>
              {[
                { value: "pending", label: "Pending", icon: "schedule" },
                {
                  value: "in-progress",
                  label: "In Progress",
                  icon: "autorenew",
                },
                {
                  value: "completed",
                  label: "Completed",
                  icon: "check-circle",
                },
              ].map((item) => {
                const selected = status === item.value;

                return (
                  <Pressable
                    key={item.value}
                    style={[styles.option, selected && styles.selectedOption]}
                    onPress={() => setStatus(item.value as typeof status)}
                  >
                    <MaterialIcons
                      name={item.icon as any}
                      size={18}
                      color={selected ? "#18181B" : "#71717A"}
                    />

                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.selectedOptionText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Priority */}
          <View style={styles.field}>
            <Text style={styles.label}>Priority</Text>

            <View style={styles.optionsRow}>
              {["low", "medium", "high"].map((item) => {
                const selected = priority === item;

                return (
                  <Pressable
                    key={item}
                    style={[styles.option, selected && styles.selectedOption]}
                    onPress={() => setPriority(item as typeof priority)}
                  >
                    <View
                      style={[styles.radio, selected && styles.radioSelected]}
                    />

                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.selectedOptionText,
                      ]}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Due Date */}
          <View style={styles.field}>
            <Text style={styles.label}>Due Date</Text>

            <Pressable
              style={styles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {dueDate.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </Text>

              <MaterialIcons name="calendar-today" size={20} color="#71717A" />
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);

                  if (selectedDate) {
                    setDueDate(selectedDate);
                  }
                }}
              />
            )}
          </View>

          {/* Create Button */}
          <Pressable style={styles.createButton} onPress={handleCreateTask}>
            <Text style={styles.createButtonText}>Create Task</Text>

            <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F8",
  },

  content: {
    padding: 22,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 30,
  },

  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#18181B",
    letterSpacing: -0.8,
  },

  subHeading: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#71717A",
  },

  field: {
    marginBottom: 22,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#3F3F46",
    marginBottom: 9,
  },

  input: {
    height: 52,
    paddingHorizontal: 15,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    fontSize: 15,
    color: "#18181B",
  },

  descriptionInput: {
    height: 110,
    paddingTop: 14,
  },

  optionsRow: {
    flexDirection: "row",
    gap: 8,
  },

  option: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  selectedOption: {
    backgroundColor: "#EDEDED",
    borderColor: "#18181B",
  },

  optionText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#71717A",
  },

  selectedOptionText: {
    color: "#18181B",
  },

  radio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#A1A1AA",
  },

  radioSelected: {
    borderWidth: 4,
    borderColor: "#18181B",
  },

  dateInput: {
    height: 52,
    paddingHorizontal: 15,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4E4E7",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateText: {
    fontSize: 15,
    color: "#18181B",
  },

  createButton: {
    height: 54,
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: "#18181B",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
