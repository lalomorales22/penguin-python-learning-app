import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PythonLogo } from '@/components/icons/python-logo';
import { Lightbulb, PlayCircle, UserCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 py-8 md:py-16">
      <header className="space-y-4">
        <PythonLogo className="h-24 w-24 mx-auto text-primary" />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
          Welcome to Python Sprouts!
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Your fun and friendly launchpad into the amazing world of Python programming. Let&apos;s grow your coding skills together!
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Link href="/clarifier" passHref>
          <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col bg-card hover:border-accent">
            <CardHeader className="items-center">
              <Lightbulb className="h-16 w-16 text-secondary mb-4" />
              <CardTitle className="text-2xl font-semibold">Concept Clarifier</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Confused about a Python concept? Get clear, child-friendly explanations and code examples from our AI tutor.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/turtle" passHref>
          <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col bg-card hover:border-accent">
            <CardHeader className="items-center">
               <Image src="https://picsum.photos/seed/turtleart/100/100" alt="Turtle Art" width={64} height={64} className="rounded-full mb-4" data-ai-hint="abstract turtle drawing" />
              <CardTitle className="text-2xl font-semibold">Turtle Showcase</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Unleash your creativity with Python Turtle! Write code to draw amazing patterns and shapes, then save your masterpieces.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile" passHref>
          <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col bg-card hover:border-accent">
            <CardHeader className="items-center">
              <UserCircle className="h-16 w-16 text-accent mb-4" />
              <CardTitle className="text-2xl font-semibold">Learner&apos;s Space</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Visit your personal profile to see your saved Turtle projects, track your progress, and customize your learning journey.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>

      <div className="mt-12">
        <Link href="/clarifier" passHref>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-xl px-8 py-6">
            <PlayCircle className="mr-2 h-6 w-6" />
            Start Learning Now
          </Button>
        </Link>
      </div>
       <section className="w-full max-w-5xl mt-16 p-8 bg-secondary/30 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-secondary-foreground mb-6">Why Python Sprouts?</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left text-lg text-secondary-foreground/80">
          <div className="flex items-start space-x-3">
            <span className="text-2xl text-primary">🌱</span>
            <p><strong className="text-secondary-foreground">Playful Learning:</strong> We make coding fun with interactive examples and creative projects.</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl text-primary">🤖</span>
            <p><strong className="text-secondary-foreground">AI-Powered Guidance:</strong> Our friendly AI tutor is always here to help explain concepts and spark ideas.</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl text-primary">🐢</span>
            <p><strong className="text-secondary-foreground">Creative Freedom:</strong> Express yourself with Python Turtle and build a portfolio of your unique creations.</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-2xl text-primary">📖</span>
            <p><strong className="text-secondary-foreground">Kid-Friendly Design:</strong> Easy-to-read text, clear visuals, and intuitive navigation for young learners.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
