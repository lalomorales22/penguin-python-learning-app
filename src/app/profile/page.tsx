'use client';

import { usePortfolio } from '@/contexts/portfolio-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Edit3, Trash2, BookOpen, Settings, Star, Sprout } from 'lucide-react'; // Added Sprout
import { TurtleIcon } from '@/components/icons/turtle-icon';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';


export default function ProfilePage() {
  const { projects, removeProject } = usePortfolio();
  const { toast } = useToast();

  const handleDeleteProject = (id: string, title: string) => {
    removeProject(id);
    toast({
      title: 'Project Removed!',
      description: `Your masterpiece "${title}" has been removed from your Learner's Space.`,
      variant: 'destructive',
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 space-y-12 spacious-padding">
      <header className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-8 border-b-2 border-primary/20">
        <Image src="https://picsum.photos/seed/kidavatar/120/120" alt="Learner Avatar" width={120} height={120} className="rounded-full border-4 border-primary shadow-lg" data-ai-hint="happy child avatar"/>
        <div className="text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary flex items-center">
            <Sprout className="mr-3 h-10 w-10 text-accent" />
            Alex the Sprout
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Future Python Pro & Turtle Artist Extraordinaire!
          </p>
          <div className="mt-2 flex items-center justify-center sm:justify-start space-x-2 text-secondary">
            <Star className="h-6 w-6 fill-current" />
            <Star className="h-6 w-6 fill-current" />
            <Star className="h-6 w-6 fill-current" />
            <span className="text-md font-medium">Level 3 Coding Sprout</span>
          </div>
        </div>
        <Button variant="outline" className="ml-auto hidden sm:flex kid-friendly-button" size="lg">
            <Settings className="mr-2 h-5 w-5" />
            Customize Space
        </Button>
      </header>

      <section>
        <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
          <TurtleIcon className="mr-3 h-10 w-10 text-accent" />
          My Awesome Turtle Creations
        </h2>
        {projects.length === 0 ? (
          <Card className="text-center py-12 bg-muted/50 kid-friendly-card">
            <CardContent className="spacious-padding">
              <TurtleIcon className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
              <p className="text-2xl text-muted-foreground">Your Turtle Showcase is empty!</p>
              <p className="text-lg text-muted-foreground/80 mb-6">Time to make some art! Head to the Turtle Showcase to code your first drawing.</p>
              <Button asChild className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground kid-friendly-button px-8 py-6 text-xl">
                <Link href="/turtle">Let&apos;s Draw!</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 kid-friendly-card">
                <CardHeader className="easy-selection-padding">
                  <CardTitle className="text-2xl font-semibold text-primary truncate">{project.title}</CardTitle>
                  <CardDescription className="text-md">
                    Made on: {format(new Date(project.createdAt), 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3 easy-selection-padding">
                   <div className="relative h-48 w-full bg-secondary/10 rounded-lg mb-3 overflow-hidden shadow-inner">
                    <Image 
                      src={`https://picsum.photos/seed/${project.id}/400/300`} 
                      alt={`Artwork for ${project.title}`} 
                      layout="fill"
                      objectFit="cover"
                      className="opacity-90"
                      data-ai-hint="colorful abstract turtle"
                    />
                  </div>
                  <p className="text-md text-muted-foreground">My Secret Code:</p>
                  <pre className="bg-muted text-muted-foreground p-3 rounded-md overflow-x-auto text-sm font-mono h-32 shadow-inner">
                    <code>{project.code.substring(0, 250)}{project.code.length > 250 ? '...' : ''}</code>
                  </pre>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 border-t pt-4 easy-selection-padding">
                  <Button variant="outline" size="sm" className="kid-friendly-button">
                    <Edit3 className="mr-1 h-4 w-4" /> View/Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id, project.title)} className="kid-friendly-button">
                    <Trash2 className="mr-1 h-4 w-4" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
          <BookOpen className="mr-3 h-10 w-10 text-accent" />
          Helpful Learning Stuff
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-secondary/20 hover:shadow-lg transition-shadow kid-friendly-card">
            <CardHeader className="easy-selection-padding">
              <CardTitle className="text-xl text-secondary-foreground">Python Power-Up Guide</CardTitle>
            </CardHeader>
            <CardContent className="easy-selection-padding">
              <p className="text-secondary-foreground/80">Remember cool Python words like variables, loops, and functions!</p>
              <Button variant="link" className="p-0 h-auto mt-3 text-primary font-bold text-lg">Explore Guide &rarr;</Button>
            </CardContent>
          </Card>
          <Card className="bg-accent/10 hover:shadow-lg transition-shadow kid-friendly-card">
            <CardHeader className="easy-selection-padding">
              <CardTitle className="text-xl text-accent-foreground">Turtle Commands Cheat Sheet</CardTitle>
            </CardHeader>
            <CardContent className="easy-selection-padding">
              <p className="text-accent-foreground/80">Quick list of awesome Turtle commands and colors to make your drawings pop!</p>
               <Button variant="link" className="p-0 h-auto mt-3 text-primary font-bold text-lg">See Commands &rarr;</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
