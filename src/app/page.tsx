import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, Lightbulb, UserCircle, PlayCircle, Bot, Edit, BookOpen } from 'lucide-react'; // Added Bot, Edit, BookOpen
import Link from 'next/link';
import Image from 'next/image';
import { TurtleIcon } from '@/components/icons/turtle-icon'; // Assuming TurtleIcon is appropriate

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-12 py-8 md:py-16">
      <header className="space-y-6">
        <Sprout className="h-32 w-32 md:h-40 md:w-40 mx-auto text-primary drop-shadow-lg animate-bounceIn" />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
          Welcome to Python Sprouts!
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          Hey, future coder! Ready to plant the seeds of Python knowledge and watch your coding skills grow? Let&apos;s learn and create amazing things with code!
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Link href="/clarifier" passHref>
          <Card className="kid-friendly-card h-full flex flex-col bg-card hover:border-accent group">
            <CardHeader className="items-center">
              <Lightbulb className="h-20 w-20 text-secondary mb-4 transition-transform duration-300 group-hover:scale-110 animate-pulse" />
              <CardTitle className="text-3xl font-semibold">Concept Clarifier</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Python words like &quot;loop&quot; or &quot;variable&quot; seem tricky? Our AI friend explains them in simple, kid-friendly ways with fun examples!
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/turtle" passHref>
          <Card className="kid-friendly-card h-full flex flex-col bg-card hover:border-accent group">
            <CardHeader className="items-center">
               <TurtleIcon className="h-20 w-20 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
              <CardTitle className="text-3xl font-semibold">Turtle Showcase</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Code your own turtle to draw colorful pictures and patterns! Save your masterpieces and show them off.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile" passHref>
          <Card className="kid-friendly-card h-full flex flex-col bg-card hover:border-accent group">
            <CardHeader className="items-center">
              <UserCircle className="h-20 w-20 text-accent mb-4 transition-transform duration-300 group-hover:scale-110" />
              <CardTitle className="text-3xl font-semibold">Learner&apos;s Space</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-lg">
                Your personal coding hub! View your saved Turtle projects, find learning resources, and customize your coding journey.
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      </section>

      <div className="mt-16">
        <Link href="/turtle" passHref>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-2xl px-10 py-8 rounded-full kid-friendly-button shadow-xl">
            <PlayCircle className="mr-3 h-8 w-8" />
            Start Drawing with Code!
          </Button>
        </Link>
      </div>

       <section className="w-full max-w-5xl mt-20 p-8 bg-secondary/20 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-secondary-foreground mb-8">Why is Python Sprouts Awesome?</h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 text-left text-xl text-secondary-foreground/90">
          <div className="flex items-start space-x-4">
            <span className="text-4xl text-primary"><Sprout /></span>
            <p><strong className="text-secondary-foreground">Grow Your Skills:</strong> We make learning Python feel like a fun adventure, with exciting projects and clear explanations!</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-4xl text-primary"><Bot /></span>
            <p><strong className="text-secondary-foreground">Smart AI Helper:</strong> Our AI buddy is always ready to explain tricky concepts and give you coding ideas in a simple way!</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-4xl text-primary"><Edit /></span>
            <p><strong className="text-secondary-foreground">Create & Share:</strong> Design cool turtle art with code, save your projects, and show off your creations in your personal portfolio!</p>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-4xl text-primary"><BookOpen /></span>
            <p><strong className="text-secondary-foreground">Kid-Friendly Design:</strong> With large text, bright colors, and easy navigation, learning Python is a breeze for young minds!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
