export const profile = {
  name: "Vidushi Soni",
  initials: "VS",
  role: "MERN Stack Developer",
  typewriterRoles: [
    "MERN Stack Developer",
    "React Developer",
    "AI Web App Builder",
  ],
  email: "sonividushi98@gmail.com",
  location: "Jaipur, Rajasthan, India",
  status: "B.Tech Computer Science student (2024 - Ongoing), JK Lakshmipat University. CGPA 8.23.",
  github: "https://github.com/sonividushi98-ctrl",
  linkedin: "https://www.linkedin.com/in/vidushi-soni-908250369/",
  photoSrc: "/profile.jpg",
  bio: "I am a Computer Science undergraduate at JK Lakshmipat University with hands-on experience building AI-driven web apps such as Virtual Closet and PetCare AI, along with relational database systems and blockchain-integrated platforms. I am proficient in Python, C++ and SQL, and I am now focused on the MERN stack — React, Node.js, Express and MongoDB. I enjoy shipping projects both independently and in teams, turning ideas into working products.",
};

export const socials = [
  { id: "github", label: "GitHub", href: profile.github },
  { id: "linkedin", label: "LinkedIn", href: profile.linkedin },
  { id: "email", label: "Email", href: `mailto:${profile.email}` },
];

export const skills = {
  Frontend: [
    { name: "HTML", level: 90 },
    { name: "CSS", level: 85 },
    { name: "JavaScript", level: 80 },
    { name: "React.js", level: 75 },
  ],
  Backend: [
    { name: "Node.js", level: 70 },
    { name: "Express.js", level: 70 },
    { name: "Python", level: 80 },
    { name: "Flask", level: 75 },
  ],
  Database: [
    { name: "MongoDB", level: 70 },
    { name: "MySQL", level: 75 },
    { name: "SQL", level: 80 },
  ],
  "Languages & Core": [
    { name: "C", level: 75 },
    { name: "C++", level: 75 },
    { name: "Data Structures & Algorithms", level: 70 },
    { name: "OOP", level: 75 },
  ],
  "Tools & Technologies": [
    { name: "Git & GitHub", level: 75 },
    { name: "VS Code", level: 85 },
    { name: "REST APIs", level: 70 },
  ],
};

export const softSkills = ["Communication", "Team work", "Problem solving"];

export const projects = [
  {
    id: "sports-management-system",
    name: "Sports Management System",
    description:
      "Built a system managing 50+ players, 10+ teams, and full tournament lifecycle records including scheduling and leaderboards. Designed ER diagrams and relational schemas with primary and foreign key constraints, and used multi-table JOINs and aggregate functions to auto-generate player performance reports and match result summaries.",
    tech: ["Python", "MySQL", "SQL"],
    github: "https://github.com/RohitTak06/Muqabla",
    live: null,
  },
  {
    id: "petcare-ai",
    name: "PetCare AI",
    description:
      "Pet healthcare web app where users upload pet images to receive AI-powered vet and medicine recommendations, with appointment booking filtered by ratings and real-time availability. Integrates blockchain to store medical records immutably for tamper-proof, verifiable health history.",
    tech: ["Python", "Flask", "HTML", "CSS", "Blockchain"],
    github: "https://github.com/sonividushi98-ctrl/LNMIIT-project",
    live: null,
  },
  {
    id: "virtual-closet",
    name: "Virtual Closet",
    description:
      "AI-based fashion recommendation web app that analyzes uploaded clothing images to generate outfit combinations and personalized shopping suggestions tailored to user style. Built with rapid prototyping to iterate within tight timelines.",
    tech: ["Python", "Flask", "HTML", "CSS", "AI/ML"],
    github: "https://github.com/sonividushi98-ctrl/Virtual-closet",
    live: "https://virtualcloset-gdbn-6bbre09g7-sonividushi2118-techs-projects.vercel.app",
  },
];

export const projectFilters = [
  "All",
  ...Array.from(new Set(projects.flatMap((project) => project.tech))),
];

export const education = {
  degree: "Bachelor of Technology, Computer Science",
  institution: "JK Lakshmipat University",
  years: "2024 - Ongoing",
  detail: "CGPA 8.23",
};

export const internship = {
  title: "Internship under faculty guidance",
  organization: "JK Lakshmipat University",
  description:
    "Completed research and project work under a professor at JK Lakshmipat University, contributing to academic development through structured, faculty-supervised tasks.",
};

export const extracurricular = [
  {
    title: "HackJKLU Internal Arrangements (IA) Committee",
    year: "2025",
    description:
      "Managed event logistics and on-ground coordination for 200+ participants.",
  },
  {
    title: "Annual Fest - Food Accommodation Committee",
    year: "2024",
    description:
      "Coordinated hospitality, catering, and stay arrangements for 150+ participants and guests.",
  },
];

export const certifications = [
  {
    id: "c-for-everyone",
    title: "C for Everyone",
    platform: "Coursera",
    year: "2025",
    verifyUrl:
      "https://www.coursera.org/account/accomplishments/verify/E9S7QSEJSNQV",
  },
  {
    id: "lnmiit-hackathon",
    title: "LNMIIT Hackathon Participation",
    platform: "LNMIIT",
    year: "2025",
    verifyUrl:
      "https://credsverse.com/credentials/94ff894a-49d3-4aeb-a785-ed366ff5c682?preview=1",
  },
];

export const apiBase = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
  /\/$/,
  ""
);

// Resume / CV — hosted on Google Drive
export const resumeLinks = {
  pdf: "https://drive.google.com/file/d/1iE4c-5fxklGYdknMZDbW2PBuSGcP5u5O/view?usp=sharing",
  docx: "https://drive.google.com/file/d/1iE4c-5fxklGYdknMZDbW2PBuSGcP5u5O/view?usp=sharing",
};
