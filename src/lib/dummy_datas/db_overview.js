const dummy_skills =[
    {
        id: 1,
        name: "Machine Learning",
        description: "Machine Learning is a field of AI that focuses on building systems that learn from data.",
        userStyle: "I like to learn by doing projects",
        roadMap: [
            {
                level: 1,
                isCompleted: false,
                title: "Introduction to Machine Learning",
                description: "Learn the basics of machine learning",
                suggestedQuestions: [
                    "What is machine learning?",
                    "What is the difference between supervised and unsupervised learning?",
                    "What is the difference between classification and regression?",
                ],
                topics: [
                    {
                        id: 1,
                        name: "what is machine learning?",
                        isCompleted: false,
                        isGenerated: false,
                        subTopics: [
                            {
                                type: "code",
                                title: "Understanding Variables in Python",
                                content:  `
                                    <p class="mb-4">In Python, a <strong>variable</strong> serves as a named storage location in your computer's memory. Think of it as a labeled box where you can put and retrieve data. The beauty of variables lies in their ability to hold different values throughout the execution of a program.</p>
                                    <p class="mb-2"><strong>Key Concepts:</strong></p>
                                    <ul class="list-disc list-inside mb-4 pl-4 text-gray-300">
                                      <li><strong>Assignment:</strong> Variables are created the moment you assign a value to them using the equals sign (<code>=</code>).</li>
                                      <li><strong>Dynamic Typing:</strong> Python is smart! You don't need to explicitly declare the data type (like integer, text, etc.) of a variable. Python infers it based on the value you assign.</li>
                                      <li><strong>Naming Conventions:</strong> Choose descriptive names for your variables to make your code readable. While short names like <code>x</code> and <code>y</code> are acceptable in some cases, names like <code>user_age</code> or <code>product_name</code> clearly indicate the data they hold.</li>
                                    </ul>
                                    <p class="mb-2"><strong>Example:</strong></p>
                                    <pre class="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto"><code class="language-python">
                                    # Assigning different data types to variables
                                    age = 30             # Integer (whole number)
                                    full_name = "Alice Smith" # String (text)
                                    price = 99.99        # Float (decimal number)
                                    is_active = True     # Boolean (True or False)
                        
                                    print(age)
                                    print(full_name)
                                    print(price)
                                    print(is_active)
                                    </code></pre>
                                    <p className="mt-4">Experiment with assigning different values to these variables and running the code to observe the output!</p>
                                `,
                                resource: "https://www.geeksforgeeks.org/python-variables/",
                                estimatedTime: "15 mins",
                                practiceProjects: [
                                    "Create a simple linear regression model to predict the price of a house based on its features.",
                                    "Build a basic image classification model using a neural network.",
                                    "Implement a clustering algorithm to group customers based on their purchasing behavior."
                                ],
                                keyPoints: [
                                    "Variables are used to store data in a program.",
                                    "Variables can be of different types, such as integers, floats, strings, and booleans.",
                                    "Variables can be assigned values using the equals sign (=)."
                                ]
                            },
                            {
                                type: "article",
                                title: "Demystifying Machine Learning: An Introduction",
                                content: `<p><strong>Machine Learning (ML)</strong>, a fascinating subset of <strong>Artificial Intelligence (AI)</strong>, empowers computers to learn from data without explicit programming. Instead of being told exactly how to perform a task, ML algorithms identify patterns, make predictions, and improve their performance over time as they are exposed to more data.</p>
                                <p>Think of it like teaching a child to recognize a cat. You don't provide a rigid set of rules, but rather show them many examples of cats. Eventually, the child learns to identify cats on their own. ML works similarly, using algorithms to learn from vast amounts of data to perform tasks like image recognition, natural language processing, and recommendation systems.</p>
                                <p>This field is rapidly evolving and has become integral to various applications we use daily, from personalized recommendations on streaming services to fraud detection in online transactions.</p>`,
                                resource: "https://www.ibm.com/think/topics/machine-learning",
                                estimatedTime: "15 mins",
                                practiceProjects: [
                                    "Create a simple linear regression model to predict the price of a house based on its features.",
                                    "Build a basic image classification model using a neural network.",
                                    "Implement a clustering algorithm to group customers based on their purchasing behavior."
                                ],
                                keyPoints: [
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data."
                                ]   
                            },
                            {
                                type: "video",
                                title: "What is Machine Learning? A Visual Explanation",
                                content: `<p>This video provides a visual and intuitive explanation of the core concepts behind <strong>Machine Learning (ML)</strong>.<br/>  It breaks down how algorithms learn from data, the different types of machine learning (like supervised and unsupervised learning), and showcases real-world applications in an engaging manner.</p><br/>
                                <p>By watching this video, you'll gain a clearer understanding of how machines can learn to perform tasks autonomously, improve their accuracy with more data, and the exciting possibilities that machine learning unlocks across various industries.</p>`,
                                resource: "https://www.youtube.com/embed/PeMlggyqz0Y?si=Gy9xx-zPHyiOycph",
                                estimatedTime: "15 mins",
                                practiceProjects: [
                                    "Create a simple linear regression model to predict the price of a house based on its features.",
                                    "Build a basic image classification model using a neural network.",
                                    "Implement a clustering algorithm to group customers based on their purchasing behavior."
                                ],
                                keyPoints: [
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data."
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: "what is deep learning?",
                        isCompleted: false,
                        isGenerated: false,
                        subTopics: [
                            {
                                type: "video",
                                title: "Understanding Artificial Intelligence",
                                content: "This is a description",
                                resource: "https://www.youtube.com/watch?v=s_ht4AKn_Ms",
                                estimatedTime: "15 mins",
                                practiceProjects: [
                                    "Create a simple linear regression model to predict the price of a house based on its features.",
                                    "Build a basic image classification model using a neural network.",
                                    "Implement a clustering algorithm to group customers based on their purchasing behavior."
                                ],
                                keyPoints: [
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data."
                                ]
                            },
                            {
                                type: "article",
                                title: "Understanding DL",
                                content: "This is a description",
                                resource: "https://www.youtube.com/watch?v=s_ht4AKn_Ms",
                                estimatedTime: "15 mins",
                                practiceProjects: [
                                    "Create a simple linear regression model to predict the price of a house based on its features.",
                                    "Build a basic image classification model using a neural network.",
                                    "Implement a clustering algorithm to group customers based on their purchasing behavior."
                                ],
                                keyPoints: [
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data."
                                ]
                            },
                            {
                                type: "code",
                                title: "Simple Linear Regression",
                                content: "This is a description",
                                resource: "https://www.youtube.com/watch?v=s_ht4AKn_Ms",
                                estimatedTime: "15 mins",
                                practiceProjects: [
                                    "Create a simple linear regression model to predict the price of a house based on its features.",
                                    "Build a basic image classification model using a neural network.",
                                    "Implement a clustering algorithm to group customers based on their purchasing behavior."
                                ],
                                keyPoints: [
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data.",
                                    "Machine Learning is a field of AI that focuses on building systems that learn from data."
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                level: 2,
                isCompleted: false,
                title: "Introduction to Machine Learning",
                description: "Learn the basics of machine learning",
                suggestedQuestions: [
                    "What is machine learning?",
                    "What is the difference between supervised and unsupervised learning?",
                    "What is the difference between classification and regression?",
                ],
                topics: [
                    {
                        id: 1,
                        name: "what is machine learning?",
                        isCompleted: false,
                        isGenerated: false,
                        subTopics: [
                            {
                                type: "video",
                                title: "Understanding Variables in Python",
                                content: "This is a description",
                                resource: "https://www.youtube.com/watch?v=s_ht4AKn_Ms",
                                estimatedTime: "15 mins",
                            },
                        ]
                    },
                    {
                        id: 2,
                        name: "what is deep learning?",
                        isCompleted: false,
                        isGenerated: false,
                        subTopics: [
                            {
                                type: "article",
                                title: "Understanding DL",
                                content: "This is a description",
                                resource: "https://www.youtube.com/watch?v=s_ht4AKn_Ms",
                                estimatedTime: "15 mins",
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export default dummy_skills;