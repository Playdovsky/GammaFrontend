# GammaFrontend

> 🚀 **Gamma Project** is a CI/CD sandbox built to explore, test, and master GitHub Actions pipelines.

This repository serves as the frontend user interface for the Gamma project (which is split into separate frontend and backend repositories). It provides an interactive dashboard where users can view, archive, and manage messages served by the backend API.

---

## 🎯 Project Goals & Case Study

The main objective of GammaFrontend is to complement the Gamma ecosystem by providing a production-ready, containerized Single Page Application (SPA) designed to integrate seamlessly into a complete CI/CD workflow.

Key learning milestones for this repository include:
- ⚡ **Modern Vue.js Ecosystem:** Building a responsive dashboard single-page application using **Vue 3** and modern component practices.
- 🍍 **State Management:** Managing global application state and user authentication using **Pinia**.
- 🌐 **API Integration:** Connecting to the backend service via **Axios** to handle message workflows (fetching, soft archiving, and deleting messages).
- 🐋 **Multi-Stage Docker Builds:** Optimizing image size by building static assets in Node.js and serving them with a lightweight **NGINX** container in production.
- 🔀 **Client & Proxy Routing:** Configuring NGINX for proper SPA routing and smooth frontend navigation.

---

## 🛠️ Tech Stack & Tooling

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Vue.js](https://vuejs.org/) | Progressive JavaScript framework for building the UI |
| **State Management** | [Pinia](https://pinia.vuejs.org/) | Intuitive, type-safe state management store for Vue |
| **HTTP Client** | [Axios](https://axios-http.com/) | Promise-based HTTP client for API requests |
| **Production Server** | [NGINX](https://www.nginx.com/) | High-performance web server serving built static assets |
| **Containerization** | [Docker](https://www.docker.com/) | Multi-stage production container build (Node.js + NGINX) |