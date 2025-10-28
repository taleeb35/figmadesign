import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import logo from "@/assets/logo.png";
import reportsBanner from "@/assets/reports-banner.png";

const Reports = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Section */}
      <section className="w-full border-b-2 border-blue-500">
        <img src={reportsBanner} alt="Reports Banner" className="w-full h-auto" />
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Counter */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 text-white px-4 py-1 rounded text-sm font-semibold">
              1440 ⊞ 224
            </div>
          </div>

          {/* Filter Title */}
          <h3 className="text-lg font-bold mb-4">Filter Content by:</h3>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-8">
            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annual">Annual Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="special">Special Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Country</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uae">UAE</SelectItem>
                  <SelectItem value="saudi">Saudi Arabia</SelectItem>
                  <SelectItem value="kuwait">Kuwait</SelectItem>
                  <SelectItem value="qatar">Qatar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Content</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="sustainability">Sustainability</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Year</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white rounded-full">
                Filter
              </Button>
            </div>
          </div>

          {/* Report Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg hover:shadow-xl transition-shadow"></div>
            ))}
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

export default Reports;
