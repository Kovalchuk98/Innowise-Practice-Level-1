# Innowise Lab Internship: Level 1: Clever to-do list 
##### Demo Link [https://kovalchuk98.github.io/Innowise-Practice-Level-1/](https://kovalchuk98.github.io/Innowise-Practice-Level-1/)

# Task
####  Task requirements [Link](https://markdownlivepreview.com/)

# How to run the app 

#### 1. Clone this repository
```
git clone https://github.com/Kovalchuk98/Innowise-Practice-Level-1.git
```
#### 2. Install all dependencies
```
npm install 
```
#### 3. Start
```
npm run serve 
```

# Database snapshot
```
└── tasks                           #Main node for DB
    └── user_id                     #User id node    
        └── date                    #Task date node  
            └── task_id             #Task id   
                 ├── title          #Task title
                 ├── descr          #Task description
                 ├── id             #Task id
                 └── completed      #Task status
```

# Application stack

- **Vue CLI** - Vue CLI is a full system for rapid Vue.js development.
- **Vuex** - State management pattern + library for Vue.js applications.
- **Vue-router** - The official router for Vue. js .
- **Firebase** - Google's mobile application development platform that helps you build, improve, and grow your app.
- **Vue-toastification** - Vue notifications made easy,Light, easy and beautiful toasts.

# Project structure
```
└── src                     #Source code folder
      ├── assets            #Images
      ├── components        #All components 
      ├── router            #Routes config file
      ├── store             #Store config files
      ├── views             #Pages for routes
      ├── firebase.js       #Firebase config file
      └── main.js           #Entry point 
```
