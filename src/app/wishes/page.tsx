'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, ChevronLeft, Award } from 'lucide-react';
import { Suspense } from 'react';

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = searchParams.get('score');
  const total = searchParams.get('total');
  const resultsData = searchParams.get('results');
  
  const results = resultsData ? JSON.parse(resultsData) : [];
  const motivationalLine = "“सफलता अंतिम नहीं है, असफलता घातक नहीं है: यह जारी रखने का साहस है जो मायने रखता है।” - विंस्टन चर्चिल";

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="text-center">
          <Award className="mx-auto h-16 w-16 text-yellow-400" />
          <CardTitle className="text-3xl font-bold mt-4">टेस्ट का परिणाम</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <p className="text-5xl font-bold text-primary">
              {score}/{total}
            </p>
            <p className="text-muted-foreground mt-2">आपका स्कोर</p>
          </div>

          <div className="text-center mb-10 p-4 bg-secondary/30 rounded-lg">
            <p className="text-lg italic">"{motivationalLine}"</p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold border-b pb-2">प्रश्न विश्लेषण</h3>
            {results.map((result: any, index: number) => (
              <Card key={index} className={result.isCorrect ? 'border-green-500/50' : 'border-red-500/50'}>
                <CardHeader>
                  <CardTitle className="flex items-start gap-4">
                    {result.isCorrect ? (
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <span>{index + 1}. {result.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pl-12">
                   <p><strong>आपका उत्तर:</strong> <span className={result.isCorrect ? 'text-green-400' : 'text-red-400'}>{result.selected}</span></p>
                   <p><strong>सही उत्तर:</strong> <span className="text-green-400">{result.correctAnswer}</span></p>
                   {!result.isCorrect && (
                     <div className="p-3 bg-background rounded-md">
                        <h4 className="font-semibold mb-1">विस्तृत जानकारी:</h4>
                        <p className="text-muted-foreground text-sm">{result.explanation}</p>
                     </div>
                   )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => router.push('/')}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              होम पर वापस जाएं
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
