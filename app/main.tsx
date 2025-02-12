import { Colors } from "@/constants/Colors";
import { View, Text, TouchableOpacity, Dimensions, Modal, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const {width, height} = Dimensions.get("window");

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUAS MEDIÇÕES</Text>
      <TouchableOpacity style={styles.meditionButton}>
        <Icon name="plus-circle" size={40} color="#6a8a25" />
        <Text style={styles.meditionText}>CRIE UMA NOVA MEDIÇÃO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>NOVA MEDIÇÃO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height * 0.8,
    paddingHorizontal: width * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: "absolute",
    top: height * 0.05,
    width: width,
    textAlign: "center",
    fontSize: width * 0.07,
    color: Colors.light.secundary,
    fontWeight: "bold",
  },
  meditionButton: {
    width: width * 0.8,
    backgroundColor: "#f4f4f4",
    paddingVertical: height * 0.08,
    borderRadius: 20,
    borderColor: Colors.light.primary,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  meditionText: {
    fontSize: width * 0.04,
    color: "#6a8a25",
  },
  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    height: height * 0.1,
  },
  buttonText: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: Colors.light.background,
  },
});