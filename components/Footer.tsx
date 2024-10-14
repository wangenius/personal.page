import {Github, Linkedin, Twitter} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-center md:text-left">
            <p>&copy; 2023 wangenius@qq.com. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/wangenius" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;