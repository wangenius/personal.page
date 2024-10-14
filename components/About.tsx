import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Lightbulb, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">About Me</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Code className="mb-2 h-8 w-8" />
              <CardTitle>Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Passionate about creating efficient and elegant code solutions.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Lightbulb className="mb-2 h-8 w-8" />
              <CardTitle>Innovator</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Always exploring new ideas and pushing the boundaries of technology.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Rocket className="mb-2 h-8 w-8" />
              <CardTitle>Startup Enthusiast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Constantly seeking opportunities to bring innovative solutions to life.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;