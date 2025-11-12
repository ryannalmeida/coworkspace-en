
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b">
      <div className="container-custom mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">Cowork</span>
            <span className="text-xl font-light">Space</span>
          </a>
        </div>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
          <a href="#memberships" className="text-sm font-medium hover:text-primary transition-colors">
            Memberships
          </a>
          <a href="#amenities" className="text-sm font-medium hover:text-primary transition-colors">
            Amenities
          </a>
          <a href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">
            Gallery
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
          <Button>Schedule a Visit</Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b animate-fade-in">
          <nav className="container-custom py-4 flex flex-col gap-4">
            <a 
              href="#about" 
              className="px-2 py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#memberships" 
              className="px-2 py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Memberships
            </a>
            <a 
              href="#amenities" 
              className="px-2 py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Amenities
            </a>
            <a 
              href="#gallery" 
              className="px-2 py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </a>
            <a 
              href="#contact" 
              className="px-2 py-2 text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Schedule a Visit</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
