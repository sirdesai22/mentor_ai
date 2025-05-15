# MENTOR AI - AI-Powered Gamified Learning Platform

## 🚀 Overview

MENTOR AI is a modern, AI-driven learning platform designed to transform skill acquisition into an engaging and personalized adventure. Users can define skills they want to learn, and the AI generates a customized learning path, including interactive lessons, knowledge checks (MCQs), and eventually, AI-generated games tailored to their goals. The platform focuses on making learning effective, intuitive, and fun.

This project is built using Next.js and Tailwind CSS, providing a responsive and aesthetically pleasing user experience.

## ✨ Key Features

* **AI-Driven Learning Paths:** Users specify a skill, and the AI (simulated in the current version) outlines a roadmap with levels and tasks.
* **Gamified Learning:** The core concept involves learning through AI-generated games, levels, and tasks that make the process interactive and rewarding.
* **Personalized Experience:** The platform aims to adapt to individual learning styles and paces.
* **Interactive Lessons:** Rich content display for lessons with an integrated AI instructor chat for doubt clarification.
* **Skill Tracking & Management:** Users can view their enrolled skills, track progress through roadmaps, and manage their learning journey.
* **Modern UI/UX:** Clean, dark-themed interface built with Next.js and Tailwind CSS for a seamless experience across devices.
* **User Authentication Flow:** Includes landing, login, and dashboard pages for a complete user cycle.

## 🛠️ Tech Stack

* **Frontend:**
    * [Next.js](https://nextjs.org/) - React framework for server-side rendering, static site generation, and more.
    * [React](https://reactjs.org/) - JavaScript library for building user interfaces.
    * [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
    * [Lucide React](https://lucide.dev/) - Beautiful and consistent icon toolkit.
* **Database Schema (Conceptual):**
    * PostgreSQL (using Drizzle ORM syntax for schema definition) for storing user data, skills, roadmaps, tasks, and progress.
* **Deployment (Example):**
    * Vercel (recommended for Next.js applications) or any Node.js compatible hosting.

## 📄 Pages & Structure

The application currently features the following key pages:

1.  **Landing Page (`pages/index.js`):**
    * Introduces MENTOR AI, its features, and how it works.
    * Includes sections like Hero, How It Works, Features, Showcase, and Call to Action.
2.  **Login Page (`pages/login.js`):**
    * Allows users to sign in to their MENTOR AI account.
    * Includes fields for email and password, links for password recovery and sign-up.
3.  **User Dashboard (`pages/dashboard/index.js`):**
    * The central hub for logged-in users.
    * Displays an overview of current learning, progress snapshots, and recommended skills.
    * Features a persistent sidebar for navigation and a top bar for user profile and notifications.
4.  **New Skill Page (`pages/dashboard/new-skill.js`):**
    * Allows users to input a skill they want to learn.
    * Simulates AI analysis and presents a series of MCQs to gauge initial knowledge.
    * Leads to a (simulated) game generation step.
5.  **My Skills Page (`pages/dashboard/skills/index.js`):**
    * Displays a list of all skills the user is currently learning or has enrolled in.
    * Each skill is presented as a card showing its name, description, and overall progress.
6.  **Skill Detail Page (`pages/dashboard/skills/[skillId].js`):**
    * Provides a detailed view of a specific skill's roadmap.
    * Lists all levels, their titles, subtopics, and completion status.
    * Allows users to navigate to individual lessons/tasks within a level.
7.  **Lesson Study Page (`pages/dashboard/skills/[skillId]/learn/[levelNum]/[taskId].js`):**
    * The core learning interface.
    * Displays the content of a specific lesson (subtopic).
    * Features an integrated AI Instructor chat panel for users to ask questions and clarify doubts in real-time.
    * Includes navigation to previous/next lessons and a "Mark as Done" functionality.

## ⚙️ Setup and Installation (Generic Next.js)

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/mentor-ai.git](https://github.com/your-username/mentor-ai.git)
    cd mentor-ai
    ```
2.  **Install NPM packages:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables:**
    * Create a `.env.local` file in the root directory.
    * Add any necessary environment variables (e.g., database connection strings, API keys for AI services).
    ```env
    # Example (actual variables will depend on backend/DB setup)
    # DATABASE_URL="postgresql://user:password@host:port/database"
    # NEXT_PUBLIC_API_URL="http://localhost:3001/api"
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔮 Future Scope & Potential Enhancements

* **Real AI Integration:** Connect to actual AI models (e.g., GPT-4, Claude) for:
    * Dynamic roadmap and game generation.
    * Real-time AI instructor responses.
    * Personalized feedback and content adaptation.
* **Full-Fledged Backend:** Develop a robust backend to manage user authentication, database interactions, and AI service calls.
* **Interactive Game Engine:** Implement or integrate a simple game engine to create the learning games.
* **Advanced Progress Tracking:** Detailed analytics and visualizations for user progress.
* **Community Features:** Leaderboards, forums, or study groups.
* **Content Management System:** For managing skills, lessons, and other educational content.
* **Mobile Applications:** Native or PWA versions for mobile devices.
* **Comprehensive Skill Library:** Expand the range of skills offered.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information. (Note: You would need to add a LICENSE file).

## 🙏 Acknowledgements

* [Next.js Team](https://nextjs.org/)
* [Tailwind CSS Team](https://tailwindcss.com/)
* [Lucide Icons](https://lucide.dev/)
* Contributors & Inspirations

---

Happy Learning with MENTOR AI! ✨