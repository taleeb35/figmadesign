import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="bg-[hsl(var(--dark-blue))] sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="bg-white rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center">
            <img src={logo} alt="Annual Reports" className="h-8 md:h-10" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              Infographic
            </a>
            <a href="#" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              Statics
            </a>
            <a href="#" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              About us
            </a>
          </nav>

          <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-6 rounded-full">
            Meeting
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
