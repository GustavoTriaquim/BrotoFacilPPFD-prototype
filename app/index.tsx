import { Colors } from "@/constants/Colors";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default function StartPage() {
  return(
    <View style={styles.container}>
      <Image source={require("../assets/images/BrotoFacilFavicon.png")} style={styles.logo} />
      <Text style={styles.title}>BEM VINDO AO</Text>
      <Text style={styles.title2}>
        <Text style={styles.highlight}>MEDIDOR PPFD </Text>
        - BROTO FÁCIL
      </Text>
      <Text style={styles.subtitle}>A luz está pronta, só falta você plantar o primeiro passo!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.33,
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: Colors.light.secundary,
    textAlign: "center",
  },
  title2: {
    fontSize: width * 0.059,
    fontWeight: "bold",
    color: Colors.light.secundary,
    textAlign: "center",
  },
  highlight: {
    color: Colors.light.primary,
  },
  subtitle: {
    fontSize: width * 0.035,
    color: Colors.light.secundary,
    textAlign: "center",
    marginBottom: height * 0.15,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: Colors.light.primary,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: width * 0.06,
    color: Colors.light.background,
  },
});