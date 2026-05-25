import { useAuthStore } from "@/src/store/authStore";
import { Redirect, Slot } from "expo-router";

export default function Layout() {
    const user = useAuthStore((state) => state.user);
    
    if (user) {
        if (user.role === 'coach') {
            return <Redirect href="/(coach)/dashboard" />;
        } else if (user.role === 'client') {
            return <Redirect href="/(client)/home" />;
        }
    }
    
    return <Slot />;
}