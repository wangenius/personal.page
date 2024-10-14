import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Project 1',
    description: 'A brief description of Project 1 and its key features.',
    link: '#',
  },
  {
    title: 'Project 2',
    description: 'An overview of Project 2 and its main functionalities.',
    link: '#',
  },
  {
    title: 'Project 3',
    description: 'Highlights of Project 3 and its unique selling points.',
    link: '#',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">My Projects</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;