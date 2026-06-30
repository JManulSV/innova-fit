"use client";

import { ClipboardCheck, HomeIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function BottomNavigation() {

  const pathname = usePathname();

  const items = [
    {
      label: "Inicio",
      href: "/client",
      icon: HomeIcon,
    },
    {
      label: "Rutina",
      href: "/client/workout",
      icon: ClipboardCheck,
    },
    {
      label: "Perfil",
      href: "/client/profile",
      icon: UserCircleIcon,
    },
  ];

  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      bg-white
      border-t
      shadow-lg
      "
    >
      <div className="flex justify-around py-3">

        {items.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex
                flex-col
                items-center
                text-xs
                transition-colors

                ${
                  active
                    ? "text-blue-600"
                    : "text-gray-500"
                }
              `}
            >
              <Icon className="w-6 h-6" />

              <span>
                {item.label}
              </span>

            </Link>
          );

        })}

      </div>
    </nav>
  );
}