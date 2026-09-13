import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Tasks from "./components/Tasks";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigate = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
            <Text style={styles.profileText}>M</Text>
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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.taskWrapper}>
            {loading ? <SkeletonLoader /> : <Tasks />}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function SkeletonLoader() {
  return (
    <View style={styles.skeletonContainer}>
      {Array.from({ length: 6 }).map((_, index) => (
        <View key={index} style={styles.skeletonTask}>
          {/* Left */}
          <View style={styles.skeletonLeft}>
            <View style={styles.skeletonLabel} />

            <View style={styles.skeletonNumber} />

            <View style={styles.skeletonPriority} />
          </View>

          {/* Content */}
          <View style={styles.skeletonRight}>
            <View style={styles.skeletonTopRow}>
              <View style={styles.skeletonTitleContainer}>
                <View style={styles.skeletonTitle} />

                <View style={styles.skeletonTaskId} />
              </View>

              <View style={styles.skeletonStatusIcon} />
            </View>

            <View style={styles.skeletonDescription} />

            <View style={styles.skeletonBottomRow}>
              <View style={styles.skeletonStatus} />

              <View style={styles.skeletonDate} />
            </View>
          </View>

          {/* Options */}
          <View style={styles.skeletonOptions}>
            <View style={styles.skeletonIcon} />
            <View style={styles.skeletonIcon} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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

    backgroundColor: "#18181B",
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

  /* SCROLL */

  scrollContent: {
    paddingBottom: 30,
  },

  taskWrapper: {
    gap: 10,
  },

  /* SKELETON */

  skeletonContainer: {
    gap: 12,
  },

  skeletonTask: {
    minHeight: 132,

    borderRadius: 18,

    flexDirection: "row",

    overflow: "hidden",

    backgroundColor: "#FFFFFF",

    elevation: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 7,
  },

  skeletonLeft: {
    width: 82,

    paddingVertical: 16,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F0F0ED",

    gap: 6,
  },

  skeletonLabel: {
    width: 25,
    height: 7,

    borderRadius: 3,

    backgroundColor: "#DCDCD8",
  },

  skeletonNumber: {
    width: 35,
    height: 28,

    borderRadius: 6,

    backgroundColor: "#DCDCD8",
  },

  skeletonPriority: {
    width: 42,
    height: 13,

    borderRadius: 8,

    backgroundColor: "#DCDCD8",
  },

  skeletonRight: {
    flex: 1,

    paddingLeft: 15,
    paddingRight: 55,
    paddingVertical: 15,

    justifyContent: "space-between",
  },

  skeletonTopRow: {
    flexDirection: "row",

    alignItems: "flex-start",
  },

  skeletonTitleContainer: {
    flex: 1,

    marginRight: 8,
  },

  skeletonTitle: {
    width: "72%",
    height: 16,

    borderRadius: 5,

    backgroundColor: "#E2E2DF",
  },

  skeletonTaskId: {
    width: 38,
    height: 7,

    borderRadius: 3,

    backgroundColor: "#E8E8E5",

    marginTop: 5,
  },

  skeletonStatusIcon: {
    width: 31,
    height: 31,

    borderRadius: 10,

    backgroundColor: "#E8E8E5",
  },

  skeletonDescription: {
    width: "88%",
    height: 12,

    borderRadius: 5,

    backgroundColor: "#E8E8E5",

    marginTop: 8,
  },

  skeletonBottomRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 8,
  },

  skeletonStatus: {
    width: 50,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#E8E8E5",
  },

  skeletonDate: {
    width: 42,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#E8E8E5",
  },

  skeletonOptions: {
    position: "absolute",

    right: 10,
    top: 15,

    width: 31,

    alignItems: "center",

    gap: 7,
  },

  skeletonIcon: {
    width: 31,
    height: 31,

    borderRadius: 9,

    backgroundColor: "#E8E8E5",
  },
});
