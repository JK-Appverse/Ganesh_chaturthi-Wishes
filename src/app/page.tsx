'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, History, Scale, Sparkles, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleStartQuiz = (category: string) => {
    router.push(`/quiz?category=${category}`);
  };

  const studySections = [
    {
      title: 'मध्य प्रदेश का इतिहास',
      description: 'प्राचीन काल से लेकर आधुनिक युग तक के ऐतिहासिक तथ्यों का अभ्यास करें।',
      icon: <History className="w-8 h-8 text-primary" />,
      category: 'history',
    },
    {
      title: 'मध्य प्रदेश की राजनीति',
      description: 'राज्य की राजनीतिक व्यवस्था, महत्वपूर्ण अधिनियमों और राजनेताओं को जानें।',
      icon: <Scale className="w-8 h-8 text-primary" />,
      category: 'politics',
    },
    {
      title: 'MPPSC के लिए MP',
      description: 'MPPSC परीक्षा के लिए विशेष रूप से डिज़ाइन किए गए प्रश्नों का अभ्यास करें।',
      icon: <Book className="w-8 h-8 text-primary" />,
      category: 'mppsc',
    },
    {
      title: 'अभ्यास (Practice)',
      description: 'सभी विषयों के मिश्रित प्रश्नों के साथ अपने ज्ञान का परीक्षण करें।',
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      category: 'practice',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">MP Study में आपका स्वागत है</h1>
        <p className="text-lg md:text-xl text-muted-foreground">MPPSC और अन्य प्रतियोगी परीक्षाओं में सफलता की ओर आपका पहला कदम।</p>
      </section>
      
      <Card className="mb-12 bg-secondary/30 border-primary/50 shadow-lg">
        <CardHeader className="flex flex-row items-center gap-4">
          <Trophy className="w-12 h-12 text-yellow-400" />
          <div>
            <CardTitle className="text-2xl font-bold">MPPSC डेली सुपर टेस्ट</CardTitle>
            <CardDescription>आज के 2-घंटे के नॉन-स्टॉप चैलेंज के लिए तैयार हो जाइए।</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">यह टेस्ट आपकी तैयारी को परखने का एक बेहतरीन मौका है। टेस्ट के दौरान आप रुक नहीं सकते। क्या आप तैयार हैं?</p>
          <Button size="lg" className="w-full" onClick={() => handleStartQuiz('super_test')}>
            सुपर टेस्ट शुरू करें
          </Button>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-3xl font-bold text-center mb-8">अध्ययन अनुभाग</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studySections.map((section) => (
            <Card key={section.title} className="hover:shadow-primary/20 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-start gap-4">
                {section.icon}
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" onClick={() => handleStartQuiz(section.category)}>
                  अभी अभ्यास करें
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
