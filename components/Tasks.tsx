import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Tasks = () => {
  const navigation = useNavigation();

  type Task = {
    _id: string;
    userId: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    createdAt: string;
    updatedAt: string;
  };

  const statusIcons = {
    pending: "schedule",
    "in-progress": "autorenew",
    completed: "check-circle",
  } as const;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const API_URL = "https://task-management-s7bu.onrender.com/api";

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const res = await fetch(`${API_URL}/tasks`, {
        method: "GET",
        headers: {
          Cookie: `token=${token}`,
        },
      });

      const result = await res.json();

      if (result.success) {
        setTasks(result.data);
      } else {
        console.log("Failed to fetch tasks:", result.message);
      }
    } catch (error) {
      console.error("Fetch tasks error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchTasks();

    setRefreshing(false);
  };

  async function deleteTask({ task_id }: { task_id: string }) {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found");
        return;
      }

      const result = await fetch(`${API_URL}/tasks/${task_id}`, {
        method: "DELETE",
        headers: {
          Cookie: `token=${token}`,
        },
      });

      if (result.status === 200) {
        await fetchTasks();
      }
    } catch (error) {
      console.error("Delete task error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#18181B"
          />
        }
      >
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <MaterialIcons name="task-alt" size={30} color="#18181B" />
            </View>

            <Text style={styles.emptyTitle}>No tasks yet</Text>

            <Text style={styles.emptyText}>
              Create your first task and start getting things done.
            </Text>

            <Pressable
              style={styles.addButton}
              onPress={() => navigation.navigate("Add")}
            >
              <MaterialIcons name="add" size={19} color="#FFFFFF" />

              <Text style={styles.addButtonText}>Add Task</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.taskList}>
            {tasks.map((task, index) => (
              <View key={task._id} style={styles.task}>
                
                {/* Left Section */}
                <View style={styles.left}>
                  <Text style={styles.taskLabel}>TASK</Text>

                  <Text style={styles.taskNo}>
                    {String(index + 1).padStart(2, "0")}
                  </Text>

                  <View
                    style={[
                      styles.priorityBadge,
                      task.priority === "high" && styles.highPriority,
                      task.priority === "medium" && styles.mediumPriority,
                      task.priority === "low" && styles.lowPriority,
                    ]}
                  >
                    <Text style={styles.priority}>{task.priority}</Text>
                  </View>
                </View>

                {/* Main Section */}
                <View style={styles.right}>
                  <View style={styles.topRow}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.title} numberOfLines={1}>
                        {task.title}
                      </Text>

                      <Text style={styles.taskId}>
                        #{task._id.slice(-6).toUpperCase()}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusIcon,
                        task.status === "completed" && styles.completedIcon,
                        task.status === "in-progress" && styles.progressIcon,
                        task.status === "pending" && styles.pendingIcon,
                      ]}
                    >
                      <MaterialIcons
                        name={
                          statusIcons[task.status as keyof typeof statusIcons]
                        }
                        size={17}
                        color="#18181B"
                      />
                    </View>
                  </View>

                  <Text style={styles.description} numberOfLines={2}>
                    {task.description || "No description provided."}
                  </Text>

                  <View style={styles.bottomRow}>
                    <View style={styles.statusContainer}>
                      <View
                        style={[
                          styles.statusDot,
                          task.status === "completed" && styles.completedDot,
                          task.status === "in-progress" && styles.progressDot,
                          task.status === "pending" && styles.pendingDot,
                        ]}
                      />

                      <Text style={styles.statusText}>
                        {task.status.replace("-", " ")}
                      </Text>
                    </View>

                    <Text style={styles.dateText}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                {/* Options */}
                <View style={styles.options}>
                  <Pressable
                    style={styles.optionButton}
                    onPress={() => console.log("Edit", task._id)}
                  >
                    <MaterialIcons name="edit" size={18} color="#52525B" />
                  </Pressable>

                  <Pressable
                    style={[styles.optionButton, styles.deleteButton]}
                    onPress={() => deleteTask({ task_id: task._id })}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={19}
                      color="#DC2626"
                    />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  taskList: {
    gap: 12,
  },

  task: {
    minHeight: 132,
    borderRadius: 18,
    flexDirection: "row",
    overflow: "hidden",

    backgroundColor: "#FFFFFF",

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },

  /* LEFT */

  left: {
    width: 82,
    paddingVertical: 16,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#c5c5c3e3",

    borderRightWidth: 1,
    borderRightColor: "#E8E8E5",
  },

  taskLabel: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: "#A1A1AA",
    marginBottom: 2,
  },

  taskNo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#18181B",
    letterSpacing: -1.2,
  },

  priorityBadge: {
    marginTop: 6,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: "#E4E4E2",
  },

  highPriority: {
    backgroundColor: "#FEE2E2",
  },

  mediumPriority: {
    backgroundColor: "#FEF3C7",
  },

  lowPriority: {
    backgroundColor: "#DCFCE7",
  },

  priority: {
    fontSize: 8,
    fontWeight: "800",
    color: "#52525B",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  /* RIGHT */

  right: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 55,
    paddingVertical: 15,

    justifyContent: "space-between",

    backgroundColor: "#e1e1e1ba",
  },

  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  titleContainer: {
    flex: 1,
    marginRight: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#18181B",
    letterSpacing: -0.3,
  },

  taskId: {
    marginTop: 3,
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 0.8,
    color: "#A1A1AA",
  },

  statusIcon: {
    width: 31,
    height: 31,

    borderRadius: 10,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F4F4F5",
  },

  completedIcon: {
    backgroundColor: "#DCFCE7",
  },

  progressIcon: {
    backgroundColor: "#E0E7FF",
  },

  pendingIcon: {
    backgroundColor: "#FEF3C7",
  },

  description: {
    marginTop: 8,

    fontSize: 12.5,
    lineHeight: 18,

    color: "#71717A",

    letterSpacing: -0.05,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 9,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#A1A1AA",
  },

  completedDot: {
    backgroundColor: "#16A34A",
  },

  progressDot: {
    backgroundColor: "#4F46E5",
  },

  pendingDot: {
    backgroundColor: "#D97706",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#71717A",
    textTransform: "capitalize",
  },

  dateText: {
    fontSize: 9,
    fontWeight: "600",
    color: "#A1A1AA",
  },

  /* OPTIONS */

  options: {
    position: "absolute",
    right: 10,
    top: 15,

    width: 31,

    alignItems: "center",
    gap: 7,
  },

  optionButton: {
    width: 31,
    height: 31,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 9,

    backgroundColor: "#F4F4F5",
  },

  deleteButton: {
    backgroundColor: "#FEF2F2",
  },

  /* EMPTY STATE */

  emptyState: {
    minHeight: 300,

    marginTop: 20,

    paddingHorizontal: 30,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    elevation: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },

  emptyIcon: {
    width: 64,
    height: 64,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#F4F4F5",

    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    // fontWeight: "750",
    color: "#18181B",
    letterSpacing: -0.4,
  },

  emptyText: {
    marginTop: 5,

    fontSize: 13,
    lineHeight: 19,

    color: "#A1A1AA",

    textAlign: "center",
    maxWidth: 260,
  },

  addButton: {
    marginTop: 20,

    height: 44,

    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 7,

    borderRadius: 12,

    backgroundColor: "#18181B",
  },

  addButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
