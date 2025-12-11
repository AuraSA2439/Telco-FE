// Convert country name → emoji flag
function getFlagEmoji(countryName) {
  const name = countryName.toLowerCase();

  // Special case: Global Coverage
  if (name.includes("global")) return "🌍";

  const countryMap = {
    "united states": "US",
    "usa": "US",
    "america": "US",
    "united kingdom": "GB",
    "uk": "GB",
    "england": "GB",
    "indonesia": "ID",
    "singapore": "SG",
    "malaysia": "MY",
    "japan": "JP",
    "china": "CN",
    "south korea": "KR",
    "australia": "AU",
    "canada": "CA",
    "france": "FR",
    "germany": "DE",
    "india": "IN",
  };

  const code = countryMap[name];
  if (!code) return "🏳️"; // fallback flag

  // Convert country code → Unicode flag emoji
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt()));
}