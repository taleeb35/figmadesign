import { Button } from "@/components/ui/button";
import { Award, Trophy, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    { question: "What are you guys?" },
    { question: "How do you work?" },
    { question: "What services do you offer?" },
    { question: "How long does a project take?" },
    { question: "What are your pricing options?" },
    { question: "Do you offer ongoing support?" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[hsl(var(--dark-blue))] text-white pt-16 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                We Present your Achievement<br />to the <span className="text-[hsl(var(--accent))]">World</span>
              </h1>
              <p className="text-gray-300 mb-8 leading-relaxed max-w-xl">
                Elevate the business's value, build your customers' trust, and showcase your company in numbers. We transform your achievements into compelling visual stories that resonate with your audience and amplify your impact in the world.
              </p>
              <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-8 py-6 text-lg rounded-full">
                Book a Meeting
              </Button>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
                <div>
                  <div className="text-3xl font-bold">12+</div>
                  <div className="text-sm text-gray-400">Years of experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">20+</div>
                  <div className="text-sm text-gray-400">Company Partners</div>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-10 h-10 text-[hsl(var(--trophy-gold))]" fill="currentColor" />
                  <div>
                    <div className="text-xs font-semibold">No. 1</div>
                    <div className="text-xs text-gray-400">Digital Agency of the Year</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg h-96"></div>
            </div>
          </div>

          {/* Brand Icons */}
          <div className="mt-16 flex justify-between items-center opacity-30 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-12 h-12 bg-white/20 rounded"></div>
            ))}
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-600 mb-2">A taste of our</p>
            <h2 className="text-4xl md:text-5xl font-bold">Work</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-200 rounded-lg hover:shadow-xl transition-shadow"></div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-8 rounded-full">
              More work
            </Button>
          </div>
        </div>
      </section>

      {/* Annual Report Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                'The Annual Report:<br />Transformed from Data to Authority
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We create impactful, visually-balanced reports that transform data into authority. Our designs redefine reporting, positioning annual reports as essential, strategic documents that build trust and drive business growth for civil and government sectors alike.
              </p>
              <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-8 rounded-full">
                Watch Video
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-full max-w-md aspect-[16/10] bg-gray-800 rounded-lg shadow-2xl border-8 border-gray-900 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-0 right-0 h-8 bg-gray-300 rounded-b-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600">From Data Analytics to Report Authorities.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { year: "2010", label: "YEAR" },
              { year: "2010", label: "YEAR" },
              { year: "2010", label: "YEAR" },
              { year: "2025", label: "YEAR" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-gray-200 rounded-xl p-8 text-center h-32 flex flex-col items-center justify-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.label}
                  </div>
                  <div className="text-3xl font-bold mt-4">{item.year}</div>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[hsl(var(--accent))]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h2>
            <p className="text-gray-600">Question? Look here</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <Collapsible
                key={i}
                open={openFaq === i}
                onOpenChange={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className="border-b border-gray-300 pb-4">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left py-2">
                    <span className="text-lg font-medium">{item.question}</span>
                    <Plus className={`w-6 h-6 text-[hsl(var(--accent))] transition-transform ${openFaq === i ? 'rotate-45' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 text-gray-600">
                    <p>Answer content goes here. This is placeholder text for the FAQ answer.</p>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[hsl(var(--accent))] to-red-700 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Let the people know your<br />Achievement
          </h2>
          <Button className="bg-white hover:bg-gray-100 text-[hsl(var(--accent))] px-10 py-6 text-lg rounded-full font-semibold">
            Book a Meeting
          </Button>
        </div>
        {/* Decorative shapes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-lg rotate-12"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 md:px-12 lg:px-24 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                ANNUAL<br />
                <span className="text-[hsl(var(--accent))]">REPORTS</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                ANNUAL REPORTS is Your ideal choice for Data analytics and Annual report for Civil and governmental sector.
              </p>
              <div className="flex gap-2 text-xs">
                <a href="#" className="hover:text-[hsl(var(--accent))]">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-[hsl(var(--accent))]">Terms & Conditions</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[hsl(var(--accent))]">Home</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--accent))]">Work</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--accent))]">Gulf news</a></li>
                <li><a href="#" className="hover:text-[hsl(var(--accent))]">Infographic</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span>📞</span>
                  <span>+971582985443</span>
                </li>
                <li className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>info@annualreport.net</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>📍</span>
                  <span>421, Park Plaza, saudi arabia</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white hover:opacity-80">
                  f
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white hover:opacity-80">
                  in
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white hover:opacity-80">
                  ▶
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 pt-8 border-t">
            <p>gothencompany.com - All rights reserved 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
