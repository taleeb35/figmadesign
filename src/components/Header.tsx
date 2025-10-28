import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
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
            <a href="/reports" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              Reports
            </a>
            <a href="/content" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              Content
            </a>
            <a href="/infographic" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              Infographic
            </a>
            <a href="/statistics" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              Statics
            </a>
            <a href="/about" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
              About us
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden md:block bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-6 rounded-full">
              Meeting
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <nav className="flex flex-col gap-6 mt-8">
                  <a href="/" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium text-lg">
                    Home
                  </a>
                  <a href="/reports" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium text-lg">
                    Reports
                  </a>
                  <a href="/content" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium text-lg">
                    Content
                  </a>
                  <a href="/infographic" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium text-lg">
                    Infographic
                  </a>
                  <a href="/statistics" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium text-lg">
                    Statics
                  </a>
                  <a href="/about" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium text-lg">
                    About us
                  </a>
                  <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-6 rounded-full mt-4">
                    Meeting
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
