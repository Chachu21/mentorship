"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { backend_url } from "../constant";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface SkillSet {
  [key: string]: number;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location?: {
    state?: string;
    city?: string;
    region?: string;
    zipCode?: number;
  };
  skills: string[];
  role: string;
}

interface DashboardData {
  mentors: number;
  mentees: number;
  menteeSkills: SkillSet;
  mentorSkills: SkillSet;
}

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData>({
    mentors: 0,
    mentees: 0,
    menteeSkills: {},
    mentorSkills: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMentees, resMentors] = await Promise.all([
          axios.get(`${backend_url}/api/v1/users/getAllMentees`),
          axios.get(`${backend_url}/api/v1/users/getAllMentors`),
        ]);

        const mentees: User[] = resMentees.data;
        const mentors: User[] = resMentors.data;

        // Aggregate skills
        const aggregateSkills = (users: User[]): SkillSet => {
          return users.reduce((acc: SkillSet, user: User) => {
            user.skills.forEach((skill: string) => {
              acc[skill] = (acc[skill] || 0) + 1;
            });
            return acc;
          }, {});
        };

        const menteeSkills = aggregateSkills(mentees);
        const mentorSkills = aggregateSkills(mentors);

        setData({
          mentors: mentors.length,
          mentees: mentees.length,
          menteeSkills,
          mentorSkills,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculatePercentages = (skills: SkillSet) => {
    const labels = Object.keys(skills);
    const values = Object.values(skills);
    const total = values.reduce((acc, val) => acc + val, 0);
    return {
      labels: labels.length > 0 ? labels : ["No Skills"],
      data:
        values.length > 0
          ? values.map((value) => (value / total) * 100)
          : [100],
    };
  };

  const menteePercentages = calculatePercentages(data.menteeSkills);
  const mentorPercentages = calculatePercentages(data.mentorSkills);

  const barData = {
    labels: ["Mentors", "Mentees"],
    datasets: [
      {
        label: "Count",
        data: [data.mentors, data.mentees],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = (percentages: { labels: string[]; data: number[] }) => ({
    labels: percentages.labels,
    datasets: [
      {
        label: "Skills",
        data: percentages.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const barOptions = {
    indexAxis: "x" as const,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        grid: {
          display: true, // Ensure grid is displayed
          color: "rgba(0,0,0,0.1)", // Use color instead of borderColor
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true, // Ensure grid is displayed
          color: "rgba(0,0,0,0.1)", // Use color instead of borderColor
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Current Number of Mentors and Mentees",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    barPercentage: 0.2, // Adjust bar width here
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const, // Ensure position is one of the valid types
      },
      title: {
        display: true,
        text: "Percentage of Skills",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    cutout: "50%", // Make doughnut charts smaller
  };

  return (
    <div className="min-h-screen bg-white p-3 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6">
        Admin Dashboard
      </h1>
      {/* Bar Graph */}
      <div className="mb-8">
        <div className="w-full max-w-xl mx-auto">
          <Bar data={barData} options={barOptions} height={200} />
        </div>
      </div>
      {/* Doughnut Charts */}
      <div className="flex justify-between">
        <div className="w-1/2 px-2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Mentee Skills
          </h2>
          <div className="w-full h-48 mx-auto">
            <Doughnut
              data={doughnutData(menteePercentages)}
              options={doughnutOptions}
            />
          </div>
        </div>
        <div className="w-1/2 px-2">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Mentor Skills
          </h2>
          <div className="w-full h-48 mx-auto">
            <Doughnut
              data={doughnutData(mentorPercentages)}
              options={doughnutOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
