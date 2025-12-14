import { API_URL } from "./config";

function getToken() {
  if (typeof document === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    document.cookie.match(/(^| )token=([^;]+)/)?.[2] ||
    null
  );
}

export async function fetchRecommendations() {
  const token = getToken();

  if (!token) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Missing authentication token");
  }

  const res = await fetch(`${API_URL}/api/recommendations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch recommendations");
  }

  // Normalize response shape
  return (json?.data?.recommendations || [])
    .map((r) => r?.product || r)
    .filter(Boolean);
}