export const dummy_roadmap = {
    "topic": "Web Development",
    "description": "A gamified roadmap to learn full-stack web development from scratch.",
    "levels": [
      {
        "level": 0,
        "isCompleted": false,
        "title": "Getting Started",
        "description": "Learn the basics of how the web works.",
        "subtopics": [
          {
            "name": "What is the Internet?",
            "tasks": [
              {
                "type": "video",
                "title": "How the Internet Works",
                "url": "https://example.com/video"
              },
              {
                "type": "quiz",
                "title": "Basics of Internet Quiz"
              }
            ]
          },
          {
            "name": "HTTP & Browsers",
            "tasks": [
              {
                "type": "article",
                "title": "Intro to HTTP",
                "url": "https://example.com/article"
              }
            ]
          }
        ]
      },
      {
        "level": 1,
        "isCompleted": false,
        "title": "Frontend Foundations",
        "description": "Dive into HTML, CSS, and basic JavaScript.",
        "subtopics": [
          {
            "name": "HTML Basics",
            "tasks": [
              {
                "type": "code",
                "title": "Build your first HTML page"
              }
            ]
          },
          {
            "name": "CSS Styling",
            "tasks": [
              {
                "type": "video",
                "title": "CSS Crash Course"
              },
              {
                "type": "practice",
                "title": "Style a personal blog"
              }
            ]
          }
        ]
      },
      {
        "level": 2,
        "isCompleted": false,
        "title": "React Basics",
        "description": "Learn the basics of React.",
        "subtopics": [
          {
            "name": "React Introduction",
            "tasks": [
              {
                "type": "code",
                "title": "Build your first React app"
              }
            ]
          },
          {
            "name": "React Components",
            "tasks": [
              {
                "type": "video",
                "title": "React Components"
              },
              {
                "type": "practice",
                "title": "Create a simple component"
              }
            ]
          }
        ]
      }
    ],
    "completion_rewards": {
      "badge": "Web Dev Explorer",
      "level_up_message": "Great job! You're now a Level 1 Developer!",
      "final_certificate": true
    }
  }
