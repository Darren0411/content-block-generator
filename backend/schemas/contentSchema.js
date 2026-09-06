import { z } from 'zod';

// ─── Individual Block Schemas ──────────────────────────────────────────────

const HeroBlockSchema = z.object({
  type: z.literal('Hero'),
  heading: z.string().min(1, 'Heading required').max(200),
  subheading: z.string().optional().default(''),
});

const FeatureItemSchema = z.object({
  title: z.string().min(1, 'Title required').max(100),
  description: z.string().min(1, 'Description required').max(300),
});

const FeaturesBlockSchema = z.object({
  type: z.literal('Features'),
  items: z
    .array(FeatureItemSchema)
    .min(2, 'At least 2 features required')
    .max(4, 'Maximum 4 features allowed'),
});

const FooterBlockSchema = z.object({
  type: z.literal('Footer'),
  text: z.string().min(1, 'Footer text required').max(300),
});

// ─── Complete Content Schema ──────────────────────────────────────────────

export const ContentBlockSchema = z.object({
  blocks: z
    .array(
      z.union([HeroBlockSchema, FeaturesBlockSchema, FooterBlockSchema])
    )
    .refine(
      (blocks) => blocks[0]?.type === 'Hero',
      'Content must start with Hero block'
    )
    .refine(
      (blocks) => blocks[blocks.length - 1]?.type === 'Footer',
      'Content must end with Footer block'
    ),
});

// ─── Validation Function ──────────────────────────────────────────────────

export function validateContent(data) {
  try {
    const validated = ContentBlockSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    return {
      success: false,
      error: error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
      raw: error.message,
    };
  }
}

// ─── Type Exports ────────────────────────────────────────────────────────

export const HeroBlock = HeroBlockSchema;
export const FeaturesBlock = FeaturesBlockSchema;
export const FooterBlock = FooterBlockSchema;