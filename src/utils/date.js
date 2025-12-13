export function calculateExpiryDate(validityInDays) {
  if (!validityInDays) return null;

  const today = new Date();
  const expiry = new Date(today);
  expiry.setDate(today.getDate() + validityInDays);

  return expiry;
}

export function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}