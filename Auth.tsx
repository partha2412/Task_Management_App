import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

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
  const API_URL = "https://task-management-s7bu.onrender.com/api";
  const login = async ({ data }: { data: Data }) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (result.success) {
      // If your backend gives you the raw cookie
      const rawCookie = response.headers.get("set-cookie");

      if (!rawCookie) {
        console.log("No cookie found");
        return;
      }
      // Extract token
      const token = rawCookie.split(";")[0].replace("token=", "");
      console.log("logged in sucessfully");
      await AsyncStorage.setItem("token", token);
      navigation.replace("Home");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          placeholder="Enter Email"
          style={styles.input}
          value={data.email}
          textContentType="emailAddress"
          onChangeText={(value) => setData({ ...data, email: value })}
        />
        <TextInput
          style={styles.input}
          textContentType="password"
          placeholder="Enter Password"
          value={data.password}
          onChangeText={(value) => setData({ ...data, password: value })}
        />
        <Pressable style={styles.button} onPress={() => login({ data })}>
          <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputWrapper: {
    gap: 36,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(49, 150, 54, 0.72)",
  },

  input: {
    backgroundColor: "rgba(38, 32, 35, 0.2)",
    width: 280,
    height: 50,
    borderRadius: 6,
    padding: 10,
  },

  button: {
    width: 280,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(57, 176, 63, 0.86)",
    borderRadius: 6,
  },
});
