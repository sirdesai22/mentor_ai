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
                              "type": "code",
                              "title": "Variables in Python: A Hands-On Approach",
                              "content": "<html class='bg-gray-100'><body class='font-sans antialiased'><div class='container mx-auto p-4'><h1 class='text-2xl font-bold mb-4'>Understanding Variables in Python</h1><p class='mb-4'>Variables are fundamental building blocks in Python. They are like named storage locations that hold values. Let's explore how to work with them through practical examples.</p><h2 class='text-xl font-semibold mb-2'>Declaring and Assigning Variables</h2><p class='mb-4'>In Python, you don't need to explicitly declare the type of a variable. You simply assign a value to a name, and Python infers the type.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'># Assigning an integer\nage = 30\nprint(f\"Age: {age}, Type: {type(age)}\")\n\n# Assigning a string\nname = \"Alice\"\nprint(f\"Name: {name}, Type: {type(name)}\")\n\n# Assigning a float\nprice = 29.99\nprint(f\"Price: {price}, Type: {type(price)}\")\n\n# Assigning a boolean\nis_active = True\nprint(f\"Is Active: {is_active}, Type: {type(is_active)}\")</code></pre><h2 class='text-xl font-semibold mb-2'>Variable Naming Rules</h2><ul class='list-disc list-inside mb-4'><li>Variable names must start with a letter or an underscore.</li><li>They can contain letters, numbers, and underscores.</li><li>They are case-sensitive (<code>myVar</code> is different from <code>myvar</code>).</li><li>Avoid using Python keywords (e.g., <code>class</code>, <code>def</code>, <code>if</code>) as variable names.</li></ul><h2 class='text-xl font-semibold mb-2'>Reassigning Variables</h2><p class='mb-4'>You can change the value and even the type of a variable after it has been assigned.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'>x = 10\nprint(f\"x: {x}, Type: {type(x)}\")\n\nx = \"Hello\"\nprint(f\"x: {x}, Type: {type(x)}\")</code></pre><h2 class='text-xl font-semibold mb-2'>Project: Simple Input and Output</h2><p class='mb-4'>Let's create a small program that takes input from the user and displays it.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'>name = input(\"Enter your name: \")\nage = input(\"Enter your age: \")\n\nprint(f\"Hello, {name}! You are {age} years old.\")</code></pre><p class='mb-4'>Save this code in a file named <code>input_output.py</code> and run it from your terminal using <code>python input_output.py</code>.</p></div></body></html>",
                              "resources": "https://realpython.com/python-variables/",
                              "estimatedTime": "1 hour",
                              "practiceProjects": [
                                "Create a program that calculates the area of a rectangle. Take the length and width as input from the user and store them in variables.",
                                "Write a script that converts Celsius to Fahrenheit. Take the Celsius value as input and store it in a variable before performing the conversion.",
                                "Build a simple mad lib game. Ask the user for different words (noun, verb, adjective, etc.) and store them in variables. Then, insert these words into a predefined story template."
                              ],
                              "keyPoints": [
                                "Variables are used to store data in Python.",
                                "Python is dynamically typed, so you don't need to declare variable types.",
                                "Variable names must follow specific rules.",
                                "You can reassign variables with new values and types.",
                                "Use descriptive variable names for better code readability."
                              ]
                            },
                            {
                              "type": "code",
                              "title": "Dynamic Typing in Python: Flexibility and Power",
                              "content": "<html class='bg-gray-100'><body class='font-sans antialiased'><div class='container mx-auto p-4'><h1 class='text-2xl font-bold mb-4'>Understanding Dynamic Typing in Python</h1><p class='mb-4'>Python is a dynamically typed language, meaning the type of a variable is checked during runtime, not compile time. This provides great flexibility but also requires careful attention to type-related errors.</p><h2 class='text-xl font-semibold mb-2'>What is Dynamic Typing?</h2><p class='mb-4'>In dynamically typed languages, you don't need to declare the type of a variable explicitly. The interpreter infers the type based on the value assigned to it.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'># Assigning an integer\nx = 5\nprint(f\"x: {x}, Type: {type(x)}\")\n\n# Reassigning x to a string\nx = \"Hello\"\nprint(f\"x: {x}, Type: {type(x)}\")</code></pre><h2 class='text-xl font-semibold mb-2'>Benefits of Dynamic Typing</h2><ul class='list-disc list-inside mb-4'><li>Faster development: Less code is required for type declarations.</li><li>Flexibility: Variables can hold values of different types at different times.</li><li>Easier to learn: Simpler syntax for beginners.</li></ul><h2 class='text-xl font-semibold mb-2'>Considerations and Potential Pitfalls</h2><ul class='list-disc list-inside mb-4'><li>Runtime errors: Type-related errors are only detected during runtime.</li><li>Code readability: Can sometimes make it harder to understand the intended type of a variable.</li></ul><h2 class='text-xl font-semibold mb-2'>Project: Mixed Data Type List</h2><p class='mb-4'>Let's create a list containing elements of different data types and process them.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'>mixed_list = [1, \"Hello\", 3.14, True]\n\nfor item in mixed_list:\n    print(f\"Item: {item}, Type: {type(item)}\")\n\n# Example: Attempting to add elements\nsum_of_numbers = 0\nfor item in mixed_list:\n    if type(item) == int or type(item) == float:\n        sum_of_numbers += item\n\nprint(f\"Sum of numbers in the list: {sum_of_numbers}\")</code></pre><p class='mb-4'>Save this code in a file named <code>dynamic_typing.py</code> and run it from your terminal using <code>python dynamic_typing.py</code>.</p></div></body></html>",
                              "resources": "https://www.youtube.com/watch?v=S46_sFj7mY4",
                              "estimatedTime": "1.5 hours",
                              "practiceProjects": [
                                "Create a program that takes user input and stores it in a list. Allow the user to enter different types of data (strings, numbers, booleans).",
                                "Write a function that can handle different data types as input. For example, if it receives a number, it should square it; if it receives a string, it should reverse it.",
                                "Build a simple calculator that can perform operations on both integers and floats. Ensure that the program handles potential type errors gracefully."
                              ],
                              "keyPoints": [
                                "Python is dynamically typed, meaning type checking occurs at runtime.",
                                "You don't need to declare variable types explicitly.",
                                "Dynamic typing provides flexibility but can lead to runtime errors.",
                                "Be mindful of potential type-related errors when working with different data types.",
                                "Use `type()` to check the type of a variable during runtime."
                              ]
                            },
                            {
                              "type": "code",
                              "title": "Defining Functions in Python: Reusable Code Blocks",
                              "content": "<html class='bg-gray-100'><body class='font-sans antialiased'><div class='container mx-auto p-4'><h1 class='text-2xl font-bold mb-4'>Defining Functions in Python</h1><p class='mb-4'>Functions are essential for creating reusable and organized code. They allow you to encapsulate a block of code and execute it multiple times with different inputs.</p><h2 class='text-xl font-semibold mb-2'>Basic Function Definition</h2><p class='mb-4'>A function is defined using the <code>def</code> keyword, followed by the function name, parentheses <code>()</code>, and a colon <code>:</code>.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'>def greet():\n    print(\"Hello, world!\")\n\n# Calling the function\ngreet()</code></pre><h2 class='text-xl font-semibold mb-2'>Functions with Parameters</h2><p class='mb-4'>Functions can accept parameters, which are variables that receive input values when the function is called.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'>def greet_name(name):\n    print(f\"Hello, {name}!\")\n\n# Calling the function with an argument\ngreet_name(\"Alice\")</code></pre><h2 class='text-xl font-semibold mb-2'>Functions with Return Values</h2><p class='mb-4'>Functions can return values using the <code>return</code> statement.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'>def add(x, y):\n    return x + y\n\n# Calling the function and storing the result\nresult = add(5, 3)\nprint(f\"Result: {result}\")</code></pre><h2 class='text-xl font-semibold mb-2'>Project: Simple Calculator Functions</h2><p class='mb-4'>Let's create functions for basic arithmetic operations and use them in a simple calculator program.</p><pre><code class='language-python block bg-gray-800 text-white p-4 rounded-md'>def add(x, y):\n    return x + y\n\ndef subtract(x, y):\n    return x - y\n\ndef multiply(x, y):\n    return x * y\n\ndef divide(x, y):\n    if y == 0:\n        return \"Error: Division by zero\"\n    return x / y\n\n# Taking input from the user\nnum1 = float(input(\"Enter the first number: \"))\nnum2 = float(input(\"Enter the second number: \"))\noperation = input(\"Enter the operation (+, -, *, /): \")\n\n# Performing the calculation\nif operation == '+':\n    result = add(num1, num2)\nelif operation == '-':\n    result = subtract(num1, num2)\nelif operation == '*':\n    result = multiply(num1, num2)\nelif operation == '/':\n    result = divide(num1, num2)\nelse:\n    result = \"Invalid operation\"\n\nprint(f\"Result: {result}\")</code></pre><p class='mb-4'>Save this code in a file named <code>calculator_functions.py</code> and run it from your terminal using <code>python calculator_functions.py</code>.</p></div></body></html>",
                              "resources": "https://www.youtube.com/watch?v=9Os0o3wzS_I",
                              "estimatedTime": "2 hours",
                              "practiceProjects": [
                                "Create a function that calculates the factorial of a number.",
                                "Write a function that checks if a given number is prime.",
                                "Build a simple game where the user guesses a random number. Use functions to generate the random number, take user input, and check if the guess is correct."
                              ],
                              "keyPoints": [
                                "Functions are defined using the `def` keyword.",
                                "Functions can accept parameters as input.",
                                "Functions can return values using the `return` statement.",
                                "Functions help in organizing and reusing code.",
                                "Use descriptive function names for better code readability."
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