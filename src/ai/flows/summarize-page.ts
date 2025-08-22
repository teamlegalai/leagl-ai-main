'use server';

/**
 * @fileOverview A page summarization AI agent.
 *
 * - summarizePage - A function that handles the page summarization process.
 * - SummarizePageInput - The input type for the summarizePage function.
 * - SummarizePageOutput - The return type for the summarizePage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePageInputSchema = z.object({
  pageText: z.string().describe('The text content of the page to summarize.'),
  documentName: z.string().describe('The name of the document being summarized.'),
  pageNumber: z.number().describe('The page number being summarized.'),
});
export type SummarizePageInput = z.infer<typeof SummarizePageInputSchema>;

const SummarizePageOutputSchema = z.object({
  summary: z.string().describe('The concise summary of the page.'),
  bulletPoints: z.string().describe('The bullet points of the page.'),
});
export type SummarizePageOutput = z.infer<typeof SummarizePageOutputSchema>;

export async function summarizePage(input: SummarizePageInput): Promise<SummarizePageOutput> {
  return summarizePageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePagePrompt',
  input: {schema: SummarizePageInputSchema},
  output: {schema: SummarizePageOutputSchema},
  prompt: `You are an expert summarizer, skilled at condensing information into concise summaries and bullet points.

  Summarize the following page from the document "{{documentName}}", page number {{pageNumber}}.

  Page Text: {{{pageText}}}

  Provide a concise summary of the page, and also generate a list of bullet points covering the key topics discussed on the page.
  Make the summary as concise as possible, but ensure the bullet points include as much of the information from the page as possible.
  Separate the summary and bullet points by a newline.
  `,
});

const summarizePageFlow = ai.defineFlow(
  {
    name: 'summarizePageFlow',
    inputSchema: SummarizePageInputSchema,
    outputSchema: SummarizePageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
