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

  return (json?.data?.recommendations || [])
    .map((r, index) => {
      const p = r?.product || r;
      return {
        id: p.id || p._id || `recommended-${index}`,
        name: p.name,
        category: (p.category || "").toLowerCase(),
        price: `Rp. ${p.price.toLocaleString("id-ID")}`,
        description: p.description,
        specifications: p.specifications,
        features: p.features,
        isRecommended: true,
      };
    })
    .filter(Boolean);
}