'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating bullet points for each page of a PDF document.
 *
 * - generateBulletPoints - A function that accepts PDF data and page number, generates bullet points for the page.
 * - GenerateBulletPointsInput - The input type for the generateBulletPoints function.
 * - GenerateBulletPointsOutput - The return type for the generateBulletPoints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBulletPointsInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'The PDF document content, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Ensure proper format description
    ),
  pageContent: z.string().describe('Content of the page to generate bullet points for'),
  pageNumber: z.number().describe('The page number for which bullet points are generated'),
});

export type GenerateBulletPointsInput = z.infer<typeof GenerateBulletPointsInputSchema>;

const GenerateBulletPointsOutputSchema = z.object({
  bulletPoints: z.array(z.string()).describe('Array of bullet points summarizing the page content.'),
});

export type GenerateBulletPointsOutput = z.infer<typeof GenerateBulletPointsOutputSchema>;

const bulletPointPrompt = ai.definePrompt({
  name: 'bulletPointPrompt',
  input: {schema: GenerateBulletPointsInputSchema},
  output: {schema: GenerateBulletPointsOutputSchema},
  prompt: `You are an expert AI assistant designed to extract key information from document pages and create concise bullet points.

  Given the content of page {{pageNumber}} from a PDF document, generate a list of bullet points that summarize the most important information.  Each bullet point should be short and to the point.
  Page Content: {{{pageContent}}}`, // Use triple braces for pageContent
});


const generateBulletPointsFlow = ai.defineFlow(
  {
    name: 'generateBulletPointsFlow',
    inputSchema: GenerateBulletPointsInputSchema,
    outputSchema: GenerateBulletPointsOutputSchema,
  },
  async input => {
    const {output} = await bulletPointPrompt(input);
    return output!;
  }
);

export async function generateBulletPoints(input: GenerateBulletPointsInput): Promise<GenerateBulletPointsOutput> {
  return generateBulletPointsFlow(input);
}
