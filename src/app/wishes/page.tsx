'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart, Loader2, Share2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { generateGaneshWish } from '@/ai/flows/generate-ganesh-wish';
import { Skeleton } from '@/components/ui/skeleton';

function WishesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || 'दोस्त';
  const { toast } = useToast();

  const [quote, setQuote] = useState<string | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageUrl = '/ganesha.png'; // Using the image from the public folder

  useEffect(() => {
    async function getWish() {
      if (!name) return;
      
      setIsQuoteLoading(true);

      try {
        const quoteResult = await generateGaneshWish({ userName: name });
        setQuote(quoteResult.quote);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Failed to generate wish",
          description: "Could not generate a wish. Please try again.",
        });
      } finally {
        setIsQuoteLoading(false);
      }
    }
    
    getWish();
  }, [name, toast]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${name} की ओर से गणेश चतुर्थी की शुभकामनाएं`,
        text: `"${quote}" - ${name} की ओर से गणेश चतुर्थी की हार्दिक शुभकामनाएँ`,
        url: window.location.href,
      })
      .then(() => toast({ title: "सफलतापूर्वक साझा किया गया!" }))
      .catch((error) => console.error('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "लिंक कॉपी किया गया!",
        description: "लिंक को अपने दोस्तों और परिवार के साथ साझा करें।",
      });
    }
  };
  
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-4 font-body sm:p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/traditional-mandala.png')] opacity-10"></div>
        <Card className="w-full max-w-lg shadow-2xl z-10 bg-black/30 backdrop-blur-md border-primary/40 animate-fade-in">
        <CardContent className="p-4 md:p-6 text-center">
          <div className="mb-4">
             <Image
              src={imageUrl}
              alt="Lord Ganesha"
              width={800}
              height={1000}
              className={`rounded-lg mx-auto shadow-lg border-2 border-amber-400/50 transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsImageLoading(false)}
              priority
            />
             {isImageLoading && <Skeleton className="w-full h-[500px] rounded-lg bg-white/20" />}
          </div>
          <h1 className="text-2xl md:text-3xl font-headline text-amber-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] font-noto-serif-devanagari">
            {name} की ओर से गणेश चतुर्थी की हार्दिक शुभकामनाएँ
          </h1>

          <div className="mt-6 text-orange-200/90 italic text-lg min-h-[6rem] flex items-center justify-center font-noto-serif-devanagari">
            {isQuoteLoading || !quote ? (
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
            <Share2 className="mr-2" /> प्यार से साझा करें
          </Button>
          <Button onClick={() => router.push('/')} variant="outline" className="w-full text-lg py-6 bg-white/20 border-white/50 text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
             <UserPlus className="mr-2" /> नई शुभकामना बनाएं
          </Button>
      </div>
      <footer className="text-center mt-8 text-sm text-white/60 z-10">
        <p>आपके लिए <Heart className="inline h-4 w-4 text-red-400 animate-pulse" /> से बनाया गया है।</p>
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
