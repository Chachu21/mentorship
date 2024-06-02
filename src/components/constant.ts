export const backend_url =
  process.env.NODE_ENV === "production"
    ? "https://mentorshipserver-backend.onrender.com"
    : "http://localhost:5000";
