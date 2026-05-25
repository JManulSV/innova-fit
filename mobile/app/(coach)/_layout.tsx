import { useAuthStore } from "@/src/store/authStore"
import { Redirect, Tabs } from "expo-router";
import  Icon  from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
    const user = useAuthStore((state) => state.user);
    
    if(!user) {
        return <Redirect href="/(auth)/login" />
    }

    if(user.role !== 'coach') {
        return <Redirect href="/(client)/home" />
    }

    return( 
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="dashboard"
                options={{ 
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ), 
                }}
            />

            <Tabs.Screen
                name="clients"
                options={{ 
                    title: 'Clientes',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="people" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="routines"
                options={{ 
                    title: 'Rutinas',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="fitness-center" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{ 
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person" color={color} size={size} />
                    ),
                }}
            />
    </Tabs>
    );
}