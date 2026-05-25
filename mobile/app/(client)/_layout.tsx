import { useAuthStore } from "@/src/store/authStore"
import { Redirect, Slot } from "expo-router";

export default function Layout(){
    const user = useAuthStore((state) => state.user);
    
    if(!user) {
        return <Redirect href="/(auth)/login" />
    }

    if(user.role !== 'client') {
        return <Redirect href="/(coach)/dashboard" />
    }

    return <Slot />
}