interface FAQProps {
  question: string;
  answer: string;
}
export const categories = [
  {
    id: 1,
    name: "Development & IT",
    href: {
      pathname: "/catagory-of-mentor/developmepment-and-IT",
      query: {
        category: "Development & IT",
        title: "Mentors in Development and IT to Support Your Growth",
        subTitle:
          "Connect with experienced mentors to accelerate your development journey, overcome obstacles, and foster personal growth.",
        buttonText: "Get started",
        image: "/assets/it.avif",
        slogan: "Leading mentors in Development and IT to guide your career.",
      },
    },
    faqs: [
      {
        question:
          "What is the initial step to finding the right mentor for your development and IT goals and understanding the associated mentorship costs?",
        answer:
          "One of the initial steps in mentorship is identifying the specific skills you require for your growth journey. Mentorship platforms like Upwork match you with experienced mentors who possess a diverse range of expertise in development and IT, ready to guide you in achieving your goals.",
      },
      {
        question:
          "Why should I use Mentorship to find mentors for development and IT guidance?",
        answer:
          "Mentorship offers you the flexibility you need to find the right guidance for your development and IT journey.",
      },
      {
        question:
          "What are the benefits of participating in a mentorship program?",
        answer:
          "Participating in a mentorship program offers numerous advantages, including personalized guidance and support from experienced mentors, opportunities for professional and personal growth, access to valuable industry insights and networking opportunities, and tailored advice to help achieve career goals and overcome challenges.",
      },

      // Add more FAQs as needed
    ],
  },
  {
    id: 2,
    name: "Design & Creativity Art",
    href: {
      pathname: "/catagory-of-mentor/design-and-creativity-art",
      query: {
        category: "Design & Creativity Art",
        title: "Mentors in Design and Creativity Art",
        subTitle:
          "Connect with experienced mentors to accelerate your development journey, overcome obstacles, and foster personal growth.",
        buttonText: "Get started",
        image: "/assets/it.avif",
        slogan:
          "Inspiring mentors in Design and Creativity Art for your growth.",
      },
    },
  },
  {
    id: 3,
    name: "Health & Fitness",
    href: {
      pathname: "/catagory-of-mentor/health-and-fitness",
      query: {
        category: "Health & Fitness",
        title: "Mentors in Health and Fitness to Support Your Growth",
        subTitle:
          "Connect with experienced mentors to accelerate your health journey, overcome obstacles, and foster personal growth.",
        buttonText: "Get started",
        image: "/assets/fitness.avif",
        slogan: "Expert mentors in Health and Fitness to achieve your goals.",
      },
    },
  },
  {
    id: 4,
    name: "Lifestyle",
    href: {
      pathname: "/catagory-of-mentor/lifestyle",
      query: {
        category: "Lifestyle",
        title: "Mentors in Lifestyle to Support Your Growth",
        subTitle:
          "Connect with experienced mentors to enhance your lifestyle, overcome obstacles, and foster personal growth.",
        buttonText: "Get started",
        image: "/assets/lifestyle.jpg",
        slogan: "Experienced mentors to elevate your Lifestyle.",
      },
    },
  },
  {
    id: 5,
    name: "Social & Business",
    href: {
      pathname: "/catagory-of-mentor/social-and-business",
      query: {
        category: "Social & Business",
        title: "Mentors in Social and Business to Support Your Growth",
        subTitle:
          "Connect with experienced mentors to accelerate your social and business journey, overcome obstacles, and foster personal growth.",
        buttonText: "Get started",
        image: "/assets/business.jpg",
        slogan: "Professional mentors in Social and Business for your success.",
      },
    },
  },
  {
    id: 6,
    name: "Marketing & Finances",
    href: {
      pathname: "/catagory-of-mentor/marketing-and-finances",
      query: {
        category: "Marketing & Finances",
        title: "Mentors in Marketing and Finances to Support Your Growth",
        subTitle:
          "Connect with experienced mentors to accelerate your marketing and financial journey, overcome obstacles, and foster personal growth.",
        buttonText: "Get started",
        image: "/assets/marketing.jpg",
        slogan:
          "Trusted mentors in Marketing and Finances to boost your skills.",
      },
    },
  },
];
