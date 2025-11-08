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
      <section className="px-6 md:px-12 lg:px-24 py-8 infographic">
        <div className="bg-[#C62828] rounded-r-lg py-6 px-8 inline-flex items-center gap-6">
          <h1 className="text-white text-4xl font-bold">Infographic</h1>
          <Share2 className="text-white w-10 h-10" strokeWidth={2.5} />
        </div>
      </section>

      <main className="py-12 px-6 md:px-12 lg:px-24 info_div_g">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="space-y-4">
              {infographics.map((infographic, index) => {
                const position = index % 5;
                
                // Pattern: landscape (0), then 4 squares (1-4), then landscape (5), etc.
                if (position === 0) {
                  // Landscape image (reduced height)
                  return (
                    <div
                      key={infographic.id}
                      className="w-full group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                      onClick={() => setSelectedIndex(index)}
                    >
                      <div className="overflow-hidden bg-gray-50 max-h-[400px]">
                        <img
                          src={infographic.image_url}
                          alt={infographic.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      {gridItems.map((item, gridIndex) => (
                        <div
                          key={item.id}
                          className="aspect-square group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                          onClick={() => setSelectedIndex(index + gridIndex)}
                        >
                          <div className="overflow-hidden bg-gray-50 w-full h-full">
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

      {/* Image Popup Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black/95">
          <div className="relative">
            {selectedImage && (
              <>
                <div className="flex items-center justify-center min-h-[60vh] max-h-[80vh] p-8">
                  <img
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                {/* Navigation Buttons */}
                {selectedIndex !== null && selectedIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
                    onClick={handlePrevious}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                )}
                
                {selectedIndex !== null && selectedIndex < infographics.length - 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full h-12 w-12"
                    onClick={handleNext}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                )}

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full h-10 w-10"
                  onClick={() => setSelectedIndex(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Image Title */}
                {selectedImage.title && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <CTASection />

      <Footer />
    </div>
  );
};

export default Infographic;
