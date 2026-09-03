export function getInitials(name?: string|null, fallback = ""): string {
    const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

    if (parts.length === 0) return fallback;

    return parts
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2) 
    .join("") 
    .toUpperCase();
}