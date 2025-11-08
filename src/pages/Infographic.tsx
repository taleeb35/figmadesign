import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, ChevronLeft, ChevronRight, X } from "lucide-react";

type Infographic = {
  id: string;
  title: string;
  image_url: string;
};

const Infographic = () => {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInfographics();
  }, []);

  const fetchInfographics = async () => {
    try {
      const { data, error } = await supabase
        .from("infographics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInfographics(data || []);
    } catch (error) {
      console.error("Error fetching infographics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < infographics.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const selectedImage = selectedIndex !== null ? infographics[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Banner Section */}
      <section className="px-6 md:px-12 lg:px-24 py-8">
        <div className="bg-[#C62828] rounded-r-lg py-6 px-8 inline-flex items-center gap-6">
          <h1 className="text-white text-4xl font-bold lowercase">Infographic</h1>
          <Share2 className="text-white w-10 h-10" strokeWidth={2.5} />
        </div>
      </section>

      <main className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-4">
              {infographics.map((infographic, index) => {
                const position = index % 5;
                
                // Pattern: landscape (0), then 4 squares (1-4), then landscape (5), etc.
                if (position === 0) {
                  // Landscape image (full width)
                  return (
                    <div
                      key={infographic.id}
                      className="w-full group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedIndex(index)}
                    >
                      <div className="overflow-hidden bg-gray-50">
                        <img
                          src={infographic.image_url}
                          alt={infographic.title}
                          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  );
                } else if (position === 1) {
                  // Start of 2x2 grid - render grid container with this and next 3 items
                  const gridItems = infographics.slice(index, index + 4);
                  return (
                    <div key={`grid-${infographic.id}`} className="grid grid-cols-2 gap-4">
                      {gridItems.map((item) => (
                        <div
                          key={item.id}
                          className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                          onClick={() => setSelectedIndex(index + (position - 1))}
                        >
                          <div className="overflow-hidden bg-gray-50">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
                // Skip positions 2, 3, 4 as they're rendered in the grid above
                return null;
              })}
            </div>
          )}

          {!loading && infographics.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No infographics available yet.
            </div>
          )}
        </div>
      </main>

      <CTASection />

      <Footer />
    </div>
  );
};

export default Infographic;
