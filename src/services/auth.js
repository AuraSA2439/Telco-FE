import { API_URL } from "./config";

/* ------------------------------------------
   HELPERS
------------------------------------------- */
function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

function saveToken(token) {
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 3600}`;
}

function removeToken() {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
}

/* ------------------------------------------
   REQUEST WRAPPER
------------------------------------------- */
async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.auth && { Authorization: `Bearer ${getToken()}` }),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(json.message || "Request failed");
  }

  return json.data ?? json;
}

/* ------------------------------------------
   LOGIN (Simple Login)
------------------------------------------- */
export async function loginUser({ phoneNumber, name }) {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      phoneNumber,
      ...(name && { name }),
    }),
  });

  // API returns: { user: {...}, token: "..." }
  saveToken(data.token);

  return data.user;
}

/* ------------------------------------------
   CHECK PHONE 
------------------------------------------- */
export function checkPhone(phoneNumber) {
  return request("/api/auth/check-phone", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });
}

/* ------------------------------------------
   LOGOUT
------------------------------------------- */
export function logout() {
  removeToken();
}

export function getProfile() {
  return request("/api/auth/profile", { auth: true });
}