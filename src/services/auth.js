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

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.auth && { Authorization: `Bearer ${getToken()}` }),
      ...options.headers,
    },
    ...options,
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || "Request failed");

  return json.data ?? json;
}

/* ------------------------------------------
   LOGIN
------------------------------------------- */
export async function loginUser({ phoneNumber, pin }) {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ phoneNumber, pin }),
  });

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
   GET PROFILE
------------------------------------------- */
export function getProfile() {
  return request("/api/auth/profile", { method: "GET", auth: true });
}

/* ------------------------------------------
   UPDATE PROFILE
------------------------------------------- */
export function updateProfile(data) {
  return request("/api/auth/profile", {
    method: "PUT",
    auth: true,
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   CHANGE PIN
------------------------------------------- */
export function changePin({ oldPin, newPin }) {
  return request("/api/auth/change-pin", {
    method: "POST",
    auth: true,
    body: JSON.stringify({ oldPin, newPin }),
  });
}

/* ------------------------------------------
   LOGOUT
------------------------------------------- */
export function logout() {
  removeToken();
}