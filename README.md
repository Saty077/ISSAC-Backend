ISSAC-AI

overview
This project is a full-stack AI chatbot application inspired by ChatGPT. It allows users to ask questions, receive intelligent responses, maintain a history of conversations in chronological order, resume existing threads, or start new chats. Built with modern web technologies, it's designed for seamless interaction and easy deployment.The project is split into two repositories for better modularity:
Backend Repository: Handles server logic, APIs, and AI integration.
Frontend Repository: Manages the user interface and client-side features.

Features
Real-time Q&A: Ask any question and get responses powered by OpenAI's GPT-4o mini.
Chat History: Threads stored chronologically; easily resume or start new.
User-Friendly Interface: Clean React-based UI for intuitive navigation.
Deployment-Ready: Tested on AWS EC2 with continuous deployment flow.

Technologies Used
Frontend: React.js (with hooks and state management)
Backend: Node.js, Express.js
Database: MongoDB (for storing chat histories)
APIs: RESTful endpoints for chat interactions; OpenAI API for AI responses
Deployment: AWS EC2 instance, PM2 for process management, Nginx for serving frontend, YAML configs for setup
Other: MERN stack overall

Prerequisites
Node.js (v22+)
MongoDB account/URI
OpenAI API key
AWS account (for deployment)

Deployment on AWS EC2
Launch EC2 instance (Ubuntu recommended).
SSH in and install deps: sudo apt update && sudo apt install nodejs npm nginx -y
Backend: Copy repo, install packages, create YAML (e.g., for PM2 ecosystem), run pm2 startup and pm2 save.
Backend plus point+: you also need to write code for you env backup in your YAML file even if you write separate .env in ec2, because when you push any change onto github, ec2 pull those changes by rerendering all the files from github, but in this process .env got overwritten(lost) and you have to create another.
Frontend: Build React app (npm run build), configure Nginx (/etc/nginx/sites-available/default) to serve build folder at root and paste server dns.
Expose ports (security groups: 80, 443, 5000), test, then monitor.

Note: Terminate instance when done to avoid charges—use for learning only.



