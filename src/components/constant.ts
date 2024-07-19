export const backend_url =
  process.env.NODE_ENV === "production"
    ? "https://mentorshipserver-backend.onrender.com"
    : "http://localhost:5000";

export const guidelinesData = [
  {
    id: 1,
    headers: "Guide tour",
    title: "",
    description:
      "Use your workspace to manage draft job posts, action items, and completed work.",
    footer: "",
    className: "bg-blue-600 text-white text-xl",
  },
  {
    id: 2,
    headers: "Create post ",
    title: "Create mentorship post",
    description: "create a new mentorship post and  get mentees proposal",
    footer: "post new mentorship",
  },
  {
    id: 3,
    headers: "Quik tip",
    title: "Get payment",
    description:
      "once post paid mentorship and the mentees apply for that mentorship and you can get payment from mentee when mentee approve your work",
    footer: "learn more",
  },
];
