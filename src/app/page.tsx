import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PenguinLogo } from '@/components/icons/penguin-logo';
import { PenguinIcon } from '@/components/icons/penguin-icon';
import { Lightbulb, PlayCircle, UserCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 py-8 md:py-16">
      <header className="space-y-6">
        <PenguinLogo className="h-32 w-32 md:h-40 md:w-40 mx-auto text-primary drop-shadow-lg" />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
          Welcome to Penguin Python!
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Hey there, little coder! Get ready to waddle into the super fun world of Python with your pal, Maximus! Let&apos;s learn and create amazing things together!
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Link href="/clarifier" passHref>
          <Card className="kid-friendly-card h-full flex flex-col bg-card hover:border-accent group">
            <CardHeader className="items-center">
              <Lightbulb className="h-20 w-20 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110" />
              <CardTitle className="text-3xl font-semibold">Concept Helper</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Python words confusing? Our smart AI friend explains tricky stuff in a super simple way, just for kids!
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/penguin-playground" passHref>
          <Card className="kid-friendly-card h-full flex flex-col bg-card hover:border-accent group">
            <CardHeader className="items-center">
               <Image src="https://picsum.photos/seed/penguinart/100/100" alt="Penguin Coding Fun" width={80} height={80} className="rounded-full mb-4 transition-transform duration-300 group-hover:scale-110" data-ai-hint="cute penguin coding" />
              <CardTitle className="text-3xl font-semibold">Penguin Playground</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Let&apos;s draw with code! Tell your penguin what to do and watch it create cool pictures. Save your awesome art!
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/maximus-hub" passHref>
          <Card className="kid-friendly-card h-full flex flex-col bg-card hover:border-accent group">
            <CardHeader className="items-center">
              <UserCircle className="h-20 w-20 text-accent mb-4 transition-transform duration-300 group-hover:scale-110" />
              <CardTitle className="text-3xl font-semibold">Maximus&apos;s Hub</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                This is YOUR space! See all your cool Penguin creations, find new coding adventures, and make Python your superpower!
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>

      <div className="mt-16">
        <Link href="/penguin-playground" passHref>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-2xl px-10 py-8 rounded-full kid-friendly-button shadow-xl">
            <PlayCircle className="mr-3 h-8 w-8" />
            Start Coding Now!
          </Button>
        </Link>
      </div>

       <section className="w-full max-w-5xl mt-20 p-8 bg-secondary/20 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-secondary-foreground mb-8">Why is Penguin Python So Cool?</h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 text-left text-xl text-secondary-foreground/90">
          <div className="flex items-start space-x-4">
            <span className="text-3xl text-primary">🐧</span>
            <p><strong className="text-secondary-foreground">Super Fun Learning:</strong> We make coding feel like a game with awesome projects and playful penguins!</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-3xl text-primary">🤖</span>
            <p><strong className="text-secondary-foreground">Clever AI Pals:</strong> Our AI buddies are always here to explain things and give you cool coding ideas!</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-3xl text-primary">🎨</span>
            <p><strong className="text-secondary-foreground">Be a Code Artist:</strong> Make your penguin draw anything you can imagine and show off your creations!</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-3xl text-primary">📖</span>
            <p><strong className="text-secondary-foreground">Easy Peasy for Kids:</strong> Big text, bright colors, and simple navigation make learning a breeze!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
