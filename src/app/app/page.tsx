
"use client";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import Link from 'next/link';
import * as pdfjs from "pdfjs-dist";
import { summarizePage } from "@/ai/flows/summarize-page";
import { useToast } from "@/hooks/use-toast";
import { Loader, Scale, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Expand, Share } from "lucide-react";

// Polyfill for Promise.withResolvers
if (!Promise.withResolvers) {
  Promise.withResolvers = function withResolvers<T>() {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason?: any) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve: resolve!, reject: reject! };
  };
}

// Set up the PDF.js worker to enable PDF processing in the browser.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`;

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
  const [currentPage, setCurrentPage] = useState(0);
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
    setCurrentPage(0);
    setIsLoadingPdf(true);
    setIsAnalyzing(true);

    try {
      const fileReader = new FileReader();
      const { promise, resolve } = Promise.withResolvers<string>();
      fileReader.onload = (e) => resolve(e.target?.result as string);
      fileReader.readAsDataURL(file);
      const pdfDataUri = await promise;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      const extractedPages: PageData[] = [];
      const analysisPromises: ReturnType<typeof summarizePage>[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
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
          
          analysisPromises.push(summarizePage({
            pageText: text,
            documentName: file.name,
            pageNumber: i,
          }));
        }
      }
      setPages(extractedPages);
      setIsLoadingPdf(false);

      const analysisResults = await Promise.all(analysisPromises);
      setResults(analysisResults);
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${analysisResults.length} pages.`,
      });

    } catch (error) {
      console.error("Error processing PDF:", error);
      toast({
        variant: "destructive",
        title: "PDF Processing Error",
        description: "Could not read the PDF. It might be corrupted or password-protected.",
      });
      setIsLoadingPdf(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(pages.length - 1, prev + 1));
  };
  
  return (
    <div style={{ backgroundColor: 'white', color: '#333' }}>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/pdf" />

      {/* Navigation */}
      <nav className="navbar" style={{backgroundColor: 'rgba(255,255,255,0.95)', borderBottom: '1px solid #e0e0e0'}}>
        <div className="nav-container">
          <Link href="/" className="nav-logo" style={{color: '#333'}}>
              <Scale />
              <span>LegalAI Pro</span>
          </Link>
          <ul className="nav-menu">
            <li><Link href="/" style={{color: '#333'}}>Home</Link></li>
            <li><a href="/#services" style={{color: '#333'}}>Services</a></li>
            <li><a href="/#features" style={{color: '#333'}}>Features</a></li>
            <li><a href="/#pricing" style={{color: '#333'}}>Pricing</a></li>
            <li><a href="/#contact" style={{color: '#333'}}>Contact</a></li>
            <li><a href="#" style={{color: '#333'}}>API Docs</a></li>
          </ul>
          <div className="nav-toggle">
            <span></span><span></span><span></span>
          </div>
        </div>
      </nav>

      {/* Results Section */}
      <div className="results-container">
        {/* Document Viewer Section */}
        <div className="doc-viewer">
          <div className="doc-toolbar">
            <div className="toolbar-left">
              <button className="btn btn-primary" style={{borderRadius: '5px', padding: '0.5rem 1rem'}} onClick={triggerFileInput} disabled={isLoadingPdf || isAnalyzing}>
                {pdfFile ? 'Upload New' : 'Upload PDF'}
              </button>
            </div>
            <div className="toolbar-center">
              {pages.length > 0 && (
                <div className="page-controls">
                  <button className="nav-btn" onClick={goToPreviousPage} disabled={currentPage === 0}><ChevronLeft /></button>
                  <span>Page {currentPage + 1} of {pages.length}</span>
                  <button className="nav-btn" onClick={goToNextPage} disabled={currentPage === pages.length - 1}><ChevronRight /></button>
                </div>
              )}
            </div>
            <div className="toolbar-right">
              <div className="zoom-controls">
                 <button className="tool-btn"><ZoomIn /></button>
                 <button className="tool-btn"><ZoomOut /></button>
                 <button className="tool-btn"><Expand /></button>
              </div>
            </div>
          </div>
          <div className="doc-content">
            <div id="doc-render-area">
            {isLoadingPdf ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                 <Loader className="h-16 w-16 animate-spin text-primary" />
                 <h3 className="text-xl font-semibold text-foreground/80 mt-4">Reading PDF...</h3>
                 <p className="mt-2 text-muted-foreground">Please wait while we process your document.</p>
              </div>
            ) : pages.length > 0 ? (
                <Image src={pages[currentPage].image} alt={`Page ${currentPage + 1}`} width={850} height={1100} className="w-full h-auto" />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                 <h3 className="text-xl font-semibold text-foreground/80">Upload a Document</h3>
                 <p className="mt-2 text-muted-foreground">Select a PDF file to begin analysis.</p>
                 <button className="btn btn-primary mt-4" style={{borderRadius: '5px', padding: '0.5rem 1rem'}} onClick={triggerFileInput} disabled={isLoadingPdf || isAnalyzing}>
                    Upload PDF
                 </button>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="analysis-panel">
          <div className="panel-header">
            <div className="format-selector">
              <button className="format-btn active">Markdown</button>
            </div>
            <div className="panel-controls">
               <button className="tool-btn"><Share /></button>
            </div>
          </div>
          <div className="analysis-content">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                 <Loader className="h-16 w-16 animate-spin text-primary" />
                 <h3 className="text-xl font-semibold text-foreground/80 mt-4">Analyzing Document...</h3>
                 <p className="mt-2 text-muted-foreground">Our AI is generating summaries and key points.</p>
              </div>
            ) : results.length > 0 && results[currentPage] ? (
              <>
                <div className="content-section">
                  <h2>Document Analysis</h2>
                  <div className="text-content">
                    <p>{results[currentPage].summary}</p>
                  </div>
                </div>
                <div className="content-section">
                  <h3>Key Findings</h3>
                  <ul className="findings-list">
                    {results[currentPage].bulletPoints.split('\\n').map(p => p.trim()).filter(Boolean).map((point, i) => (
                      <li key={i}>{point.replace(/^- \\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <h3 className="text-xl font-semibold text-foreground/80">Awaiting Analysis</h3>
                    <p className="mt-2 text-muted-foreground">Your document analysis will appear here.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
