import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Smart Travel Planner', path: '/smart-travel-planner' },
      { label: 'Cultural Storytelling', path: '/cultural-storytelling' },
      { label: 'Mood-Based Music', path: '/mood-based-music-experience' },
      { label: 'Voice Memories Studio', path: '/voice-memories-studio' }
    ],
    company: [
      { label: 'About Us', action: () => scrollToSection('about') },
      { label: 'Features', action: () => scrollToSection('features') },
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' }
    ],
    support: [
      { label: 'Help Center', path: '#' },
      { label: 'Contact Us', path: '#' },
      { label: 'Community', path: '#' },
      { label: 'API Documentation', path: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'Facebook', icon: 'Facebook', url: '#' },
    { name: 'Instagram', icon: 'Instagram', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element?.offsetTop - headerOffset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLinkClick = (link) => {
    if (link?.action) {
      link?.action();
    } else if (link?.path && link?.path !== '#') {
      navigate(link?.path);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-sunset flex items-center justify-center shadow-primary">
                  <Icon name="Compass" size={28} color="white" strokeWidth={2.5} />
                </div>
                <div className="ml-3">
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    EchoTour
                  </h3>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your AI-powered travel companion that transforms every journey into a personalized adventure filled with cultural discoveries and lasting memories.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200 group"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon 
                      name={social?.icon} 
                      size={18} 
                      className="group-hover:scale-110 transition-transform duration-200" 
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                {/* Product Links */}
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-6">
                    Product
                  </h4>
                  <ul className="space-y-4">
                    {footerLinks?.product?.map((link) => (
                      <li key={link?.label}>
                        <button
                          onClick={() => handleLinkClick(link)}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                        >
                          {link?.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-6">
                    Company
                  </h4>
                  <ul className="space-y-4">
                    {footerLinks?.company?.map((link) => (
                      <li key={link?.label}>
                        <button
                          onClick={() => handleLinkClick(link)}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                        >
                          {link?.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-6">
                    Support
                  </h4>
                  <ul className="space-y-4">
                    {footerLinks?.support?.map((link) => (
                      <li key={link?.label}>
                        <button
                          onClick={() => handleLinkClick(link)}
                          className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                        >
                          {link?.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h4 className="font-heading font-semibold text-foreground mb-2">
                Stay Updated
              </h4>
              <p className="text-muted-foreground">
                Get the latest travel tips and feature updates delivered to your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                variant="default"
                iconName="Send"
                iconPosition="right"
                iconSize={16}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} EchoTour. All rights reserved. Made with ❤️ for travelers worldwide.
            </div>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
            >
              <span>Back to top</span>
              <Icon 
                name="ArrowUp" 
                size={16} 
                className="group-hover:-translate-y-1 transition-transform duration-200" 
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;