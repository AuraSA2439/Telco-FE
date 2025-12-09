const API_BASE_URL = "http://localhost:5000"; // Development backend URL

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(`${API_BASE_URL}/api/products?${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Failed to fetch products");
  }

  return json.data; // backend returns { status, message, data, pagination }
}