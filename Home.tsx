import React from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Tasks from "./components/Tasks";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {
  const navigate = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.myapp}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>WELCOME BACK</Text>

            <Text
              style={styles.title}
              onPress={() => navigate.navigate("Auth")}
            >
              My Tasks
            </Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() => navigate.navigate("Auth")}
          >
            <MaterialCommunityIcons
              name="login-variant"
              size={24}
              color="black"
            />
            {/* <Text style={styles.profileText}>M</Text> */}
          </Pressable>
        </View>

        {/* Add Task */}
        <Pressable
          style={styles.addTaskButton}
          onPress={() => navigate.navigate("Add")}
        >
          <View style={styles.addIcon}>
            <Text style={styles.plus}>+</Text>
          </View>

          <View style={styles.addTaskContent}>
            <Text style={styles.addTaskTitle}>Create a new task</Text>

            <Text style={styles.addTaskSubtitle}>
              Add something to your list
            </Text>
          </View>

          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* Task Header */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Your tasks</Text>

            <Text style={styles.sectionSubtitle}>
              Stay organized and productive
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>TASKS</Text>
          </View>
        </View>

        {/* Tasks */}
        <View style={styles.taskWrapper}>
          <Tasks />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F4",
    paddingHorizontal: 20,
  },

  myapp: {
    flex: 1,
  },

  /* HEADER */

  header: {
    height: 72,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 12,
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.6,
    color: "#A1A1AA",

    marginBottom: 2,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -1,

    color: "#18181B",
  },

  profileButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#18181b43",
    opacity: 0.4,
  },

  profileText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  /* ADD TASK */

  addTaskButton: {
    height: 72,

    borderRadius: 18,

    paddingHorizontal: 14,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#18181B",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    marginBottom: 24,
  },

  addIcon: {
    width: 43,
    height: 43,

    borderRadius: 13,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",
  },

  plus: {
    fontSize: 27,
    fontWeight: "300",

    color: "#18181B",

    marginTop: -2,
  },

  addTaskContent: {
    flex: 1,

    marginLeft: 12,
  },

  addTaskTitle: {
    fontSize: 14,
    fontWeight: "700",

    color: "#FFFFFF",
  },

  addTaskSubtitle: {
    fontSize: 11,

    color: "#A1A1AA",

    marginTop: 3,
  },

  arrow: {
    fontSize: 27,
    fontWeight: "300",

    color: "#A1A1AA",

    marginRight: 3,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,

    color: "#18181B",
  },

  sectionSubtitle: {
    fontSize: 11,

    color: "#A1A1AA",

    marginTop: 2,
  },

  countBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,

    borderRadius: 8,

    backgroundColor: "#E9E9E6",
  },

  countText: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,

    color: "#71717A",
  },

  /* TASK */

  taskWrapper: {
    flex: 1,
  },
});
