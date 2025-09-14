# 🎓 Mentor AI – Your Personal AI-Powered Learning Mentor

Mentor AI is an AI-powered educational platform that helps you learn anything—customized just for you. Whether you want to master a programming language, understand complex topics, or explore something new, Mentor AI generates a personalized roadmap based on your **goals**, **learning style**, and **available time**.

---

## ✨ Features

- ✅ **Personalized Learning Path**  
  Generates a custom roadmap tailored to your skill level, goals, and preferred learning style (videos, articles, practice-based).

- 🧠 **AI-Generated Content**  
  Lessons, summaries, quizzes, and examples are generated using Gen AI in real time.

- 🤖 **In-Browser AI Chat**  
  Powered by WebLLM with TinyLlama model running directly in your browser - no external API calls needed for instant AI assistance.

- 💬 **Real-Time AI Instructor**  
  Get instant, contextual help with 200-word focused responses during your learning sessions.

- 🔗 **Smart Resource Mapping**  
  Links every topic to handpicked YouTube videos, blogs, documentation, and MOOC platforms.

- 📆 **Google Calendar Integration**  
  Auto-schedules your roadmap into your calendar based on the hours you can give per day.

- 🧩 **Gamified Learning Dashboard**  
  Track your progress with levels, XP, streaks, and a motivational progress system.

- 📚 **Multi-Topic Support**  
  Learn multiple skills at once with individual roadmaps, tasks, and progress indicators.

---

## 🚀 How It Works

1. **Login/Register** via email or Google.
2. **Pick a Topic** you want to learn (e.g., Web Development, Machine Learning).
3. **Answer a Few Questions** about your current level, goals, learning style, and available time.
4. **Get Your Roadmap** with tasks broken down into Levels → Subtopics → Microtasks.
5. **Start Learning!** Use AI-generated tasks, complete quizzes, explore mapped resources, and chat with your AI instructor.
6. **Get Instant Help** with the in-browser AI chat that provides focused, 200-word responses without any external API calls.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **UI Components**: Tailwind CSS with Lucide React icons
- **Database**: Drizzle ORM with PostgreSQL
- **AI Integration**: 
  - **WebLLM**: In-browser AI with TinyLlama-1.1B model
  - **MLC Engine**: Local model execution for privacy
- **Authentication**: NextAuth.js and Clerk
- **State Management**: Zustand stores
- **Deployment**: Vercel

---

## 📸 Screenshots

![Dashboard Screenshot](./public/ss1.png)

![Dashboard Screenshot](./public/ss2.png)

![Dashboard Screenshot](./public/ss3.png)

![Dashboard Screenshot](./public/ss4.png)

---

## 🤖 WebLLM Integration

Mentor AI leverages **WebLLM** to bring AI capabilities directly to your browser:

- **Local Processing**: AI runs entirely in your browser using the TinyLlama-1.1B model
- **No API Costs**: Zero external API calls means no usage fees or rate limits
- **Privacy First**: Your questions and data never leave your device
- **Instant Responses**: No network latency - get immediate AI assistance
- **Offline Capable**: Works even without internet connection once the model is loaded
- **Focused Responses**: AI provides concise, 200-word responses perfect for learning

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/sirdesai22/mentor_ai.git
cd mentor_ai

# Install dependencies
npm install

# Run the app
npm run dev
