import { API_URL } from "./config";

function getToken() {
  if (typeof document === "undefined") return null;

  return (
    localStorage.getItem("token") ||
    document.cookie.match(/(^| )token=([^;]+)/)?.[2] ||
    null
  );
}

// Fetch all products
export async function fetchProducts({ page = 1, limit = 50 } = {}) {
  const token = getToken();

  if (!token) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Missing authentication token");
  }

  const res = await fetch(`${API_URL}/api/products?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.message || "Failed to fetch products");

  return (json.data || []).map((p, index) => ({
    id: p.id || p._id || `product-${index}`,
    name: p.name,
    category: (p.category || "").toLowerCase(),
    price: p.price,
    description: p.description,
    specifications: p.specifications,
    features: p.features,
    isRecommended: false,
  }));
}

// Fetch single product by ID
export async function fetchProductById(id) {
  const token = getToken();

  if (!token) {
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Missing authentication token");
  }

  const res = await fetch(`${API_URL}/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) throw new Error(json.message || "Failed to fetch product");

  const p = json.data;

  return {
    id: p.id || p._id,
    name: p.name,
    category: (p.category || "").toLowerCase(),
    price: p.price,
    description: p.description,
    specifications: p.specifications,
    features: p.features,
    isRecommended: false,
  };
}