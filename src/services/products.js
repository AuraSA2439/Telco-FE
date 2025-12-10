const API_BASE_URL = "https://telco-recommendation-backend-production.up.railway.app";

export async function fetchProducts({ page = 1, limit = 20 }) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products?page=${page}&limit=${limit}`);

    if (!res.ok) throw new Error("Failed to fetch products");

    const json = await res.json();

    const products = json?.data || [];

    // Normalize each product so UI can display them
    return products.map((p) => ({
      id: p._id,
      name: p.name,
      category: p.category,
      rawPrice: p.price,
      price: `Rp. ${p.price.toLocaleString("id-ID")}`,
      description: p.description,
      specifications: p.specifications,
      features: p.features
    }));

  } catch (err) {
    console.error("fetchProducts error:", err);
    return [];
  }
}