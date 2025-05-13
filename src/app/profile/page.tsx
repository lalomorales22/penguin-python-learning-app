'use client';

import { usePortfolio } from '@/contexts/portfolio-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, Edit3, Trash2, BookOpen, Settings, Star } from 'lucide-react';
import { TurtleIcon } from '@/components/icons/turtle-icon';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function ProfilePage() {
  const { projects, removeProject } = usePortfolio();
  const { toast } = useToast();

  const handleDeleteProject = (id: string, title: string) => {
    removeProject(id);
    toast({
      title: 'Project Removed',
      description: `"${title}" has been removed from your portfolio.`,
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <header className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pb-8 border-b-2 border-primary/20">
        <Image src="https://picsum.photos/seed/avatar1/120/120" alt="User Avatar" width={120} height={120} className="rounded-full border-4 border-primary shadow-lg" data-ai-hint="playful avatar"/>
        <div className="text-center sm:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            Alex the Explorer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Aspiring Python Coder & Turtle Artist
          </p>
          <div className="mt-2 flex items-center justify-center sm:justify-start space-x-2 text-secondary">
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <Star className="h-5 w-5 fill-current" />
            <span className="text-sm font-medium">Level 3 Sprout</span>
          </div>
        </div>
        <Button variant="outline" className="ml-auto hidden sm:flex" size="lg">
            <Settings className="mr-2 h-5 w-5" />
            Edit Profile
        </Button>
      </header>

      <section>
        <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
          <TurtleIcon className="mr-3 h-8 w-8 text-accent" />
          My Turtle Masterpieces
        </h2>
        {projects.length === 0 ? (
          <Card className="text-center py-12 bg-muted/50">
            <CardContent>
              <TurtleIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Your portfolio is looking a bit empty!</p>
              <p className="text-md text-muted-foreground/80">Head over to the Turtle Showcase to create your first project.</p>
              <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
                <a href="/turtle">Create New Project</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-primary truncate">{project.title}</CardTitle>
                  <CardDescription className="text-sm">
                    Created: {format(new Date(project.createdAt), 'MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                   <div className="relative h-40 w-full bg-secondary/10 rounded-md mb-3 overflow-hidden">
                    <Image 
                      src={`https://picsum.photos/seed/${project.id}/300/200`} 
                      alt={`Thumbnail for ${project.title}`} 
                      layout="fill"
                      objectFit="cover"
                      className="opacity-80"
                      data-ai-hint="abstract code art"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Code Snippet:</p>
                  <pre className="bg-muted text-muted-foreground p-3 rounded-md overflow-x-auto text-xs font-mono h-28 shadow-inner">
                    <code>{project.code.substring(0, 200)}{project.code.length > 200 ? '...' : ''}</code>
                  </pre>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2 border-t pt-4">
                  <Button variant="outline" size="sm">
                    <Edit3 className="mr-1 h-4 w-4" /> View/Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id, project.title)}>
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
          <BookOpen className="mr-3 h-8 w-8 text-accent" />
          Learning Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-secondary/20 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-secondary-foreground">Python Basics Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-secondary-foreground/80">Revisit fundamental Python concepts like variables, loops, and functions.</p>
              <Button variant="link" className="p-0 h-auto mt-2 text-primary">Explore Guide &rarr;</Button>
            </CardContent>
          </Card>
          <Card className="bg-accent/10 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-accent-foreground">Turtle Graphics Cheatsheet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-accent-foreground/80">Quick reference for common Turtle commands and colors.</p>
               <Button variant="link" className="p-0 h-auto mt-2 text-primary">View Cheatsheet &rarr;</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
