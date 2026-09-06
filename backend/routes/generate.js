import express from 'express';
import { GoogleGenAI } from '@google/genai';
import { validateContent } from '../schemas/contentSchema.js';
import dotenv from 'dotenv';    
dotenv.config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── Helper: Extract JSON from LLM response ──────────────────────────────

function extractJSON(text) {
  try {
    // Try to find JSON object in response
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('No JSON object found in response');
    }
    return JSON.parse(match[0]);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
}

// ─── Helper: Call Gemini with timeout ────────────────────────────────────

async function callGemini(prompt) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Gemini request timed out (15s)')), 15000)
  );

  const geminiPromise = ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: prompt,
  });

  try {
    const response = await Promise.race([geminiPromise, timeoutPromise]);
    return response.text;
  } catch (error) {
    throw error;
  }
}

// ─── Helper: Retry logic for failed validation ───────────────────────────

async function generateWithRetry(businessDescription, maxRetries = 2) {
  let lastError = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const systemPrompt = `You are an expert landing page designer. Generate structured JSON for a business webpage.

STRICT REQUIREMENTS:
1. Return ONLY valid JSON, no markdown, no explanations
2. Structure MUST match this format exactly:
{
  "blocks": [
    {
      "type": "Hero",
      "heading": "...",
      "subheading": "..."
    },
    {
      "type": "Features",
      "items": [
        {"title": "...", "description": "..."},
        {"title": "...", "description": "..."},
        {"title": "...", "description": "..."}
      ]
    },
    {
      "type": "Footer",
      "text": "..."
    }
  ]
}

RULES:
- Hero: Must have heading (required), subheading (optional)
- Features: Must have 2-4 items, each with title and description
- Footer: Must have text
- Always start with Hero, end with Footer
- No extra fields or blocks
- All strings must be under their character limits`;

      const userPrompt = `Create a landing page for: "${businessDescription}"

Generate ONLY the JSON object, nothing else.`;

      // Call Gemini
      const response = await callGemini(
        systemPrompt + '\n\nUser: ' + userPrompt
      );

      // Extract JSON from response
      const jsonData = extractJSON(response);

      // Validate with Zod
      const validation = validateContent(jsonData);

      if (!validation.success) {
        lastError = {
          step: 'validation',
          errors: validation.error,
          raw: validation.raw,
        };

        // Retry with correction prompt on last attempt
        if (attempt === maxRetries) {
          throw new Error(
            `Validation failed after ${maxRetries + 1} attempts. ` +
            `Errors: ${JSON.stringify(validation.error)}`
          );
        }
        continue;
      }

      // Success!
      return validation.data;
    } catch (error) {
      lastError = {
        step: attempt === maxRetries ? 'final' : 'retry',
        message: error.message,
      };

      if (attempt === maxRetries) {
        throw error;
      }

      // Small delay before retry
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw lastError;
}

// ─── POST /api/generate ──────────────────────────────────────────────────

router.post('/', async (req, res) => {
  try {
    const { businessDescription } = req.body;

    // Validate input
    if (!businessDescription || businessDescription.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'businessDescription is required',
      });
    }

    if (businessDescription.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'businessDescription must be under 500 characters',
      });
    }

    // Generate content with retry logic
    const generatedContent = await generateWithRetry(businessDescription);

    res.json({
      success: true,
      content: generatedContent,
    });
  } catch (error) {
    console.error('Generate endpoint error:', error);

    // Determine error type and send appropriate response
    let statusCode = 500;
    let errorMessage = 'Failed to generate content';

    if (error.message.includes('timed out')) {
      statusCode = 504;
      errorMessage = 'Request timed out. Please try again.';
    } else if (error.message.includes('Validation failed')) {
      statusCode = 422;
      errorMessage =
        'Generated content did not match expected format. Please try again.';
    } else if (error.message.includes('No JSON')) {
      statusCode = 422;
      errorMessage = 'LLM did not return valid JSON. Please try again.';
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export default router;