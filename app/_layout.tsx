import { View, Text, StyleSheet, Image, Dimensions, StatusBar, Animated, Modal, TouchableOpacity } from "react-native";
import { Slot, useRouter } from "expo-router";
import { usePathname } from "expo-router";
import { Colors } from "@/constants/Colors";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";

const {width, height} = Dimensions.get("window");
const statusBarHeight = getStatusBarHeight();

export default function Layout() {
  const pathname = usePathname(); 
  const showHeader = pathname !== '/' && pathname !== '/login'; 
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const [slideAnim] = useState(new Animated.Value(300));

  useEffect(() => {
    if (menuVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible]);

  return (
    <>
    <StatusBar backgroundColor={Colors.light.primary} />
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.interface}>
            <Image source={require("../assets/images/BrotoFacilFavicon.png")} style={styles.headerImage}/>
          </View>
          <Icon 
            name="bars" 
            size={34} 
            color={Colors.light.background}
            onPress={toggleMenu}
          />
        </View>
      )}
      <View style={styles.content}>
        <Slot />
      </View>

      <Modal animationType="none" transparent visible={menuVisible} onRequestClose={toggleMenu}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleMenu}>
          <Animated.View style={[styles.menu, { transform: [{translateX: slideAnim}] }]}>
            <Text style={styles.menuTitle}>MENU</Text>
            <TouchableOpacity style={styles.menuItem} onPress={() => {
              toggleMenu();
              router.push("/login");
            }}>
              <Icon name="sign-in" size={30} color={Colors.light.primary} />
              <Text style={styles.menuText}>Login</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menu: {
    width: width * 0.6,
    height: "100%",
    backgroundColor: Colors.light.background,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontSize: width * 0.1,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  menuText: {
    fontSize: width * 0.05,
    marginLeft: 10,
  },
});
