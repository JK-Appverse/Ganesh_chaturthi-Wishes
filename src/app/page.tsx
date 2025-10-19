'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Gift, Share2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { generateDiwaliWish } from '@/ai/flows/generate-diwali-wish';


export default function Home() {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreateWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        variant: "destructive",
        title: "नाम आवश्यक है",
        description: "कृपया शुभकामना बनाने के लिए अपना नाम दर्ज करें।",
      });
      return;
    }
    setIsLoading(true);
    setWish('');
    try {
      const response = await generateDiwaliWish({ userName: name });
      setWish(response.quote);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "अरे नहीं!",
        description: "शुभकामना बनाते समय कुछ गलत हो गया। कृपया दोबारा प्रयास करें।",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleShare = async () => {
    const shareText = `*${name} की ओर से दिवाली की शुभकामनाएँ!*\n\n${wish}\n\nआप भी अपनी व्यक्तिगत शुभकामना बनाएँ!`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'दिवाली की शुभकामनाएँ',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.error('Sharing failed', error);
        // Fallback to copying to clipboard
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
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
      <div className="fireworks-bg">
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
        <div className="firework"></div>
      </div>

      {isClient && (
        <Card className="w-full max-w-lg bg-black/30 backdrop-blur-md border-primary/50 z-10 shadow-2xl shadow-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
                <Image 
                  src="https://i.postimg.cc/13YMLsD1/61793-1.png"
                  alt="Goddess Lakshmi" 
                  width={128} 
                  height={128}
                  className="drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                  priority
                />
            </div>
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 animate-background-pan">
              शुभ दिवाली
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!wish ? (
              <form onSubmit={handleCreateWish} className="space-y-4">
                <Input
                  type="text"
                  placeholder="अपना नाम दर्ज करें"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-center text-lg h-12 bg-white/10 placeholder:text-gray-400 focus:ring-2 ring-offset-background"
                  disabled={isLoading}
                />
                <Button type="submit" size="lg" className="w-full text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="mr-2" />
                      शुभकामना बनाएँ
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <blockquote className="text-2xl font-medium leading-relaxed bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  " {wish} "
                </blockquote>
                <p className="text-lg text-yellow-400 font-semibold">- {name}</p>
              </div>
            )}
          </CardContent>

          {wish && (
              <CardFooter className="flex-col gap-4">
                  <Button onClick={handleShare} className="w-full text-md bg-green-600 hover:bg-green-700">
                      <Share2 className="mr-2" />
                      WhatsApp पर साझा करें
                  </Button>
                   <Button onClick={() => { setWish(''); setName(''); }} variant="outline" className="w-full">
                      <Gift className="mr-2" />
                      एक और शुभकामना बनाएँ
                  </Button>
              </CardFooter>
          )}
        </Card>
      )}
      
      <footer className="absolute bottom-4 text-center text-sm text-white/50 z-10">
        AI के साथ बनाया गया। दिवाली की हार्दिक शुभकामनाएँ!
      </footer>
    </div>
  );
}
