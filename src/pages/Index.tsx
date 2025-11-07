import { Button } from "@/components/ui/button";
import { Trophy, Plus, FileText, Loader2 , BarChart3} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import ClientLogos from "@/components/ClientLogos";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

interface HomeHero {
  id: string;
  main_title: string;
  subtitle: string;
  description: string;
  cta_button_text: string;
  cta_button_link: string;
  video_url: string | null;
}

interface HomeStatistic {
  id: string;
  title: string;
  value: string;
  display_order: number;
}

interface TimelineItem {
  id: string;
  year: number;
  description: string;
}

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  type FAQItem = { id: string; question: string; answer: string; display_order: number };
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loadingFaq, setLoadingFaq] = useState(true);
  
  const [hero, setHero] = useState<HomeHero | null>(null);
  const [statistics, setStatistics] = useState<HomeStatistic[]>([]);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
    fetchFAQs();
  }, []);

  const fetchContent = async () => {
    try {
      const [heroRes, statsRes, timelineRes] = await Promise.all([
        supabase.from("home_hero").select("*").maybeSingle(),
        supabase.from("home_statistics").select("*").order("display_order"),
        supabase.from("timeline_items").select("*").order("year"),
      ]);

      if (heroRes.error) throw heroRes.error;
      if (statsRes.error) throw statsRes.error;
      if (timelineRes.error) throw timelineRes.error;

      setHero(heroRes.data);
      setStatistics(statsRes.data || []);
      setTimeline(timelineRes.data || []);
    } catch (error) {
      console.error("Error loading home content:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[hsl(var(--dark-blue))] text-white pt-16 pb-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {hero?.subtitle && (
                <p className="text-sm uppercase tracking-wider text-gray-300 mb-4">{hero.subtitle}</p>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {hero?.main_title || "We Present your Achievement to the World"}
              </h1>
              <p className="text-gray-300 mb-8 leading-relaxed max-w-xl">
                {hero?.description || "Elevate the business's value, build your customers' trust, and showcase your company in numbers."}
              </p>
              <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white px-8 py-6 text-lg rounded-full">
                {hero?.cta_button_text || "Book a Meeting"}
              </Button>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
                {statistics.map((stat) => (
                  <div key={stat.id}>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.title}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Video Section */}
            <div className="hidden lg:block">
              {hero?.video_url ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white">
                  {hero.video_url.includes('youtube.com') || hero.video_url.includes('youtu.be') ? (
                    <iframe
                      src={hero.video_url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={hero.video_url}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ) : (
                <div className="w-full aspect-video rounded-2xl bg-white/10 flex items-center justify-center">
                  <p className="text-gray-400">No video uploaded</p>
                </div>
              )}
            </div>
          </div>

          {/* Client Logos */}
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

      
<section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
    <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center authority">
            
            {/* Text Content Column */}
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Introducing the Annual report’s Service
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed Process">
                    See the Process: From Data Complexity to Executive Clarity.
                </p>
            </div>

            {/* Video Player Column - Using laptop.webp as the frame */}
            {/* STATIC IMAGE COLUMN */}
            <div className="flex justify-center">
                {/* Display only the static laptop image from the public folder */}
                <img 
                    src="/laptop.webp" 
                    alt="Laptop Video Frame" 
                    className="w-full max-w-lg h-auto" 
                    loading="lazy"
                />
            </div>
        </div>
    </div>
</section>


      {/* Story Timeline Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
                    <p className="text-gray-600">From Data Analysts to Report Leaders</p>
                </div>
        
                {/* Timeline Container */}
                <div className="relative overflow-x-auto pb-8">
                    {/* Horizontal Connector Line (Runs the length of the container) */}
                    <div className="absolute top-[26px] left-0 right-0 h-0.5 bg-red-600 z-0 timeline-connector" />
                    
                    <div className="flex gap-8 min-w-max px-4 md:justify-center">
                        {timeline.map((item, index) => (
                            <div key={item.id} className="relative flex flex-col items-center w-64 md:w-56 lg:w-64 flex-shrink-0">
                                
                                {/* 1. Icon Bubble (Always on top of the line) */}
                                <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center mb-4 z-10 shadow-lg timeline-icon">
                                    {/* REPLACEMENT: Using <img> tag for the external icon image */}
                                    <img 
                                       src="/fluent_data-trending-32-regular.png" // Assumes the file is placed in the 'public' directory
                                       alt="Data Trending Icon" 
                                       className="w-6 h-6 timeline-custom-icon"
                                    /> 
                                </div>
                                
                                {/* 2. Content Card */}
                                <div className="bg-gray-100 rounded-xl p-6 w-full shadow-lg timeline-card">
                                    <div className="text-2xl font-bold mb-3 text-foreground">{item.year}</div>
                                    {/* You need to fetch item.title to match the image, not just description */}
                                    <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
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
