export const parseDateString = (dateStr: string): Date | null => {
  if (!dateStr) return null;

  // if it matches YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return new Date(dateStr);

  // if it matches DD-MM-YY (like "04-03-26")
  if (/^\d{2}-\d{2}-\d{2}$/.test(dateStr)) {
    const [d, m, y] = dateStr.split("-");
    return new Date(`20${y}-${m}-${d}`);
  }

  // format "DD-MMM-YY" where MMM could be indonesian (Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, Des)
  // or English (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec)
  const monthMap: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    Mei: "05",
    May: "05",
    Jun: "06",
    Jul: "07",
    Agu: "08",
    Aug: "08",
    Sep: "09",
    Okt: "10",
    Oct: "10",
    Nov: "11",
    Des: "12",
    Dec: "12",
    Januari: "01",
    Februari: "02",
    Maret: "03",
    April: "04",
    Juni: "06",
    Juli: "07",
    Agustus: "08",
    September: "09",
    Oktober: "10",
    November: "11",
    Desember: "12",
  };

  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const d = parts[0];
    let m = parts[1];
    let y = parts[2];
    const mappedMonth =
      monthMap[m] ||
      monthMap[m.substring(0, 1).toUpperCase() + m.substring(1).toLowerCase()];
    if (mappedMonth) {
      m = mappedMonth;
    }
    // y is like '25' or '26'
    if (y.length === 2) y = "20" + y;
    return new Date(`${y}-${m}-${d}`);
  }

  // fallback
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
};
