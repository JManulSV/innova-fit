import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "InnovaFit",
        short_name: "InnovaFit",
        description: "InnovaFit es una aplicación web para entrenadores y clientes que permite gestionar rutinas de entrenamiento, ejercicios y plantillas de rutinas.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#4f46e5",
        icons: [
            {
                src: "/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],

    }
}