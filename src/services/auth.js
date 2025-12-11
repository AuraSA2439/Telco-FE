import { API_URL } from "./config";

/* ------------------------------------------
   TOKEN HELPERS
------------------------------------------- */
function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
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
   BASE REQUEST
------------------------------------------- */
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
   OTP LOGIN SYSTEM
------------------------------------------- */
export async function requestOtp(phoneNumber) {
  return request("/api/auth/request-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber }),
  });
}

export async function verifyOtp({ phoneNumber, otp }) {
  const result = await request("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber, otp }),
  });

  // Save token
  if (result.token) saveToken(result.token);

  return result;
}

/* ------------------------------------------
   PROFILE
------------------------------------------- */
export function getProfile() {
  return request("/api/auth/profile", {
    method: "GET",
    auth: true,
  });
}

export function updateProfile(data) {
  return request("/api/auth/profile", {
    method: "PUT",
    auth: true,
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   LOGOUT
------------------------------------------- */
export function logout() {
  removeToken();
}
