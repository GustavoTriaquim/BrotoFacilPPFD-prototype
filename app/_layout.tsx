import { Stack } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

export default function Layout() {
  return(
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});