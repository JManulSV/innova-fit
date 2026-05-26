import { View, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { api } from "../api/client";
import { useAuthStore } from "../store/authStore";
import { router } from "expo-router";

export default function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Cerrar sesión",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await api.post('/logout');

              if (res.status === 200) {
                logout();
                router.replace("/(auth)/login");
              }
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert("Error", "No se pudo cerrar la sesión en el servidor.");
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Nota: Si el botón se estira a toda la pantalla, quita este 'flex: 1'
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});