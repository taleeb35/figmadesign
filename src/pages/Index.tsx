import { Button } from "@/components/ui/button";
import { Trophy, Plus, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import ClientLogos from "@/components/ClientLogos";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.png";

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  type FAQItem = { id: string; question: string; answer: string; display_order: number };
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loadingFaq, setLoadingFaq] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from("faqs")
          .select("*")
          .order("display_order", { ascending: true });
        if (error) throw error;
        setFaqs(data || []);
      } catch (err) {
        console.error("Error loading FAQs on home:", err);
      } finally {
        setLoadingFaq(false);
      }
    };
    fetchFAQs();
  }, []);

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

{loadingFaq ? (
            <div className="text-center text-gray-500">Loading FAQs...</div>
          ) : faqs.length === 0 ? (
            <div className="text-center text-gray-500">No FAQs available.</div>
          ) : (
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <Collapsible
                  key={item.id}
                  open={openFaq === i}
                  onOpenChange={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className={`bg-white rounded-xl border-2 transition-all ${openFaq === i ? 'border-blue-500' : 'border-gray-200'}`}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left py-4 px-6">
                      <span className="text-base font-normal">{item.question}</span>
                      <Plus className={`w-6 h-6 flex-shrink-0 ml-4 transition-all ${openFaq === i ? 'rotate-45 text-blue-500' : 'text-[hsl(var(--accent))]'}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-6 pb-4">
                      <p className="text-gray-600 text-sm">{item.answer}</p>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
