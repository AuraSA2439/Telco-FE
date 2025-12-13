import { API_URL } from "./config";

function getToken() {
  if (typeof document === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    document.cookie.match(/(^| )token=([^;]+)/)?.[2] ||
    null
  );
}

export async function fetchRecommendations({ algorithm = "hybrid", limit = 50 }) {
  const token = getToken();

  if (!token) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Missing authentication token");
  }

  const url = `${API_URL}/api/recommendations?algorithm=${encodeURIComponent(
    algorithm
  )}&limit=${limit}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok)
    throw new Error(json.message || "Failed to fetch recommendations");

  return (json?.data?.recommendations || [])
    .map((r) => r?.product || r)
    .filter(Boolean);
}
