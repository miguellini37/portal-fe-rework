// Utilities for converting between ISO-8601 strings and HTML datetime-local values
// "datetime-local" expects a local time without timezone in the shape YYYY-MM-DDTHH:mm
// Our app stores/transmits ISO strings (UTC). These helpers bridge the two.

export const isoToLocalInputValue = (iso?: string): string => {
  if (!iso) {
    return '';
  }
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return '';
  }
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

export const localInputValueToISO = (local: string): string => {
  // local is expected in YYYY-MM-DDTHH:mm (no timezone) and represents local wall time
  if (!local) {
    return '';
  }
  try {
    const [date, time] = local.split('T');
    if (!date || !time) {
      return '';
    }
    const [y, m, d] = date.split('-').map((n) => parseInt(n, 10));
    const [hh, mm] = time.split(':').map((n) => parseInt(n, 10));
    if (!y || !m || !d) {
      return '';
    }
    const dt = new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0);
    return dt.toISOString();
  } catch {
    return '';
  }
};
