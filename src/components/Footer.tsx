import { Shield, Mail, Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <img src="/favicon.ico" alt="Logo" className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">CDMS</h3>
                <p className="text-xs text-muted-foreground">Conviction Data Management</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Building trust in justice through secure, intelligent data management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#technology" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <a href="mailto:kr.ankit5002@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                kr.ankit5002@gmail.com
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Conviction Data Management System | All Rights Reserved
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Cyber Safety Campaign 2025 | IIT Bhubaneswar • Team ElevateX
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive" aria-hidden="true" />
            <span>by Team ElevateX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
