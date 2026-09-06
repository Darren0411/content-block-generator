# Content Block Generator

An AI-powered web application that generates landing pages from business descriptions using Google Gemini API.

## 📋 Project Overview

This project demonstrates **Generative AI development best practices** including:
- Structured output handling with LLMs
- Schema validation (Zod)
- Error handling and retries
- Prompt engineering for consistent JSON responses
- Full-stack development with React + Express

## 🚀 Features

- **Generate**: Input a business description → Get a structured landing page
- **Validate**: All LLM responses validated against Zod schema
- **Edit**: Refine generated content with follow-up instructions
- **Error Handling**: Graceful fallbacks for malformed LLM responses
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **LLM API**: Google Gemini (via @google/genai)
- **Validation**: Zod
- **CORS**: Enabled for frontend communication

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **HTTP Client**: Axios

## 📦 Project Structure