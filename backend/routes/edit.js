import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { validateContent } from '../schemas/contentSchema.js';

dotenv.config();

const router = express.Router();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── Helper: Extract JSON from LLM response ──────────────────────────────

function extractJSON(text) {
  try {
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

// ─── Helper: Merge edited block with original content ────────────────────

function updateContentBlock(content, blockType, editedBlock) {
  return {
    ...content,
    blocks: content.blocks.map((block) =>
      block.type === blockType ? editedBlock : block
    ),
  };
}

// ─── POST /api/edit ───────────────────────────────────────────────────────

router.post('/', async (req, res) => {
  try {
    const { currentContent, blockType, editInstruction } = req.body;

    // Validate inputs
    if (!currentContent || !currentContent.blocks) {
      return res.status(400).json({
        success: false,
        error: 'currentContent with blocks is required',
      });
    }

    if (!blockType || !['Hero', 'Features', 'Footer'].includes(blockType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid blockType. Must be Hero, Features, or Footer',
      });
    }

    if (!editInstruction || editInstruction.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'editInstruction is required',
      });
    }

    // Find the block to edit
    const blockToEdit = currentContent.blocks.find((b) => b.type === blockType);
    if (!blockToEdit) {
      return res.status(400).json({
        success: false,
        error: `${blockType} block not found in content`,
      });
    }

    // Generate edit prompt based on block type
    const editPrompts = {
      Hero: `Edit this Hero block based on the instruction: "${editInstruction}"

Current Hero block:
${JSON.stringify(blockToEdit, null, 2)}

Return ONLY the updated Hero block as valid JSON with fields: type, heading, subheading.
Keep subheading optional. Maintain the same structure.`,

      Features: `Edit this Features block based on the instruction: "${editInstruction}"

Current Features block:
${JSON.stringify(blockToEdit, null, 2)}

Return ONLY the updated Features block as valid JSON with fields: type, items.
Items must have: title, description. Keep 2-4 items. Maintain the same structure.`,

      Footer: `Edit this Footer block based on the instruction: "${editInstruction}"

Current Footer block:
${JSON.stringify(blockToEdit, null, 2)}

Return ONLY the updated Footer block as valid JSON with fields: type, text.`,
    };

    const editPrompt = editPrompts[blockType];

    // Call Gemini
    const response = await callGemini(editPrompt);

    // Extract JSON
    const editedBlockJSON = extractJSON(response);

    // Validate the edited block
    const updatedContent = updateContentBlock(
      currentContent,
      blockType,
      editedBlockJSON
    );

    const validation = validateContent(updatedContent);

    if (!validation.success) {
      return res.status(422).json({
        success: false,
        error: 'Edited content did not match expected format',
        details: validation.error,
      });
    }

    res.json({
      success: true,
      content: validation.data,
    });
  } catch (error) {
    console.error('Edit endpoint error:', error);

    let statusCode = 500;
    let errorMessage = 'Failed to edit content';

    if (error.message.includes('timed out')) {
      statusCode = 504;
      errorMessage = 'Request timed out. Please try again.';
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