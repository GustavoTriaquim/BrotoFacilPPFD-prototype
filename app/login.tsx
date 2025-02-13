import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import { Colors } from "@/constants/Colors";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function LoginRegisterPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  const validateInputs = () => {
    if (!email || !password || (isRegistering && !username) || (!isRegistering && !confirmPassword)) {
      alert("Todos os campos são obrigatórios!");
      return false;
    }

    if (!isRegistering && password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return false;
    }

    return true;
  };
  
  const handleSubmit = () => {
    if (validateInputs()) {
      router.push("/main");
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>LOGIN</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.inputsContainer}>
            {isRegistering && (
              <TextInput
                style={styles.input}
                placeholder="Nome de Usuário"
                placeholderTextColor="#6a8a25"
                value={username}
                onChangeText={setUsername}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#6a8a25"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#6a8a25"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {!isRegistering && (
              <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                placeholderTextColor="#6a8a25"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            )}
          </View>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText} onPress={handleSubmit}>
            {isRegistering ? "Cadastrar-se" : "Fazer Login"}
          </Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textAlt}>
            {isRegistering ? "Já possui um login?" : "Não possui um login?"}  
          </Text>
          <TouchableOpacity style={styles.anchorAlt}>
            <Text style={styles.anchorAltText} onPress={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "LOGIN" : "CADASTRO"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.light.primary,
    flex: 1,
  },
  loginContainer: {
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    color: Colors.light.background,
    fontSize: width * 0.07,
    fontWeight: "bold",
  },
  main: {
    backgroundColor: Colors.light.background,
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: width * 0.2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  input: {
    textAlign: "center",
    backgroundColor: "#e4e4e4",
    width: width * 0.7,
    paddingVertical: height * 0.02,
    borderRadius: 15,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    fontSize: width * 0.04,
  },
  loginButton: {
    width: width * 0.7,
    backgroundColor: Colors.light.primary,
    paddingVertical: height * 0.025,
    borderRadius: 20,
  },
  loginButtonText: {
    textAlign: "center",
    color: Colors.light.background,
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  textAlt: {
    fontSize: width * 0.04,
    color: "#6a8a25",
    textAlign: "center",
    marginBottom: 15,
  },
  anchorAlt: {
    padding: 0,
    margin: 0,
  },
  anchorAltText: {
    color: "#6a8a25",
    fontSize: width * 0.05,
    textAlign: "center",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});