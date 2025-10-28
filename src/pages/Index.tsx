import { Button } from "@/components/ui/button";
import { Trophy, Plus, Linkedin, Facebook, Instagram, Youtube, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import Header from "@/components/Header";
import ClientLogos from "@/components/ClientLogos";
import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-image.png";
import ctaShape from "@/assets/cta-shape.png";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    { question: "What is the Annual Reports?" },
    { question: "How do you handle sensitive or confidential data?" },
    { question: "How long does the annual report process take?" },
    { question: "What is the typical end product? Is it digital, print, or both?" },
    { question: "what kind of historical data depth can you manage?" },
    { question: "How do you ensure the final report reflects Company Vision?" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
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
              <img src={heroImage} alt="Annual Reports Analytics" className="w-full h-auto rounded-2xl shadow-2xl" />
            </div>
          </div>

          {/* Client Logos Scrolling */}
          <ClientLogos />
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
            <p className="text-gray-600">From Data Analysts to Report Leaders.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { year: "2010", text: "Data Specialization: Focused on extracting data integrity and structure in complex Gulf markets." },
              { year: "2015", text: "Strategic Consolidation: Refined our services to directly link deep data analysis with C-suite objectives." },
              { year: "2020", text: "Visual Intelligence: Defined the benchmark for concise, high-impact visualization in regional reports." },
              { year: "2025", text: "Report Leaders: Solidified our position as the region's definitive reporting partner for the Gulf's top leaders." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-gray-100 rounded-2xl p-6 pt-8 text-center min-h-[200px] flex flex-col items-center">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white shadow-lg">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="text-3xl font-bold mb-3 mt-2">{item.year}</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-[hsl(var(--accent))]"></div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-2">FAQ</h2>
            <p className="text-gray-600">Question? Look here</p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <Collapsible
                key={i}
                open={openFaq === i}
                onOpenChange={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className={`bg-white rounded-xl border-2 transition-all ${openFaq === i ? 'border-blue-500' : 'border-gray-200'}`}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-left py-4 px-6">
                    <span className="text-base font-normal">{item.question}</span>
                    <Plus className={`w-6 h-6 flex-shrink-0 ml-4 transition-all ${openFaq === i ? 'rotate-45 text-blue-500' : 'text-[hsl(var(--accent))]'}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-4">
                    <p className="text-gray-600 text-sm">Answer content goes here. This is placeholder text for the FAQ answer.</p>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative w-full overflow-hidden rounded-2xl md:rounded-[28px] shadow-2xl"
            style={{ backgroundImage: `url(${ctaShape})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="px-6 md:px-10 lg:px-12 py-12 md:py-14 text-center">
              <h2 className="text-white mb-6 leading-tight">
                <span className="block text-lg md:text-xl font-medium">Let the people know your</span>
                <span className="block text-3xl md:text-4xl font-extrabold">Achievement</span>
              </h2>
              <Button className="bg-white hover:bg-white/90 text-gray-900 px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base rounded-full font-semibold shadow-md">
                Book a Meeting
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
            <div>
              <img src={logo} alt="Annual Reports" className="h-10 mb-4" />
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                The Annual Reports, Bespoke data analysis and visual reports for Gulf area governments and corporations since 2010.
              </p>
              <div className="flex gap-3 text-xs text-gray-700">
                <a href="#" className="hover:text-[hsl(var(--accent))]">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-[hsl(var(--accent))]">Terms & Conditions</a>
              </div>
            </div>

            <div>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="font-semibold text-gray-900 hover:text-[hsl(var(--accent))]">Home</a></li>
                <li><a href="#" className="font-semibold text-gray-900 hover:text-[hsl(var(--accent))]">Work</a></li>
                <li><a href="#" className="font-semibold text-gray-900 hover:text-[hsl(var(--accent))]">Gulf new's</a></li>
                <li><a href="#" className="font-semibold text-gray-900 hover:text-[hsl(var(--accent))]">Infographic</a></li>
              </ul>
            </div>

            <div>
              <ul className="space-y-3 text-sm text-gray-900">
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                  </div>
                  <span className="font-medium">+971856784543</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <span className="font-medium">info@annualreport.net</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <span className="font-medium">JLT, Dubai, 123 adress street</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-300 py-4 text-center text-xs text-gray-600">
            @theannualreports - all rights reserved 2025
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
