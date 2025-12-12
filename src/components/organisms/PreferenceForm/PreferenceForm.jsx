"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/services/auth";

export default function PreferenceForm({ onChange }) {
  const [form, setForm] = useState({
    category: "all",
    algorithm: "hybrid",
    limit: 10,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load preferences from backend
  useEffect(() => {
    async function load() {
      try {
        const profile = await getProfile();

        const prefs = {
          category: profile?.preferences?.category || "all",
          algorithm: profile?.preferences?.algorithm || "hybrid",
          limit: profile?.preferences?.limit || 10,
        };

        setForm(prefs);

        // Sync ke parent page
        onChange(prefs);

      } catch (err) {
        console.error("Failed to load preferences:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Local update
  function localUpdate(key, value) {
    const updated = { ...form, [key]: value };
    setForm(updated);

    // Real-time sync ke parent
    onChange(updated);
  }

  // Save preferences
  async function savePreferences() {
    setSaving(true);

    try {
      await updateProfile({
        preferences: {
          category: form.category,
          algorithm: form.algorithm,
          limit: form.limit,
        },
      });

      alert("Preferensi berhasil disimpan!");
    } catch (err) {
      alert("Gagal menyimpan preferensi: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="px-4 py-3 mb-6 text-sm text-gray-300 bg-gray-800 rounded">
        Memuat preferensi...
      </div>
    );
  }

  return (
    <div className="p-4 mb-6 bg-[#1a1a1a] border border-gray-700 rounded-lg">
      <h2 className="mb-3 text-lg font-semibold">Preferensi Anda</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Category */}
        <select
          className="px-3 py-2 text-white bg-black border border-gray-600 rounded"
          value={form.category}
          onChange={(e) => localUpdate("category", e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          <option value="data">Data</option>
          <option value="voice">Voice</option>
          <option value="roaming">Roaming</option>
          <option value="streaming">Streaming</option>
          <option value="combo">Combo</option>
          <option value="device">Device</option>
        </select>

        {/* Algorithm */}
        <select
          className="px-3 py-2 text-white bg-black border border-gray-600 rounded"
          value={form.algorithm}
          onChange={(e) => localUpdate("algorithm", e.target.value)}
        >
          <option value="hybrid">Hybrid</option>
          <option value="content-based">Content Based</option>
          <option value="collaborative">Collaborative</option>
        </select>

        {/* Limit */}
        <select
          className="px-3 py-2 text-white bg-black border border-gray-600 rounded"
          value={form.limit}
          onChange={(e) => localUpdate("limit", Number(e.target.value))}
        >
          <option value={5}>5 Produk</option>
          <option value={10}>10 Produk</option>
          <option value={15}>15 Produk</option>
          <option value={20}>20 Produk</option>
        </select>

      </div>

      <button
        onClick={savePreferences}
        disabled={saving}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-500 disabled:opacity-50"
      >
        {saving ? "Menyimpan..." : "Simpan Preferensi"}
      </button>
    </div>
  );
}
