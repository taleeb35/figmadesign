import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import reportsBanner from "@/assets/reports-banner.png";

type ContentItem = {
  id: string;
  title: string;
  year: number;
  content_type: string;
  cover_image_url?: string;
  category_id?: string;
  category_name?: string;
  youtube_url?: string;
  english_pdf_url?: string;
  arabic_pdf_url?: string;
  english_flipbook_url?: string;
  arabic_flipbook_url?: string;
  created_at: string;
};

type ContentCategory = {
  id: string;
  name: string;
};

const Reports = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("latest");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from("content_categories")
        .select("*")
        .order("name");
      
      // Fetch content items with categories
      const { data: itemsData } = await supabase
        .from("content_items")
        .select(`
          *,
          content_categories (
            name
          )
        `);

      setCategories(categoriesData || []);
      
      const itemsWithCategories = (itemsData || []).map(item => ({
        ...item,
        category_name: item.content_categories?.name
      }));
      
      setItems(itemsWithCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedItems = items
    .filter(item => {
      if (filterType !== "all" && item.content_type !== filterType) return false;
      if (filterCategory !== "all" && item.category_id !== filterCategory) return false;
      if (filterYear !== "all" && item.year.toString() !== filterYear) return false;
      return true;
    })
    .sort((a, b) => {
      // First, sort by content type (YouTube videos at the end)
      if (a.content_type === "youtube" && b.content_type !== "youtube") return 1;
      if (a.content_type !== "youtube" && b.content_type === "youtube") return -1;
      
      // Then sort by date
      if (sortOrder === "latest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
    });

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("youtube.com") 
      ? url.split("v=")[1]?.split("&")[0]
      : url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  };

  const handleVideoClick = (youtubeUrl: string) => {
    setSelectedVideo(youtubeUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleItemClick = (item: ContentItem) => {
    if (item.content_type === "youtube" && item.youtube_url) {
      handleVideoClick(item.youtube_url);
    }
  };

  const availableYears = [...new Set(items.map(item => item.year))].sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Section */}
      <section className="w-full border-b-2 border-blue-500 reportsBanner">
        <img src={reportsBanner} alt="Reports Banner" className="w-full h-auto" />
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Counter */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-500 text-white px-4 py-1 rounded text-sm font-semibold">
              {filteredAndSortedItems.length} Results
            </div>
          </div>

          {/* Filter Title */}
          <h3 className="text-lg font-bold mb-4">Filter Content by:</h3>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-8">
            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="flipbook">Flipbook</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Content</label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All content" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Content</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Year</label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Sort By</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Button 
                onClick={() => {
                  setFilterType("all");
                  setFilterCategory("all");
                  setFilterYear("all");
                  setSortOrder("latest");
                }}
                className="w-full bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent))]/90 text-white rounded-full"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Report Grid */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : filteredAndSortedItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No content found matching your filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 reports_div">
              {filteredAndSortedItems.map((item) => {
                const isYouTube = item.content_type === "youtube";
                const aspectClass = isYouTube ? "aspect-video" : "aspect-[3/4]";
                const enUrl = item.english_pdf_url || item.english_flipbook_url || null;
                const arUrl = item.arabic_pdf_url || item.arabic_flipbook_url || null;
                
                return (
                  <div key={item.id} className="flex flex-col">
                    <div 
                      className={`group ${aspectClass} bg-gray-200 rounded-lg hover:shadow-xl transition-all overflow-hidden relative ${isYouTube ? 'cursor-pointer' : ''}`}
                      {...(isYouTube ? { 
                        onClick: () => handleItemClick(item),
                        role: "button",
                        "aria-label": `Play ${item.title}`
                      } : {})}
                    >
                      {item.cover_image_url ? (
                        <img 
                          src={item.cover_image_url} 
                          alt={`${item.title} cover image`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                          <span className="text-gray-600 text-sm">No image</span>
                        </div>
                      )}
                      
                      {/* Play button overlay for YouTube videos only */}
                      {isYouTube && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-red-600 fill-red-600 ml-1" />
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                        <h3 className="text-white font-semibold text-sm line-clamp-2">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-white/80">{item.year}</span>
                          {item.category_name && (
                            <>
                              <span className="text-white/50">•</span>
                              <span className="text-xs text-white/80">{item.category_name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Language links below image for PDFs/Flipbooks */}
                    {(item.content_type === "pdf" || item.content_type === "flipbook") && (enUrl || arUrl) && (
                      <div className="flex justify-center items-center gap-2 text-sm font-semibold mt-2">
                        {enUrl && (
                          <a
                            href={enUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--accent))] hover:underline"
                            aria-label={`Open English ${item.content_type}`}
                          >
                            EN
                          </a>
                        )}
                        {enUrl && arUrl && <span className="text-gray-400">|</span>}
                        {arUrl && (
                          <a
                            href={arUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[hsl(var(--accent))] hover:underline"
                            aria-label={`Open Arabic ${item.content_type}`}
                          >
                            AR
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* YouTube Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && handleCloseVideo()}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogTitle className="sr-only">Video Player</DialogTitle>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {selectedVideo && (
              <iframe
                ref={videoRef}
                src={getYouTubeEmbedUrl(selectedVideo)}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Reports;
