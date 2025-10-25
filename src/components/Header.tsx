import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Annual Reports" className="h-8 md:h-10" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 hover:text-[hsl(var(--accent))] transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-[hsl(var(--accent))] transition-colors">
              Infographic
            </a>
            <a href="#" className="text-gray-700 hover:text-[hsl(var(--accent))] transition-colors">
              Statics
            </a>
            <a href="#" className="text-gray-700 hover:text-[hsl(var(--accent))] transition-colors">
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
