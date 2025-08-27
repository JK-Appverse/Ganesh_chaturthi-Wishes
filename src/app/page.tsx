'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GaneshaIcon } from '@/components/icons';
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Redirect to the wishes page with the name as a query parameter
      router.push(`/wishes?name=${encodeURIComponent(values.name)}`);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem creating your wish. Please try again.",
      });
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background p-4 font-body sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-md shadow-2xl z-10 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 text-primary animate-pulse">
            <GaneshaIcon className="h-20 w-20" />
          </div>
          <CardTitle className="font-headline text-3xl md:text-4xl text-primary">Ganesh Chaturthi Wishes</CardTitle>
          <CardDescription className="pt-2 text-foreground/80">
            Create a personalized greeting for your loved ones.
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
                      <Input placeholder="e.g., Jatin" {...field} className="bg-background/80" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Generate Wish'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
