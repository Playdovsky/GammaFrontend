# GammaFrontend

> 🚀 **Gamma Project** is a CI/CD sandbox built to explore, test, and master GitHub Actions pipelines.

This repository serves as the frontend user interface for the Gamma project (which is split into separate frontend and backend repositories). It provides an interactive dashboard where users can view, archive, and manage messages served by the backend API.

---

## 🎯 Project Goals & Case Study

The main objective of GammaFrontend is to complement the Gamma ecosystem by providing a production-ready, containerized Single Page Application (SPA) designed to integrate seamlessly into a complete CI/CD workflow using **GitHub Actions**.

Key learning milestones for this repository include:

* ⚡ **Modern Vue.js Ecosystem:** Building a responsive dashboard single-page application using Vue 3 and modern component practices.
* 🍍 **State Management:** Managing global application state and user authentication using Pinia.
* 🌐 **API Integration:** Connecting to the backend service via Axios to handle message workflows (fetching, soft archiving, and deleting messages).
* ⚙️ **Automated CI/CD Pipeline:** Implementing an end-to-end continuous integration and deployment pipeline using **GitHub Actions**.
* 🛡️ **Dependency Security:** Running dependency vulnerability scans with **npm audit**.
* 🧪 **Unit & Integration Testing:** Automating fast unit and integration tests using Vitest on every workflow run.
* 🧹 **Code Quality & Formatting:** Enforcing consistent code standards and detecting errors early with ESLint.
* 🐋 **Containerization:** Optimizing image size by building static assets in Node.js and serving them with a lightweight NGINX container via multi-stage Docker builds.
* 🔀 **Client & Proxy Routing:** Configuring NGINX for proper SPA routing and smooth frontend navigation.
* ☁️ **Cloud Deployment:** Automatically building and pushing Docker images to **Google Artifact Registry**, and deploying to **Google Cloud Run**.

---

## 🔄 CI/CD Pipeline Workflow

The repository utilizes **GitHub Actions** to automate the entire lifecycle from commit to production, mirroring the backend infrastructure:

1. 🔍 **Linting:** Code formatting and style enforcement using **ESLint**.
2. 🛡️ **Security Audit:** Scanning Node.js dependencies for known vulnerabilities via **npm audit**.
3. 🧪 **Testing:** Executing automated unit and integration tests using **Vitest**.
4. 🏗️ **Build & Package:** Executing a multi-stage Docker build (compiling static Node.js assets and packaging them into a lightweight NGINX server).
5. 📦 **Artifact Registry:** Authenticating with Google Cloud Platform and pushing the container image to **Google Artifact Registry**.
6. 🚀 **Cloud Run Deployment:** Automatically deploying the updated image as a serverless container service on **GCP Cloud Run**.

---

## 🛠️ Tech Stack & Tooling

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Vue.js](https://vuejs.org/) | Progressive JavaScript framework for building the UI |
| **State Management** | [Pinia](https://pinia.vuejs.org/) | Intuitive, type-safe state management store for Vue |
| **HTTP Client** | [Axios](https://axios-http.com/) | Promise-based HTTP client for API requests |
| **Testing Framework**| [Vitest](https://vitest.dev/) | Next-generation unit and integration test runner native to Vite |
| **Linter & Formatter** | [ESLint](https://eslint.org/) | Automated static code analysis and consistent code style enforcement |
| **Security Audit** | [npm audit](https://docs.npmjs.com/cli/v10/commands/npm-audit) | Vulnerability scanning for Node.js packages |
| **Production Server**| [NGINX](https://nginx.org/) | High-performance web server serving built static assets |
| **Containerization** | [Docker](https://www.docker.com/) | Multi-stage production container build (Node.js + NGINX) |
| **CI/CD Platform** | [GitHub Actions](https://github.com/features/actions) | Automated building, testing, and deployment workflows |
| **Container Registry**| [Google Artifact Registry](https://cloud.google.com/artifact-registry)| Management and storage for Docker container images |
| **Cloud Hosting** | [GCP Cloud Run](https://cloud.google.com/run) | Fully managed serverless container execution platform |
