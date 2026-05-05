export const MAX_AWARD_DAY = 30;

function ordinal(n) {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return `${n}st`;
  if (j === 2 && k !== 12) return `${n}nd`;
  if (j === 3 && k !== 13) return `${n}rd`;
  return `${n}th`;
}

export function getDayAward(day) {
  if (day < 1 || day > MAX_AWARD_DAY) return null;
  const ord = ordinal(day);
  return {
    id: `day-${day}`,
    title: `${ord} Day Clean`,
    details: `You made it ${day} clean day${day === 1 ? "" : "s"} in a row. Keep it up!`,
    imageUrl: `https://placehold.co/400x240/2563eb/ffffff/png?text=${encodeURIComponent(`${ord} Day Clean`)}`,
  };
}
