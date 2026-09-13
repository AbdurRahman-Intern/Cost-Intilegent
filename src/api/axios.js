/**
 * axios.js
 *
 * PURPOSE:
 * A single, pre-configured Axios instance shared by every api/*.js file.
 *
 * WHY CONFIGURE IT HERE INSTEAD OF EVERYWHERE:
 * Base URL, headers, and auth tokens are cross-cutting concerns. Setting
 * them once means every request automatically gets them, and Laravel
 * integration later becomes a one-file change.
 *
 * CURRENT STATE:
 * This client isn't actually used yet — every api/*.js file still
 * returns mock data (see the "CURRENT STATE / FUTURE" note in each of
 * those files). It's included now so the switch to a real backend is a
 * drop-in change rather than a new architecture decision.
 */
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: attach an Authorization: Bearer <token> header here once
// authentication is implemented (see AI Analyst / Settings TODOs).
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("auth_token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export default apiClient;
