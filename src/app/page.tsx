'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { Download, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GaneshaIcon } from '@/components/icons';
import { generateGaneshWishesImage } from '@/ai/flows/generate-ganesh-wishes-image';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';


const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

export default function Home() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedImage(null);
    try {
      const result = await generateGaneshWishesImage({ userName: values.name });
      if (result && result.imageDataUri) {
        setGeneratedImage(result.imageDataUri);
      } else {
        throw new Error('Failed to generate image. The AI did not return image data.');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem generating your image. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'ganesh-chaturthi-wishes.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 font-body sm:p-6 md:p-8">
      <Card className="w-full max-w-lg shadow-2xl z-10 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 text-primary">
            <GaneshaIcon className="h-16 w-16" />
          </div>
          <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Ganesh Wishes Generator</CardTitle>
          <CardDescription className="pt-2 text-foreground/80">
            Create a personalized Ganesh Chaturthi greeting for your loved ones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/90">Enter Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rohan Sharma" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Wish'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        {(isLoading || generatedImage) && (
          <CardFooter className="flex flex-col gap-4 pt-6">
            <div className="w-full aspect-square relative flex items-center justify-center rounded-lg border-2 border-dashed border-accent/30 bg-muted/50 overflow-hidden">
              {isLoading && (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p>Creating your image...</p>
                </div>
              )}
              {generatedImage && (
                <>
                  <Image
                    src={generatedImage}
                    alt="Generated Ganesh Chaturthi Wish"
                    fill
                    className={cn(
                      "object-contain p-2 transition-opacity duration-700 ease-in-out",
                      isLoading ? 'opacity-0' : 'opacity-100'
                    )}
                    data-ai-hint="ganesha idol"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 hidden items-center justify-center md:flex">
                     <Button onClick={handleDownload} variant="secondary" size="lg">
                        <Download className="mr-2 h-5 w-5" />
                        Download
                     </Button>
                  </div>
                </>
              )}
            </div>
            {generatedImage && !isLoading && (
               <Button onClick={handleDownload} className="w-full md:hidden" variant="secondary">
                  <Download className="mr-2 h-5 w-5" />
                  Download Image
               </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
