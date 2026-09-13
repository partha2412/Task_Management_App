import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const Auth = () => {
  const navigation = useNavigation();

  type Data = {
    email: string;
    password: string;
  };

  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = "https://task-management-s7bu.onrender.com/api";

  const login = async ({ data }: { data: Data }) => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        const rawCookie = response.headers.get("set-cookie");

        if (!rawCookie) {
          setError("Authentication failed. No token received.");
          return;
        }

        const token = rawCookie.split(";")[0].replace("token=", "");

        await AsyncStorage.setItem("token", token);

        console.log("Logged in successfully");

        navigation.replace("Home");
      } else {
        setError(result.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);

      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>M</Text>
            </View>

            <Text style={styles.title}>Welcome back</Text>

            <Text style={styles.subtitle}>
              Log in to continue managing your tasks.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.label}>EMAIL</Text>

              <TextInput
                placeholder="you@example.com"
                placeholderTextColor="#A1A1AA"
                style={styles.input}
                value={data.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                onChangeText={(value) =>
                  setData({
                    ...data,
                    email: value,
                  })
                }
              />
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.label}>PASSWORD</Text>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#A1A1AA"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  value={data.password}
                  onChangeText={(value) =>
                    setData({
                      ...data,
                      password: value,
                    })
                  }
                />

                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setShowPassword((current) => !current)}
                >
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                    size={21}
                    color="#71717A"
                  />
                </Pressable>
              </View>
            </View>

            {/* Error */}
            {error !== "" && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Login */}
            <Pressable
              style={[styles.button, loading && styles.buttonDisabled]}
              disabled={loading}
              onPress={() => login({ data })}
            >
              {loading ? (
                <>
                  <ActivityIndicator size="small" color="#FFFFFF" />

                  <Text style={styles.buttonText}>Logging in...</Text>
                </>
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </Pressable>
          </View>

          {/* Footer */}
          <Text style={styles.footer}>Manage your work. Stay organized.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F4",
  },

  keyboardView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  card: {
    width: "100%",
    maxWidth: 420,

    alignSelf: "center",

    padding: 24,

    borderRadius: 24,

    backgroundColor: "#FFFFFF",

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 14,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 52,
    height: 52,

    borderRadius: 17,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#18181B",

    marginBottom: 18,
  },

  logoText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",

    letterSpacing: -0.8,

    color: "#18181B",
  },

  subtitle: {
    marginTop: 7,

    fontSize: 13,
    lineHeight: 19,

    color: "#A1A1AA",

    textAlign: "center",

    maxWidth: 260,
  },

  form: {
    gap: 17,
  },

  field: {
    gap: 7,
  },

  label: {
    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 1.2,

    color: "#71717A",
  },

  input: {
    width: "100%",
    height: 52,

    paddingHorizontal: 14,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: "#E4E4E7",

    backgroundColor: "#FAFAF9",

    fontSize: 14,

    color: "#18181B",
  },

  /* PASSWORD */

  passwordContainer: {
    width: "100%",
    height: 52,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 12,

    borderWidth: 1,
    borderColor: "#E4E4E7",

    backgroundColor: "#FAFAF9",
  },

  passwordInput: {
    flex: 1,
    height: "100%",

    paddingHorizontal: 14,

    fontSize: 14,

    color: "#18181B",
  },

  eyeButton: {
    width: 48,
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },

  /* ERROR */

  errorBox: {
    paddingHorizontal: 12,
    paddingVertical: 10,

    borderRadius: 10,

    backgroundColor: "#FEF2F2",

    borderWidth: 1,
    borderColor: "#FECACA",
  },

  errorText: {
    fontSize: 12,

    color: "#DC2626",

    lineHeight: 17,
  },

  /* BUTTON */

  button: {
    height: 52,

    marginTop: 4,

    borderRadius: 12,

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 9,

    backgroundColor: "#18181B",
  },

  buttonDisabled: {
    opacity: 0.55,
  },

  buttonText: {
    fontSize: 14,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  /* FOOTER */

  footer: {
    marginTop: 24,

    textAlign: "center",

    fontSize: 10,

    color: "#A1A1AA",

    letterSpacing: 0.2,
  },
});
