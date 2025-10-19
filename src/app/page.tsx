'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Gift, Share2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCreateWish = (e: React.FormEvent) => {
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
    router.push(`/wish?name=${encodeURIComponent(name)}`);
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

      {isClient && (
        <Card className="w-full max-w-lg bg-black/30 backdrop-blur-md border-primary/50 z-10 shadow-2xl shadow-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400">
              शुभ दिवाली
            </CardTitle>
            <CardDescription className="text-amber-200/80 pt-2">
              बनाएँ, अपने प्रियजनों के लिए एक व्यक्तिगत दिवाली संदेश।
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateWish} className="space-y-4 text-center">
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
              <a href="https://www.effectivegatecpm.com/e0tukiugmg?key=aa66468bdeeef3c2c0bf8a69a613d8ae" target="_blank" rel="noopener noreferrer">
                <Button type="button" size="lg" className="w-full text-lg mt-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-white hover:bg-gradient-to-br">
                   <Gift className="mr-2" />
                   आपके लिए एक तोहफा
                </Button>
              </a>
            </form>
          </CardContent>
        </Card>
      )}
      
      <footer className="absolute bottom-4 text-center text-sm text-white/50 z-10">
        दिवाली की हार्दिक शुभकामनाएँ!
      </footer>
    </div>
  );
}
