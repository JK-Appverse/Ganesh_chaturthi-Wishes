'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, Loader2, Share2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { generateGaneshWish, GenerateGaneshWishOutput } from '@/ai/flows/generate-ganesh-wish';
import { Skeleton } from '@/components/ui/skeleton';

function WishesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || 'Friend';
  const { toast } = useToast();

  const [wishData, setWishData] = useState<{quote: string, audioDataUri: string} | null>(null);
  const [quote, setQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getWish() {
      setIsLoading(true);
      try {
        const result = await generateGaneshWish({ userName: name });
        setWishData(result);
        setQuote(result.quote);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Failed to generate wish",
          description: "Could not generate a quote and music. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }
    getWish();
  }, [name, toast]);

  useEffect(() => {
    // This useEffect will only run on the client, after the first render.
    // This avoids hydration mismatch for the randomly selected quote.
    if (wishData) {
      setQuote(wishData.quote);
    }
  }, [wishData]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Ganesh Chaturthi Wishes from ${name}`,
        text: `Check out these beautiful Ganesh Chaturthi wishes from ${name}!`,
        url: window.location.href,
      })
      .then(() => toast({ title: "Shared successfully!" }))
      .catch((error) => console.error('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Share the link with your friends and family.",
      });
    }
  };
  
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-4 font-body sm:p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/traditional-mandala.png')] opacity-10"></div>
        <div className="absolute top-4 left-4">
          {wishData?.audioDataUri && (
            <audio src={wishData.audioDataUri} autoPlay loop controls className="w-40 h-8" />
          )}
        </div>
        <Card className="w-full max-w-lg shadow-2xl z-10 bg-black/30 backdrop-blur-md border-primary/40 animate-fade-in">
        <CardContent className="p-4 md:p-6 text-center">
          <div className="mb-4">
            <Image
              src="https://picsum.photos/400/400"
              alt="Lord Ganesha"
              width={400}
              height={400}
              className="rounded-lg mx-auto shadow-lg border-2 border-amber-400/50"
              priority
              data-ai-hint="ganesha"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-headline text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            {name} की ओर से गणेश चतुर्थी की हार्दिक शुभकामनाएँ
          </h1>

          <div className="mt-6 text-orange-200/90 italic text-lg min-h-[6rem] flex items-center justify-center">
            {isLoading || !quote ? (
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-5/6 mx-auto bg-white/20" />
                <Skeleton className="h-4 w-4/6 mx-auto bg-white/20" />
                <Skeleton className="h-4 w-5/6 mx-auto bg-white/20" />
              </div>
            ) : (
                <p>"{quote}"</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 z-10 w-full max-w-lg">
          <Button onClick={handleShare} className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
            <Share2 className="mr-2" /> Share with Love
          </Button>
          <Button onClick={() => router.push('/')} variant="outline" className="w-full text-lg py-6 bg-white/20 border-white/50 text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
             <UserPlus className="mr-2" /> Create New Wish
          </Button>
      </div>
      <footer className="text-center mt-8 text-sm text-white/60 z-10">
        <p>Made with <Heart className="inline h-4 w-4 text-red-400 animate-pulse" /> for you.</p>
      </footer>
    </main>
  );
}

export default function WishesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen w-full flex-col items-center justify-center bg-background"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
      <WishesContent />
    </Suspense>
  )
}
