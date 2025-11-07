// file: src/pages/Index.tsx

import { Button } from "@/components/ui/button";
import { Trophy, Plus, FileText, Loader2, BarChart3, Play } from "lucide-react"; 
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import ClientLogos from "@/components/ClientLogos";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// --- START: Interfaces (Ensure these match your database structure) ---
interface HomeHero {
  id: string;
  main_title: string | null;
  subtitle: string | null;
  description: string | null;
  cta_button_text: string | null;
  cta_button_link: string | null;
  video_url: string | null; // Used for the video player section
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
  title: string;
  description: string;
  display_order: number;
}
// --- END: Interfaces ---

// Helper function to convert YouTube URLs to embed format
const getYouTubeEmbedUrl = (url: string) => {
    // If it's already an embed URL, return it. Otherwise, try to extract ID.
    if (url.includes("embed")) return url;
    
    // Regex to extract video ID from common YouTube URL formats
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1` : url;
};


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
        supabase.from("timeline_items").select("*").order("display_order"),
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
      
      {/* Hero Section (Existing Content) */}
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
                {statistics.map((stat) => (
                  <div key={stat.id}>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.title}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              {hero?.video_url ? (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white">
                  {hero.video_url.includes('youtube.com') || hero.video_url.includes('youtu.be') ? (
                    <iframe
                      src={getYouTubeEmbedUrl(hero.video_url)}
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

          <ClientLogos />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Work Section (Existing Content) */}
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
      
      {/* Annual Report Section (Video in Laptop Frame) - Existing Fix */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content Column */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Introducing the Annual report’s Service
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                See the Process: From Data Complexity to Executive Clarity.
              </p>
            </div>
            
            {/* Laptop Video Column */}
            <div className="flex justify-center">
              {hero?.video_url ? (
                <div className="relative w-full max-w-lg mx-auto">
                  
                  {/* Laptop Screen Frame (Black) */}
                  <div className="relative bg-black border border-gray-900 rounded-lg shadow-2xl p-2 md:p-3">
                    
                    {/* Video Screen Area (16:9) */}
                    <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-white">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={getYouTubeEmbedUrl(hero.video_url)}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      {/* Play Icon Placeholder (mimics the image) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-80">
                            <Play className="w-8 h-8 text-gray-800 fill-gray-800 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Laptop Base / Stand (Gray Bar) */}
                  <div className="w-full h-3 md:h-4 bg-gray-300 rounded-b-lg mt-0.5" />
                  <div className="absolute left-1/4 right-1/4 h-1.5 md:h-2 bg-gray-400 bottom-[-10px] rounded-b-lg" />
                </div>
              ) : (
                <div className="w-full max-w-lg aspect-video rounded-xl bg-gray-300 flex items-center justify-center text-gray-700">
                  Video link missing.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Story Timeline Section (UPDATED) */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600">From Data Analysts to Report Leaders</p>
          </div>

          <div className="relative overflow-x-auto pb-8">
            {/* Horizontal Connector Line: Adjusted to start/end under the first and last card center. */}
            <div className="absolute top-[26px] left-[144px] right-[144px] h-0.5 bg-red-600 z-0 timeline-connector" />
            
            <div className="flex gap-8 min-w-max px-4 md:justify-center">
              {timeline.map((item, index) => (
                <div key={item.id} className="relative flex flex-col items-center w-64 md:w-56 lg:w-64 flex-shrink-0">
                    
                    {/* 1. Icon Bubble (Always on top of the line) */}
                    <div className="w-12 h-12 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center mb-4 z-10 shadow-lg timeline-icon">
                        {/* Using BarChart3 icon */}
                        <BarChart3 className="w-6 h-6 text-white" /> 
                    </div>
                    
                    {/* 2. Content Card */}
                    <div className="bg-muted rounded-xl p-6 w-full shadow-lg timeline-card">
                        <div className="text-2xl font-bold mb-3 text-foreground">{item.year}</div>
                        <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Existing Content) */}
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
