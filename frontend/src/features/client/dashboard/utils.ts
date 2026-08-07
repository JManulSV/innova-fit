export function parseDashboardDate(value: string | Date) {
  if (value instanceof Date) {
    return value;
  }

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = value.match(dateOnly);

  if (match) {
    const [, year, month, day] = match;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  return new Date(value);
}

export function formatDashboardDate(value: string | Date) {
  const date = parseDashboardDate(value);

  if (Number.isNaN(date.getTime())) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
