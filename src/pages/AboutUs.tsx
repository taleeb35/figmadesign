import { Button } from "@/components/ui/button";
import { Heart, Lightbulb, Users, Zap, Check, Quote } from "lucide-react";
import { Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import CTASection from "@/components/CTASection";
import logo from "@/assets/logo.png";

const AboutUs = () => {
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
              <a href="/about" className="text-gray-800 hover:text-[hsl(var(--accent))] transition-colors font-medium">
                About us
              </a>
            </nav>

            <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-6 rounded-full">
              Meeting
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner - Dark Gray */}
      <section className="bg-gray-700 py-16 md:py-20 text-center">
        <p className="text-gray-400 text-lg mb-2">About us</p>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">What set us apart?</h1>
      </section>

      {/* Our Experience Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[hsl(var(--accent))] mb-6">Our Experience</h2>
              <p className="text-gray-800 leading-relaxed mb-8">
                Experience is the foundation of authority. For more than ten years, we have specialized in transforming vast, unstructured data into crystal-clear annual reports that drive executive action.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-5xl font-bold text-gray-800 mb-2">150+</div>
                  <div className="text-gray-700 font-semibold">Report</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gray-800 mb-2">15+</div>
                  <div className="text-gray-700 font-semibold">Years</div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-gray-800 mb-2">400+</div>
                  <div className="text-gray-700 font-semibold">Infographic</div>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gray-200 rounded-lg shadow-md"></div>
          </div>
        </div>
      </section>

      {/* Our Advantage Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-gray-200 rounded-lg shadow-md"></div>
            <div>
              <h2 className="text-4xl font-bold text-[hsl(var(--accent))] mb-6">Our Advantage</h2>
              <p className="text-gray-800 leading-relaxed mb-8">
                Our advantage extends far beyond simple design or automation. We are not a software tool; we are your strategic reporting partner. Our team combines over a decade of deep regional expertise with a proprietary analytical methodology,
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[hsl(var(--accent))] font-semibold">Specialization</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[hsl(var(--accent))] font-semibold">Clarity</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[hsl(var(--accent))] font-semibold">Strategy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[hsl(var(--accent))] font-semibold">Transparency</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[hsl(var(--accent))] font-semibold">Creativity</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-[hsl(var(--accent))] font-semibold">Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes us Different Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">What Makes us</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--accent))]">Different!</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <Heart className="w-12 h-12 text-[hsl(var(--accent))] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3">Passion</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We are driven by genuine passion for our mission, ensuring every solution is delivered with uncompromising commitment.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <Lightbulb className="w-12 h-12 text-[hsl(var(--accent))] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We are relentless in our pursuit of the next great idea, Ensuring our clients always maintain a market-leading advantage.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-[hsl(var(--accent))] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                We treat every client relationship as a strategic collaboration, bringing diverse expertise together to co-create comprehensive, solutions.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
              <Zap className="w-12 h-12 text-[hsl(var(--accent))] mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                standard we apply to everything we do. From the smallest detail to the largest outcome, we are committed to rigorous quality
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[hsl(var(--accent))]">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
                <div className="flex justify-center md:justify-start">
                  <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-pink-200"></div>
                </div>
                <div>
                  <Quote className="w-8 h-8 text-[hsl(var(--accent))] mb-4" />
                  <p className="text-gray-800 leading-relaxed mb-6 text-lg">
                    " When we began our journey over a decade ago as Data Specialists, we saw a fundamental need in the Middle East Gulf: to translate monumental achievement into unassailable, straightforward clarity. Raw data, no matter how vast, is only potential. Our mission has always been to transform that potential into your most trusted and high-impact asset—the Annual Report. "
                  </p>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Radwan Takieddin</p>
                    <p className="text-sm text-gray-600">CEO & Founder</p>
                  </div>
                </div>
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

export default AboutUs;
