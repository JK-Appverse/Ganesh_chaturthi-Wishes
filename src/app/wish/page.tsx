'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function WishContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'दोस्त';
  const { toast } = useToast();

  const wish = `की ओर से दिवाली की आपको हार्दिक शुभकामनाएँ`;

  const handleShare = async () => {
    const shareText = `*${name} ${wish}*`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'दिवाली की शुभकामनाएँ',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Sharing failed', error);
        await copyToClipboard(shareText);
      }
    } else {
      await copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "कॉपी किया गया!",
        description: "शुभकामना संदेश आपके क्लिपबोर्ड पर कॉपी हो गया है।",
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({
        variant: 'destructive',
        title: 'कॉपी करने में विफल',
        description: 'आपका ब्राउज़र क्लिपबोर्ड पर कॉपी करने का समर्थन नहीं करता है।',
      });
    }
  };

  return (
    <div className="diwali-gradient-bg relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
      <div className="fireworks-bg">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>

      <Card className="w-full max-w-lg bg-black/30 backdrop-blur-md border-primary/50 z-10 shadow-2xl shadow-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold font-alegreya text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            शुभ दिवाली
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <h3 className="text-5xl font-alegreya font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent animate-text-shimmer bg-[200%_auto]">
              {name}
            </h3>
            <p className="text-2xl font-medium leading-relaxed bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              {wish}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button onClick={handleShare} className="w-full text-md bg-green-600 hover:bg-green-700">
            <Share2 className="mr-2" />
            WhatsApp पर साझा करें
          </Button>
          <Button onClick={() => router.push('/')} variant="outline" className="w-full">
            <Gift className="mr-2" />
            एक और शुभकामना बनाएँ
          </Button>
        </CardFooter>
      </Card>
      
      <footer className="absolute bottom-4 text-center text-sm text-white/50 z-10">
        दिवाली की हार्दिक शुभकामनाएँ!
      </footer>
    </div>
  );
}


export default function WishPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WishContent />
    </Suspense>
  )
}
