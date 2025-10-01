'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Check, Loader2, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


// Mock data for the quiz
const quizData = {
  super_test: Array.from({ length: 5 }, (_, i) => ({
    question: `सुपर टेस्ट प्रश्न ${i + 1}: मध्य प्रदेश की राजधानी क्या है?`,
    options: ['भोपाल', 'इंदौर', 'जबलपुर', 'ग्वालियर'],
    correctAnswer: 'भोपाल',
    explanation: 'भोपाल 1956 से मध्य प्रदेश की राजधानी है। इसे झीलों के शहर के रूप में भी जाना जाता है।'
  })),
  history: [
    {
      question: 'सांची स्तूप का निर्माण किसने करवाया था?',
      options: ['अशोक', 'चंद्रगुप्त मौर्य', 'बिन्दुसार', 'हर्षवर्धन'],
      correctAnswer: 'अशोक',
      explanation: 'सांची स्तूप का निर्माण सम्राट अशोक ने तीसरी शताब्दी ईसा पूर्व में करवाया था। यह एक महत्वपूर्ण बौद्ध स्मारक है।'
    },
    // Add more history questions
  ],
  politics: [
    {
        question: 'मध्य प्रदेश के पहले मुख्यमंत्री कौन थे?',
        options: ['रविशंकर शुक्ल', 'कैलाश नाथ काटजू', 'द्वारका प्रसाद मिश्रा', 'प्रकाश चंद्र सेठी'],
        correctAnswer: 'रविशंकर शुक्ल',
        explanation: 'पंडित रविशंकर शुक्ल मध्य प्रदेश के पहले मुख्यमंत्री थे, जिन्होंने 1 नवंबर 1956 को पदभार ग्रहण किया था।'
    }
  ],
  mppsc: [
    {
        question: 'मध्य प्रदेश लोक सेवा आयोग (MPPSC) का मुख्यालय कहाँ स्थित है?',
        options: ['इंदौर', 'भोपाल', 'ग्वालियर', 'जबलपुर'],
        correctAnswer: 'इंदौर',
        explanation: 'मध्य प्रदेश लोक सेवा आयोग का मुख्यालय इंदौर में स्थित है। इसकी स्थापना 1956 में हुई थी।'
    }
  ],
  practice: [
    {
        question: 'कान्हा राष्ट्रीय उद्यान किस जानवर के लिए प्रसिद्ध है?',
        options: ['बाघ', 'शेर', 'हाथी', 'एक सींग वाला गैंडा'],
        correctAnswer: 'बाघ',
        explanation: 'कान्हा राष्ट्रीय उद्यान रॉयल बंगाल टाइगर की आबादी के लिए प्रसिद्ध है और यह भारत के प्रमुख बाघ अभयारण्यों में से एक है।'
    }
  ]
};

function QuizComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const category = searchParams.get('category') as keyof typeof quizData ?? 'practice';
  const questions = quizData[category] || quizData.practice;
  
  const isSuperTest = category === 'super_test';
  const totalTime = isSuperTest ? 7200 : questions.length * 60; // 2 hours for super test, 1 min per question otherwise

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [showTimeUpAlert, setShowTimeUpAlert] = useState(false);


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowTimeUpAlert(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFinishTest = () => {
    let score = 0;
    const results = questions.map((q, index) => {
      const isCorrect = selectedAnswers[index] === q.correctAnswer;
      if (isCorrect) score++;
      return {
        question: q.question,
        selected: selectedAnswers[index] || 'उत्तर नहीं दिया गया',
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const resultsString = JSON.stringify(results);
    router.push(`/results?score=${score}&total=${questions.length}&results=${encodeURIComponent(resultsString)}`);
  };

  useEffect(() => {
    if(showTimeUpAlert) {
        handleFinishTest();
    }
  }, [showTimeUpAlert]);

  const handleNext = () => {
    if (!selectedAnswers.hasOwnProperty(currentQuestionIndex)) {
        toast({
            variant: "destructive",
            title: "कोई विकल्प नहीं चुना गया",
            description: "कृपया आगे बढ़ने से पहले एक उत्तर चुनें।",
        })
        return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishTest();
    }
  };

  const handleOptionChange = (value: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: value,
    });
  };

  if (!questions || questions.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <AlertCircle className="w-16 h-16 text-destructive mb-4" />
            <h2 className="text-2xl font-bold mb-2">कोई प्रश्न उपलब्ध नहीं है</h2>
            <p className="text-muted-foreground mb-6">इस श्रेणी के लिए प्रश्न लोड करने में एक समस्या थी।</p>
            <Button onClick={() => router.push('/')}>होम पर वापस जाएं</Button>
        </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-2xl font-bold">
              {category.replace('_', ' ').toUpperCase()} क्विज़
            </CardTitle>
            <div className="flex items-center gap-2 font-mono text-lg p-2 bg-secondary rounded-md">
                <Timer className="h-6 w-6 text-primary" />
                <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
          <CardDescription className="text-center mt-2">
            प्रश्न {currentQuestionIndex + 1} / {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-xl font-semibold">{currentQuestion.question}</p>
            <RadioGroup
              value={selectedAnswers[currentQuestionIndex]}
              onValueChange={handleOptionChange}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <Label
                  key={index}
                  htmlFor={`option-${index}`}
                  className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-secondary has-[[data-state=checked]]:bg-primary/20 has-[[data-state=checked]]:border-primary"
                >
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  {option}
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1 ? 'टेस्ट समाप्त करें' : 'अगला प्रश्न'}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={showTimeUpAlert}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>समय समाप्त!</AlertDialogTitle>
            <AlertDialogDescription>
                इस टेस्ट के लिए आवंटित समय समाप्त हो गया है। आपके उत्तर सबमिट कर दिए गए हैं।
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogAction onClick={handleFinishTest}>परिणाम देखें</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function QuizPage() {
    return (
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
        <QuizComponent />
      </Suspense>
    )
}