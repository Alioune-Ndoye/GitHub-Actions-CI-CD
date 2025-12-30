# Full-Stack CI/CD Pipeline with GitHub Actions

## Live Deployment
[View Application](https://github-actions-ci-cd-fs65.onrender.com)

## GitHub Gist:
<script src="https://gist.github.com/Alioune-Ndoye/a0f2d9961cae72365aa702cb834fce6e.js"></script>

## Overview
This repository integrates a **Continuous Integration (CI) and Continuous Deployment (CD) pipeline** using **GitHub Actions** to ensure code quality and automated deployments. The pipeline is designed for a **TypeScript-based full-stack application** and leverages **Cypress** for testing and **Render** for deployment.

## CI/CD Workflow
### **1. Pull Request to Develop Branch**
- When a **Pull Request (PR)** is created for the `develop` branch, a **GitHub Action** runs Cypress component tests to validate the integrity of the new code.
- If all tests pass, the results are displayed in GitHub Actions, allowing the PR to be merged.

### **2. Merge to Main Branch**
- Once the code is merged from `develop` to `main`, another **GitHub Action** is triggered.
- This action **automatically deploys** the latest version of the application to **Render**.

## GitHub Actions Workflow
The CI/CD pipeline is defined in **.github/workflows/** and consists of the following steps:

### **CI: Cypress Tests on Pull Request**
#### File: `.github/workflows/test.yml`
```yaml
name: CI - Cypress Tests

on:
  pull_request:
    branches:
      - develop

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install Dependencies
        run: npm install
      
      - name: Run Cypress Tests
        run: npm run test:ci
```

### **CD: Deploy to Render on Merge to Main**
#### File: `.github/workflows/deploy.yml`
```yaml
name: CD - Deploy to Render

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      
      - name: Deploy to Render
        env:
          RENDER_SERVICE_ID: ${{ secrets.RENDER_SERVICE_ID }}
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
        run: |
          curl -X POST "https://api.render.com/deploy/${{ secrets.RENDER_SERVICE_ID }}" \
          -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}" \
          -H "Content-Type: application/json" \
          --data '{}' 
```

## Project Setup
### **1. Install Dependencies**
```sh
npm install
```

### **2. Run Tests Locally**
```sh
npm run test:ci
```

### **3. Development Server**
```sh
npm run dev
```

## Deployment
This project deploys automatically when the `main` branch is updated. To manually trigger a deployment:
```sh
curl -X POST "https://api.render.com/deploy/YOUR_SERVICE_ID" \
  -H "Authorization: Bearer YOUR_RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  --data '{}'
```

## Environment Variables
Ensure the following environment variables are set in **GitHub Secrets**:
- `RENDER_SERVICE_ID`: The ID of the Render service.
- `RENDER_API_KEY`: API key for Render authentication.

## Summary
This repository follows best CI/CD practices by ensuring:
- Code is tested with Cypress before merging to `develop`.
- Deployments to **Render** are automated when changes are merged to `main`.
- GitHub Actions provides visibility into the test and deployment process.

By integrating this CI/CD
