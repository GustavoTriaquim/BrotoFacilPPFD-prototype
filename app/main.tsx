import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { View, Text, TouchableOpacity, Dimensions, Modal, TextInput, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const {width, height} = Dimensions.get("window");

const lampTypes = [
  { label: "LED Grow (3000K)", value: 3000 },
  { label: "LED Grow (5000K)", value: 5000 },
  { label: "HPS (Sódio) (2100K)", value: 2100 },
  { label: "Fluorescente (6500K)", value: 6500 },
  { label: "Metal Halide (4000K)", value: 4000 },
];

const plantTypes = [
  { label: "Alface", value: "alface" },
  { label: "Tomate", value: "tomate" },
  { label: "Manjericão", value: "manjericao" },
  { label: "Morango", value: "morango" },
  { label: "Pimentão", value: "pimentao" },
]

export default function HomePage() {
  const [isModalDataOpen, setIsModalDataOpen] = useState(false);
  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState(false);
  const [isModalCalculatingOpen, setIsModalCalculatingOpen] = useState(false);
  const [isModalResultOpen, setIsModalResultOpen] = useState(false);

  const [name, setName] = useState("");
  const [selectedLamp, setSelectedLamp] = useState<number | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  const router = useRouter();

  const openCalculateModal = () => {
    setIsModalPreviewOpen(false);
    setIsModalCalculatingOpen(true);

    setTimeout(() => {
      setIsModalCalculatingOpen(false);
      setIsModalResultOpen(true);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUAS MEDIÇÕES</Text>
      <TouchableOpacity style={styles.meditionButton} onPress={() => setIsModalDataOpen(true)}>
        <Icon name="plus-circle" size={40} color="#6a8a25" />
        <Text style={styles.meditionText}>CRIE UMA NOVA MEDIÇÃO</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setIsModalDataOpen(true)}>
        <Text style={styles.buttonText}>NOVA MEDIÇÃO</Text>
      </TouchableOpacity>

      <Modal visible={isModalDataOpen} transparent animationType="fade" onRequestClose={() => setIsModalDataOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalDataOpen(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
                <View style={styles.modalInputs}>
                  <TextInput 
                    style={styles.modalInput} 
                    placeholder="NOME" 
                    placeholderTextColor="#6a8a25"
                    value={name}
                    onChangeText={setName}  
                  />
                  <View style={styles.pickerContainer}>
                    <Picker style={styles.picker} selectedValue={selectedLamp} onValueChange={(value) => setSelectedLamp(value)}>
                      <Picker.Item label="LÂMPADA" value={null} />
                      {lampTypes.map((lamp) => (
                        <Picker.Item key={lamp.value} label={lamp.label} value={lamp.value} />
                      ))}
                    </Picker>
                  </View>
                  <View style={styles.pickerContainer}>
                    <Picker style={styles.picker} selectedValue={selectedPlant} onValueChange={(value) => setSelectedPlant(value)}>
                      <Picker.Item label="PLANTA" value={null} />
                      {plantTypes.map((plant) => (
                        <Picker.Item key={plant.value} label={plant.label} value={plant.value} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.hr} />
                <View style={styles.modalOptions}>
                  <View style={styles.option}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => {setIsModalPreviewOpen(true); setIsModalDataOpen(false);} }>
                      <Icon name="camera" size={50} color="#6a8a25"/>
                    </TouchableOpacity>
                    <Text style={styles.modalOptionText}>TIRAR FOTO</Text>
                  </View>
                  <View style={styles.option}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => {setIsModalPreviewOpen(true); setIsModalDataOpen(false);} }>
                      <Icon name="upload" size={50} color="#6a8a25"/>
                    </TouchableOpacity>
                    <Text style={styles.modalOptionText}>CARREGAR</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      
      <Modal visible={isModalPreviewOpen} transparent animationType="fade" onRequestClose={() => setIsModalPreviewOpen(false)}>
        <TouchableWithoutFeedback onPress={() => setIsModalPreviewOpen(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
              <View style={styles.modalContent}>
                <Image style={styles.modalImage} source={require("../assets/images/Plantas.jpeg")}/>
                <View style={styles.buttonOptions}>
                  <TouchableOpacity style={styles.denyButton} onPress={() => setIsModalPreviewOpen(false)}>
                    <Text style={styles.buttonOptionText}>Recusar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.agreeButton} onPress={openCalculateModal}>
                    <Text style={styles.buttonOptionText}>Aceitar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={isModalCalculatingOpen}>
        <TouchableWithoutFeedback onPress={() => setIsModalCalculatingOpen(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
              <View style={styles.modalContent}>
                <Text style={styles.textCalculate}>Processando Imagem...</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal visible={isModalResultOpen}>
        <TouchableWithoutFeedback onPress={() => setIsModalCalculatingOpen(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
              <View style={styles.modalContent}>
                <View style={styles.resultTexts}>
                  <Text style={styles.resultTitle}>VALOR PPFD CALCULADO:</Text>
                  <Text style={styles.resultValue}>VALOR</Text>
                  <Text style={styles.resultTitle}>SEU VALOR ESTÁ IDEAL!!</Text>
                </View>
                <Icon name="smile-o" size={50} color="#6a8a25" />
                <View style={styles.resultButtons}>
                  <TouchableOpacity style={styles.buttonSave} onPress={() => router.push("/login")}>
                    <Text style={styles.resultButtonText}>SALVAR</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonClose} onPress={() => setIsModalResultOpen(false)}>
                    <Text style={styles.resultButtonText}>FECHAR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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

  modalContainer: {
    width: width,
    height: height,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.92)",
  },
  modalContent: {
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 30,
    borderColor: Colors.light.primary,
    borderWidth: 2,
  },
  modalInputs: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  modalInput: {
    width: width * 0.6,
    textAlign: "center",
    backgroundColor: "#e4e4e4",
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: width * 0.045,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    color: "#78561",
  },
  hr: {
    width: width * 0.6,
    backgroundColor: "#798561",
    height: 1,
    marginVertical: 35,
  },
  pickerContainer: {
    width: width * 0.6,
    backgroundColor: "#e4e4e4",
    borderRadius: 10,
    justifyContent: "center",
    borderColor: Colors.light.primary,
    borderWidth: 1,
  },
  picker: {
    color: "#6a8a25",
  },
  modalOptions: {
    flexDirection: "row",
    gap: width * 0.1,
  },
  option: {
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  modalButton: {
    backgroundColor: "#e4e4e4",
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.light.primary,
    borderWidth: 1,
  },
  modalOptionText: {
    color: "#6a8a25",
    fontSize: width * 0.05,
  },

  modalImage: {
    width: width * 0.5,
    height: height * 0.35,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonOptions: {
    flexDirection: "row",
    gap: width * 0.05,
  },
  denyButton: {
    width: width * 0.25,
    paddingVertical: 7,
    backgroundColor: "#ff2d3b",
    borderRadius: 10,
  },
  buttonOptionText: {
    textAlign: "center",
    fontSize: width * 0.05,
    color: "#fff",
    fontWeight: "bold",
  },
  agreeButton: {
    width: width * 0.25,
    paddingVertical: 7,
    backgroundColor: "#6a8a25",
    borderRadius: 10,
  },

  textCalculate: {
    marginVertical: height * 0.2,
    fontSize: width * 0.05,
    color: "#6a8a25",
    fontWeight: "bold",
  },

  resultTexts: {
    justifyContent: "center",
    alignItems: "center",
    gap: height * 0.04,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: width * 0.05,
    color: Colors.light.secundary,
    fontWeight: "bold",
  },
  resultValue: {
    fontSize: width * 0.08,
    color: "#888",
    fontWeight: "bold",
  },
  resultButtons: {
    flexDirection: "row",
    gap: width * 0.05,
    marginTop: 15,
  },
  buttonSave: {
    backgroundColor: "#ffb932",
    paddingVertical: 7,
    width: width * 0.2,
    borderRadius: 10,
  },
  resultButtonText: {
    textAlign: "center",
    fontSize: width * 0.04,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonClose: {
    backgroundColor: "#ff2d3b",
    paddingVertical: 7,
    width: width * 0.2,
    borderRadius: 10,
  },
});