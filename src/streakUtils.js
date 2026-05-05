export function formatLocalDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function streakIsActive(lastJournalDateStr) {
  if (!lastJournalDateStr) return false;
  const todayStr = formatLocalDate(new Date());
  const yesterdayStr = formatLocalDate(addDays(new Date(), -1));
  return lastJournalDateStr === todayStr || lastJournalDateStr === yesterdayStr;
}
