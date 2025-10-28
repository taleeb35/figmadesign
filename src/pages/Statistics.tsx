import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Menu, Link as LinkIcon, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import CTASection from "@/components/CTASection";
import logo from "@/assets/logo.png";

const Statistics = () => {
  const [filters, setFilters] = useState({
    economic: false,
    sport: false,
    finance: false,
    leaders: false,
  });

  const statisticsData = [
    { title: "Countries with the best clean energy Producing - ranked based on best" },
    { title: "Countries with the best clean energy Producing - ranked based on best" },
    { title: "Countries with the best clean energy Producing - ranked based on best" },
    { title: "Countries with the best clean energy Producing - ranked based on best" },
    { title: "Countries with the best clean energy Producing - ranked based on best" },
    { title: "Countries with the best clean energy Producing - ranked based on best" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header with shadow */}
      <header className="bg-white sticky top-0 z-50 py-4 shadow-md">
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
              <a href="/statistics" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
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

      {/* Red Banner */}
      <section className="bg-[hsl(var(--accent))] py-8 px-8">
        <div className="flex items-center gap-4 max-w-md">
          <h1 className="text-white text-4xl md:text-5xl font-bold lowercase">statsitcs</h1>
          <Menu className="text-white w-10 h-10" strokeWidth={3} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[200px_1fr] gap-8">
            {/* Left Sidebar - Filters */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="economic"
                    checked={filters.economic}
                    onCheckedChange={(checked) => setFilters({ ...filters, economic: checked as boolean })}
                  />
                  <label htmlFor="economic" className="text-lg font-semibold cursor-pointer">
                    Economic
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="sport"
                    checked={filters.sport}
                    onCheckedChange={(checked) => setFilters({ ...filters, sport: checked as boolean })}
                  />
                  <label htmlFor="sport" className="text-lg font-semibold cursor-pointer">
                    Sport
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="finance"
                    checked={filters.finance}
                    onCheckedChange={(checked) => setFilters({ ...filters, finance: checked as boolean })}
                  />
                  <label htmlFor="finance" className="text-lg font-semibold cursor-pointer">
                    Finance
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="leaders"
                    checked={filters.leaders}
                    onCheckedChange={(checked) => setFilters({ ...filters, leaders: checked as boolean })}
                  />
                  <label htmlFor="leaders" className="text-lg font-semibold cursor-pointer">
                    Leaders
                  </label>
                </div>
              </div>

              {/* Note Box */}
              <div className="bg-gray-800 text-white p-6 rounded-lg mt-12">
                <h3 className="text-2xl font-bold mb-3">Note</h3>
                <p className="text-sm leading-relaxed">
                  Data Updated 2025. All figures are current and sourced from official regional and international reports.
                </p>
              </div>
            </div>

            {/* Right Content - Cards Grid */}
            <div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statisticsData.map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3] bg-gray-200"></div>
                    <div className="p-4">
                      <p className="text-sm font-medium mb-3 leading-snug">{item.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>Source Link:</span>
                        <LinkIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="bg-white pt-12 pb-0 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
            {/* Column 1: Logo and Description */}
            <div className="space-y-4">
              <img src={logo} alt="Annual Reports" className="h-10" />
              <p className="text-sm text-gray-700 leading-relaxed">
                The Annual Reports, Bespoke data analysis and visual reports for Gulf area governments and corporations since 2010.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <a href="#" className="hover:text-[hsl(var(--accent))]">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-[hsl(var(--accent))]">Terms & Conditions</a>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <ul className="space-y-4 text-base">
                <li><a href="/" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Home</a></li>
                <li><a href="/reports" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Work</a></li>
                <li><a href="#" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Gulf new's</a></li>
                <li><a href="#" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Infographic</a></li>
              </ul>
            </div>

            {/* Column 3: Contact Information */}
            <div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-gray-900">+971856784543</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-gray-900">info@annualreport.net</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <span className="text-base font-semibold text-gray-900">JLT, Dubai, 123 adress street</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Social Media Icons */}
            <div>
              <div className="flex items-center gap-6">
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Facebook">
                  <Facebook className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="Instagram">
                  <Instagram className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" aria-label="YouTube">
                  <Youtube className="w-5 h-5 text-white" strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="border-t border-gray-300 py-6 text-center">
            <p className="text-sm text-gray-700">@theannualreports - all rights reserved 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Statistics;
