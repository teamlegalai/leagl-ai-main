"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import * as pdfjs from "pdfjs-dist";
import { summarizePage } from "@/ai/flows/summarize-page";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Upload, Loader, FileText, Bot, Sparkles } from "lucide-react";

// Set up the PDF.js worker to enable PDF processing in the browser.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PageData = {
  image: string;
  text: string;
};

type AnalysisResult = {
  summary: string;
  bulletPoints: string;
};

export default function DocuBriefApp() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please select a valid PDF file.",
      });
      return;
    }

    setPdfFile(file);
    setPages([]);
    setResults([]);
    setIsLoadingPdf(true);
    setIsAnalyzing(true); // Start analyzing right after PDF load begins

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      const extractedPages: PageData[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 }); // Higher scale for better quality
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (context) {
          await page.render({ canvasContext: context, viewport }).promise;
          const image = canvas.toDataURL("image/png");
          
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item: any) => item.str).join(" ");
          
          extractedPages.push({ image, text });
        }
      }
      setPages(extractedPages);
      setIsLoadingPdf(false); // PDF loading finished
      await handleAnalyze(extractedPages, file.name);
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        variant: "destructive",
        title: "PDF Processing Error",
        description: "Could not read the PDF. It might be corrupted or password-protected.",
      });
      setIsLoadingPdf(false);
      setIsAnalyzing(false);
    }
  };

  const handleAnalyze = async (extractedPages: PageData[], fileName: string) => {
    if (extractedPages.length === 0) {
      setIsAnalyzing(false);
      return;
    }
    
    try {
      const analysisPromises = extractedPages.map((page, index) =>
        summarizePage({
          pageText: page.text,
          documentName: fileName,
          pageNumber: index + 1,
        })
      );

      const analysisResults = await Promise.all(analysisPromises);
      setResults(analysisResults);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${analysisResults.length} pages.`,
      });
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "The AI analysis could not be completed. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const triggerFileInput = () => fileInputRef.current?.click();

  const renderPlaceholder = (icon: React.ReactNode, title: string, description: string) => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-4 text-muted-foreground/30">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground/80">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-background font-body text-foreground">
      <aside className="w-1/2 border-r border-border/60 flex flex-col">
        <header className="p-4 border-b border-border/60 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold font-headline flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Document Viewer
          </h1>
          <Button onClick={triggerFileInput} disabled={isLoadingPdf || isAnalyzing} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            {pdfFile ? 'Upload New' : 'Upload PDF'}
          </Button>
          <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />
        </header>
        <ScrollArea className="flex-1 bg-muted/20">
          {isLoadingPdf ? (
            renderPlaceholder(<Loader className="h-16 w-16 animate-spin text-primary" />, "Reading PDF...", "Please wait while we process your document.")
          ) : pages.length > 0 ? (
            <div className="p-4 md:p-8 space-y-6">
              {pages.map((page, index) => (
                <Card key={index} className="overflow-hidden shadow-lg rounded-lg">
                   <CardHeader className="p-2 px-4 bg-gray-100 dark:bg-gray-800 border-b">
                    <CardDescription className="text-xs font-medium text-muted-foreground">PAGE {index + 1} OF {pages.length}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Image src={page.image} alt={`Page ${index + 1} of the uploaded PDF`} width={1240} height={1754} className="w-full h-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            renderPlaceholder(<Upload className="h-16 w-16" />, "Upload a Document", "Select a PDF file to begin analysis.")
          )}
        </ScrollArea>
      </aside>

      <main className="w-1/2 flex flex-col">
        <header className="p-4 border-b border-border/60 flex items-center shrink-0">
          <h1 className="text-xl font-bold font-headline flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            AI Analysis
          </h1>
        </header>
        <ScrollArea className="flex-1">
          <div className="p-4 md:p-8">
            {isAnalyzing ? (
               renderPlaceholder(<Loader className="h-16 w-16 animate-spin text-primary" />, "Analyzing Document...", "Our AI is generating summaries and key points for you.")
            ) : results.length > 0 ? (
              <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="item-0">
                {results.map((result, index) => (
                  <AccordionItem value={`item-${index}`} key={index} className="border-border/60 rounded-lg border bg-white dark:bg-gray-800 shadow-sm">
                    <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                      Page {index + 1} Analysis
                    </AccordionTrigger>
                    <AccordionContent className="p-4 pt-0 space-y-6">
                      <div>
                        <h3 className="font-semibold text-primary mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4"/>Summary</h3>
                        <p className="text-sm text-foreground/80 leading-relaxed">{result.summary}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4" />Key Points</h3>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-foreground/80">
                          {result.bulletPoints.split('\n').map(p => p.trim()).filter(Boolean).map((point, i) => (
                            <li key={i}>{point.replace(/^- \s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              renderPlaceholder(<Bot className="h-16 w-16" />, "Awaiting Document", "Your document analysis will appear here.")
            )}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
