# 🎨 Innova-Fit Style System

> Versión 1.0

---

# Color System

## Light Theme

| Token | Valor | Uso |
|--------|-------|-----|
| background | `oklch(1 0 0)` | Fondo principal |
| foreground | `oklch(0.145 0 0)` | Texto principal |
| primary | `oklch(0.205 0 0)` | Acción principal |
| primary-foreground | `oklch(0.985 0 0)` | Texto sobre primary |
| secondary | `oklch(0.97 0 0)` | Fondos secundarios |
| secondary-foreground | `oklch(0.205 0 0)` | Texto sobre secondary |
| muted | `oklch(0.97 0 0)` | Fondos suaves |
| muted-foreground | `oklch(0.556 0 0)` | Texto secundario |
| accent | `oklch(0.97 0 0)` | Hover / Estados |
| accent-foreground | `oklch(0.205 0 0)` | Texto sobre accent |
| destructive | `oklch(0.577 0.245 27.325)` | Errores |
| border | `oklch(0.922 0 0)` | Bordes |
| input | `oklch(0.922 0 0)` | Inputs |
| ring | `oklch(0.708 0 0)` | Focus |

### Surface

| Token | Valor |
|--------|-------|
| card | `oklch(1 0 0)` |
| card-foreground | `oklch(0.145 0 0)` |
| popover | `oklch(1 0 0)` |
| popover-foreground | `oklch(0.145 0 0)` |
| sidebar | `oklch(0.985 0 0)` |
| sidebar-foreground | `oklch(0.145 0 0)` |

---

## Dark Theme

| Token | Valor | Uso |
|--------|-------|-----|
| background | `oklch(0.145 0 0)` | Fondo principal |
| foreground | `oklch(0.985 0 0)` | Texto principal |
| primary | `oklch(0.922 0 0)` | Acción principal |
| primary-foreground | `oklch(0.205 0 0)` | Texto sobre primary |
| secondary | `oklch(0.269 0 0)` | Fondos secundarios |
| secondary-foreground | `oklch(0.985 0 0)` | Texto sobre secondary |
| muted | `oklch(0.269 0 0)` | Fondos suaves |
| muted-foreground | `oklch(0.708 0 0)` | Texto secundario |
| accent | `oklch(0.269 0 0)` | Hover / Estados |
| accent-foreground | `oklch(0.985 0 0)` | Texto sobre accent |
| destructive | `oklch(0.704 0.191 22.216)` | Errores |
| border | `oklch(1 0 0 / 10%)` | Bordes |
| input | `oklch(1 0 0 / 15%)` | Inputs |
| ring | `oklch(0.556 0 0)` | Focus |

### Surface

| Token | Valor |
|--------|-------|
| card | `oklch(0.205 0 0)` |
| card-foreground | `oklch(0.985 0 0)` |
| popover | `oklch(0.205 0 0)` |
| popover-foreground | `oklch(0.985 0 0)` |
| sidebar | `oklch(0.205 0 0)` |
| sidebar-foreground | `oklch(0.985 0 0)` |

---

# Typography

## Font Families

| Fuente | Uso |
|---------|-----|
| **Inter** | Texto principal |
| **Space Grotesk** | Títulos |
| **JetBrains Mono** | Texto técnico |

## Type Scale

| Nivel | Clase | Fuente | Peso |
|--------|--------|---------|------|
| Display | `text-5xl` | Space Grotesk | Bold |
| H1 | `text-4xl` | Space Grotesk | Bold |
| H2 | `text-3xl` | Space Grotesk | Semibold |
| H3 | `text-2xl` | Inter | Semibold |
| Body | `text-base` | Inter | Regular |
| Small | `text-sm` | Inter | Regular |
| Label | `text-sm` | Inter | Medium |
| Mono | `text-sm` | JetBrains Mono | Medium |

---

# Border Radius

| Elemento | Clase |
|----------|--------|
| Button | `rounded-lg` |
| Input | `rounded-lg` |
| Card | `rounded-xl` |
| Dialog | `rounded-2xl` |
| Avatar | `rounded-full` |

---

# Spacing

## Sections

| Uso | Clase |
|-----|--------|
| Entre secciones | `space-y-10` |
| Bloques grandes | `space-y-8` |
| Bloques medianos | `space-y-6` |
| Bloques pequeños | `space-y-4` |

## Forms

| Uso | Clase |
|-----|--------|
| Formulario | `space-y-5` |
| Label → Input | `gap-2` |

## Cards

| Uso | Clase |
|-----|--------|
| Padding | `p-6` |
| Contenido | `space-y-4` |

## Dashboard

| Uso | Clase |
|-----|--------|
| Grid principal | `gap-8` |
| Grid secundario | `gap-6` |

---

# Elevation

| Elemento | Estilo |
|----------|--------|
| Cards | `border` |
| Popover | `shadow-md` |
| Dropdown | `shadow-md` |
| Dialog | `shadow-lg` |

---

# Icons

**Library**

- `lucide-react`

---

# Theme

- Light
- Dark
- System