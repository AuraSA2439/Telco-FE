const API_BASE_URL = "http://localhost:5000";

// Helper: Build headers with JWT token (if available)
function authHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
}

/* ------------------------------------------
   REGISTER
------------------------------------------- */
export async function registerUser({ phoneNumber, pin, name }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, pin, name }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  // Save token
  localStorage.setItem("token", json.data.token);
  return json.data.user;
}

/* ------------------------------------------
   LOGIN
------------------------------------------- */
export async function loginUser({ phoneNumber, pin }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber, pin }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  // Save JWT
  localStorage.setItem("token", json.data.token);
  return json.data.user;
}

/* ------------------------------------------
   CHECK PHONE
------------------------------------------- */
export async function checkPhone(phoneNumber) {
  const res = await fetch(`${API_BASE_URL}/api/auth/check-phone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phoneNumber }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json.data;
}

/* ------------------------------------------
   GET PROFILE
------------------------------------------- */
export async function getProfile() {
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: "GET",
    headers: authHeaders(),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json.data;
}

/* ------------------------------------------
   UPDATE PROFILE
------------------------------------------- */
export async function updateProfile(data) {
  const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json.data;
}

/* ------------------------------------------
   CHANGE PIN
------------------------------------------- */
export async function changePin({ oldPin, newPin }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/change-pin`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ oldPin, newPin }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message);

  return json;
}

/* ------------------------------------------
   LOGOUT
------------------------------------------- */
export function logout() {
  localStorage.removeItem("token");
  // Optionally call backend logout endpoint (not required)
}