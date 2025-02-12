import { View, Text, StyleSheet, Image, Dimensions, StatusBar } from "react-native";
import { Slot } from "expo-router";
import { usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/FontAwesome";

const {width, height} = Dimensions.get("window");
const statusBarHeight = getStatusBarHeight();

export default function Layout() {
  const pathname = usePathname(); 
  const showHeader = pathname !== '/'; 

  return (
    <>
    <StatusBar backgroundColor={Colors.light.primary} />
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.interface}>
            <Image source={require("../assets/images/BrotoFacilFavicon.png")} style={styles.headerImage}/>
          </View>
          <Icon name="bars" size={34} color={Colors.light.background}/>
        </View>
      )}
      <View style={styles.content}>
        <Slot />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    maxHeight: height * 0.2,
    backgroundColor: Colors.light.primary,
    paddingTop: statusBarHeight + 5,
    paddingBottom: 20,
    paddingHorizontal: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  interface: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 100,
  },
  headerImage: {
    width: width * 0.08,
    height: height * 0.04,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
});
