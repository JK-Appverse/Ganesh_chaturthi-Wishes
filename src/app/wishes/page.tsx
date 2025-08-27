'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Heart, Loader2, Share2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { generateGaneshWish } from '@/ai/flows/generate-ganesh-wish';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import AdBanner from '@/components/AdBanner';

function WishesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get('name') || 'दोस्त';
  const { toast } = useToast();

  const [quote, setQuote] = useState<string | null>(null);
  const [isQuoteLoading, setIsQuoteLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

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
  }, [name, toast, isClient]);

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

  const handleCreateNewWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim().length < 2) {
      toast({
        variant: "destructive",
        title: "नाम बहुत छोटा है",
        description: "कृपया कम से कम 2 अक्षरों का नाम दर्ज करें।",
      });
      return;
    }
    router.push(`/wishes?name=${encodeURIComponent(newName)}`);
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-yellow-900 via-orange-900 to-red-900 p-4 font-body sm:p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/traditional-mandala.png')] opacity-10"></div>
        <Card className="w-full max-w-lg shadow-2xl z-10 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-background-pan [background-size:200%_200%] border-primary/40">
        <CardContent className="p-4 md:p-6 text-center">
          <div className="flex justify-center mb-4 text-white">
            <span className="text-7xl animate-pulse drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">🙏</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-headline text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            <span className="font-headline text-5xl md:text-6xl text-yellow-200" style={{fontFamily: "'Alegreya', serif"}}>{name}</span> की ओर से गणेश चतुर्थी की हार्दिक शुभकामनाएँ
          </h1>

          <div className="mt-6 text-white/90 italic text-lg min-h-[6rem] flex items-center justify-center font-noto-serif-devanagari">
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
          <p className="mt-4 text-sm text-white/80 animate-pulse">
            इस शुभकामना को कम से कम दो और लोगों के साथ साझा करें और खुशियाँ फैलाएँ।
          </p>
        </CardContent>
      </Card>
      
      <div className="z-10 w-full max-w-lg">
        <AdBanner />
      </div>

      <div className="flex flex-col gap-4 z-10 w-full max-w-lg">
          <Button onClick={handleShare} className="w-full text-lg py-6 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
            <Share2 className="mr-2" /> शेयर करें
          </Button>
          
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg space-y-3">
             <form onSubmit={handleCreateNewWish} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="अपना नाम लिखें"
                className="bg-background/80 text-white placeholder:text-gray-300 border-white/50 flex-grow"
              />
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Send className="mr-2 h-4 w-4" /> बनाएं
              </Button>
            </form>
          </div>
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
