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
content-block-generator/
├── backend/
│ ├── schemas/
│ │ └── contentSchema.js # Zod validation schema
│ ├── routes/
│ │ ├── generate.js # Generate endpoint (Phase 3)
│ │ └── edit.js # Edit endpoint (Phase 5)
│ ├── index.js # Express server
│ ├── .env # Environment variables
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── InputForm.jsx # Business description input
│ │ │ ├── ContentRenderer.jsx # Main renderer
│ │ │ ├── HeroBlock.jsx # Hero section
│ │ │ ├── FeaturesBlock.jsx # Features section
│ │ │ ├── FooterBlock.jsx # Footer section
│ │ │ ├── EditForm.jsx # Follow-up instruction form
│ │ │ └── ErrorAlert.jsx # Error display
│ │ ├── App.jsx # Main app component
│ │ ├── main.jsx # Entry point
│ │ └── index.css # Global styles
│ ├── vite.config.js
│ └── package.json
├── README.md
└── .gitignore


## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Google Gemini API Key (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/content-block-generator.git
cd content-block-generator
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Add your GEMINI_API_KEY to .env
npm run dev
```

3. **Frontend Setup** (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173/
- Backend: http://localhost:5001/api/health

## 📝 API Endpoints

### Generate Content
**POST** `/api/generate`

Request:
```json
{
  "businessDescription": "A cozy neighborhood coffee shop"
}
```

Response:
```json
{
  "success": true,
  "content": {
    "blocks": [
      {
        "type": "Hero",
        "heading": "...",
        "subheading": "..."
      },
      ...
    ]
  }
}
```

### Edit Content (Coming in Phase 5)
**POST** `/api/edit`

## 🔄 Implementation Phases

- [x] **Phase 1**: Setup & Skeleton
- [x] **Phase 2**: Zod Schema & Validation
- [x] **Phase 3**: LLM Integration (Generate Endpoint)
- [ ] **Phase 4**: Frontend Components
- [ ] **Phase 5**: Edit Endpoint & Functionality
- [ ] **Phase 6**: Deployment
- [ ] **Phase 7**: Documentation

## 🎯 Key Implementation Details

### Prompt Engineering
The system prompt guides Gemini to:
- Return only valid JSON (no markdown)
- Follow exact schema structure
- Generate 2-4 features
- Always start with Hero, end with Footer

### Schema Validation
All LLM responses are validated using Zod to ensure:
- Correct block types
- Required fields present
- String length constraints
- Array size limits

### Error Handling
- Retry logic for failed generations
- 15-second timeout for API calls
- Graceful error messages to frontend
- Development debug mode

## 📊 Current Status

**Completed:**
- Backend API with Gemini integration
- Zod schema and validation
- Error handling and retries
- Response formatting and testing

**In Progress:**
- Frontend UI components
- Content rendering and editing

**TODO:**
- Edit/refinement endpoint
- Deployment (Vercel/Render)
- Production README with live URL

## 🤖 How It Works

1. **User Input** → Business description (e.g., "cozy coffee shop")
2. **Prompt Engineering** → System prompt guides Gemini
3. **LLM Call** → Gemini generates JSON response
4. **JSON Extraction** → Parse JSON from response text
5. **Schema Validation** → Zod validates against ContentBlockSchema
6. **Retry Logic** → If validation fails, retry with correction
7. **Response** → Return validated JSON to frontend
8. **Rendering** → React components render the blocks
9. **Editing** → User provides follow-up instruction
10. **Re-generation** → Only specified block is regenerated

## ⚙️ Assumptions

- Google Gemini API key is available (free tier)
- Backend runs on port 5001 (configurable via .env)
- Frontend proxies API calls to backend
- LLM responses follow structured prompt format
- Users provide clear, concise business descriptions

## 🔄 Trade-offs

- **LLM Consistency**: Even with validation, LLM can hallucinate. Retry logic helps but isn't 100% reliable.
- **Feature Count**: Limited to 2-4 features for simplicity. Could be expanded.
- **Styling**: Basic Tailwind styling for MVP. Could use more design system.
- **State Management**: Using React hooks instead of Redux for simplicity.
- **Error Recovery**: Retries are limited to 2 attempts to avoid excessive API calls.

## 🚀 Future Improvements

1. **Edit Endpoint** → Refine individual blocks without full regeneration
2. **Preview/Publish** → Download as HTML or deploy landing page
3. **Template Library** → Choose different templates/layouts
4. **Analytics** → Track generated pages and user interactions
5. **Multi-language** → Generate content in different languages
6. **Custom Styling** → Color schemes, fonts, layouts
7. **A/B Testing** → Compare multiple generations
8. **Database** → Save user history and preferences

## 📝 Development Notes

### Testing Endpoints
```bash
# Test API key
node backend/test-api.js

# Test schema validation
node backend/test-schema.js

# Test generate endpoint
node backend/test-generate.js
```

### Environment Variables
```env
PORT=5001
GEMINI_API_KEY=your_api_key_here
NODE_ENV=development
```

### Common Issues
- **API Key not found**: Make sure `.env` is in backend/ folder
- **Port already in use**: Change PORT in .env
- **CORS errors**: Check vite.config.js proxy configuration

## 📄 License

This project is created for internship evaluation purposes.

## 👨‍💻 Author

Darren - Computer Engineering Student, MERN Stack Developer

---

**Last Updated**: September 2026
**Current Phase**: Phase 3 Complete, Phase 4 In Progress

## 🎯 Live Demo

- **🌐 Frontend (Live)**: https://frontend-sable-tau-56.vercel.app/
- **⚙️ Backend API (Live)**: https://content-block-generator-backend.onrender.com
- **📦 GitHub Repository**: https://github.com/Darren0411/content-block-generator.git
