import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <Card className="w-full max-w-xl text-center shadow-2xl rounded-xl border-2 border-border/60">
        <CardHeader className="p-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6 border-4 border-primary/20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-5xl font-extrabold font-headline tracking-tight text-primary">DocuBrief</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2 max-w-md mx-auto">
            Your intelligent document assistant. Upload a PDF to get instant, page-by-page summaries and key takeaways with the power of AI.
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-8 pt-0">
          <Link href="/app" passHref className="w-full">
            <Button size="lg" className="w-full text-lg py-7 font-bold group">
              Get Started <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
