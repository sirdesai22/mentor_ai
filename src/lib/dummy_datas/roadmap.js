export const dummy_roadmap = {
  "topic": "Machine Learning",
  "description": "A gamified roadmap to master intermediate to advanced Machine Learning, with practical projects and theory.",
  "levels": [
    {
      "level": 1,
      "isCompleted": false,
      "title": "ML Foundations",
      "description": "Start from the basics of ML and understand the core concepts.",
      "subtopics": [
        {
          "name": "What is Machine Learning?",
          "isCompleted": false,
          "tasks": [
            {
              "type": "video",
              "title": "Intro to Machine Learning",
              "url": "https://www.youtube.com/watch?v=GwIo3gDZCVQ"
            },
            {
              "type": "quiz",
              "title": "ML Basics Quiz"
            }
          ]
        },
        {
          "name": "Types of ML",
          "isCompleted": false,
          "tasks": [
            {
              "type": "article",
              "title": "Supervised vs Unsupervised Learning",
              "url": "https://towardsdatascience.com/types-of-machine-learning-f7c7f1f1e384"
            },
            {
              "type": "quiz",
              "title": "Classify the ML Types"
            }
          ]
        },
        {
          "name": "Python & Libraries",
          "isCompleted": false,
          "tasks": [
            {
              "type": "code",
              "title": "Install and use Pandas, Numpy, Matplotlib, Scikit-learn"
            },
            {
              "type": "practice",
              "title": "Read and explore a dataset with Pandas"
            }
          ]
        }
      ]
    },
    {
      "level": 2,
      "isCompleted": false,
      "title": "Model Building Essentials",
      "description": "Learn how to build and evaluate ML models.",
      "subtopics": [
        {
          "name": "Data Splitting",
          "isCompleted": false,
          "tasks": [
            {
              "type": "video",
              "title": "Train/Test Split Explained",
              "url": "https://www.youtube.com/watch?v=GbzM3JcQ2Uw"
            },
            {
              "type": "practice",
              "title": "Use train_test_split on a dataset"
            }
          ]
        },
        {
          "name": "Model Training",
          "isCompleted": false,
          "tasks": [
            {
              "type": "code",
              "title": "Train a LinearRegression and RandomForestClassifier"
            },
            {
              "type": "practice",
              "title": "Train models on Titanic or Telco dataset"
            }
          ]
        },
        {
          "name": "Making Predictions",
          "isCompleted": false,
          "tasks": [
            {
              "type": "code",
              "title": "Use .predict() and evaluate with accuracy_score"
            },
            {
              "type": "quiz",
              "title": "Prediction & Accuracy Quiz"
            }
          ]
        }
      ]
    },
    {
      "level": 3,
      "isCompleted": false,
      "title": "Feature Engineering & Preprocessing",
      "description": "Master the art of preparing data for ML models.",
      "subtopics": [
        {
          "name": "Feature Scaling & Normalization",
          "isCompleted": false,
          "tasks": [
            {
              "type": "video",
              "title": "Feature Scaling Explained",
              "url": "https://www.youtube.com/watch?v=9yl6-HEY7_s"
            },
            {
              "type": "practice",
              "title": "Apply StandardScaler and MinMaxScaler on a dataset"
            }
          ]
        },
        {
          "name": "Categorical Encoding",
          "isCompleted": false,
          "tasks": [
            {
              "type": "article",
              "title": "One-Hot vs Label Encoding",
              "url": "https://scikit-learn.org/stable/modules/preprocessing.html"
            },
            {
              "type": "code",
              "title": "Preprocess a Telco dataset with get_dummies and LabelEncoder"
            }
          ]
        }
      ]
    },
    {
      "level": 4,
      "isCompleted": false,
      "title": "Model Evaluation & Tuning",
      "description": "Understand how to properly evaluate and tune models.",
      "subtopics": [
        {
          "name": "Cross-Validation",
          "isCompleted": false,
          "tasks": [
            {
              "type": "video",
              "title": "K-Fold Cross-Validation",
              "url": "https://www.youtube.com/watch?v=TIgfjmp-4BA"
            },
            {
              "type": "practice",
              "title": "Use cross_val_score to evaluate a model"
            }
          ]
        },
        {
          "name": "Hyperparameter Tuning",
          "isCompleted": false,
          "tasks": [
            {
              "type": "article",
              "title": "Grid Search vs Random Search",
              "url": "https://scikit-learn.org/stable/modules/grid_search.html"
            },
            {
              "type": "practice",
              "title": "Tune a RandomForestClassifier with GridSearchCV"
            }
          ]
        }
      ]
    },
    {
      "level": 5,
      "isCompleted": false,
      "title": "Unsupervised Learning",
      "description": "Explore clustering and dimensionality reduction techniques.",
      "subtopics": [
        {
          "name": "KMeans Clustering",
          "isCompleted": false,
          "tasks": [
            {
              "type": "video",
              "title": "KMeans Intuition",
              "url": "https://www.youtube.com/watch?v=4b5d3muPQmA"
            },
            {
              "type": "practice",
              "title": "Cluster customers using KMeans"
            }
          ]
        },
        {
          "name": "PCA (Dimensionality Reduction)",
          "isCompleted": false,
          "tasks": [
            {
              "type": "article",
              "title": "PCA explained with visuals",
              "url": "https://towardsdatascience.com/a-one-stop-shop-for-principal-component-analysis-5582fb7e0a9c"
            },
            {
              "type": "code",
              "title": "Visualize a dataset using PCA"
            }
          ]
        }
      ]
    },
    {
      "level": 6,
      "isCompleted": false,
      "title": "NLP with Scikit-learn",
      "description": "Start working with text data.",
      "subtopics": [
        {
          "name": "Text Preprocessing",
          "isCompleted": false,
          "tasks": [
            {
              "type": "code",
              "title": "Clean and vectorize text using CountVectorizer/TfidfVectorizer"
            }
          ]
        },
        {
          "name": "Text Classification",
          "isCompleted": false,
          "tasks": [
            {
              "type": "practice",
              "title": "Build a spam classifier using Naive Bayes"
            }
          ]
        }
      ]
    },
    {
      "level": 7,
      "isCompleted": false,
      "title": "Model Deployment",
      "description": "Make your ML models available to the world.",
      "subtopics": [
        {
          "name": "Prediction APIs with Flask",
          "isCompleted": false,
          "tasks": [
            {
              "type": "video",
              "title": "Deploying ML model with Flask",
              "url": "https://www.youtube.com/watch?v=UbCBe44ZVPI"
            },
            {
              "type": "code",
              "title": "Deploy a model using Flask and joblib"
            }
          ]
        },
        {
          "name": "Hosting on Render/Railway",
          "isCompleted": false,
          "tasks": [
            {
              "type": "practice",
              "title": "Host your Flask model app online"
            }
          ]
        }
      ]
    }
  ],
  "completion_rewards": {
    "badge": "ML Intermediate Pro",
    "level_up_message": "You're now skilled in building & deploying ML models!",
    "final_certificate": true
  }
}
