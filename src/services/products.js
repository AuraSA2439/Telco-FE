import { API_URL } from "./config";

export async function fetchProducts({ page = 1, limit = 20 }) {
  try {
    const res = await fetch(`${API_URL}/api/products?page=${page}&limit=${limit}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to fetch products");

    return (json.data || []).map((p) => ({
      id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      specifications: p.specifications,
      features: p.features,
    }));
  } catch (err) {
    console.error("fetchProducts error:", err);
    return [];
  }
}

export async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    const json = await res.json();

    if (!res.ok) throw new Error(json.message || "Failed to fetch product");

    const p = json.data;

    return {
      id: p._id,
      name: p.name,
      category: p.category,
      price: p.price,
      description: p.description,
      specifications: p.specifications,
      features: p.features,
    };
  } catch (err) {
    console.error("fetchProductById error:", err);
    return null;
  }
}