import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Linkedin, Facebook, Instagram, Youtube, Play } from "lucide-react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import logo from "@/assets/logo.png";
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

  const availableYears = [...new Set(items.map(item => item.year))].sort((a, b) => b - a);

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedItems.map((item) => {
                const isYouTube = item.content_type === "youtube";
                const aspectClass = isYouTube ? "aspect-video" : "aspect-[3/4]";
                
                return (
                  <div 
                    key={item.id} 
                    className={`group ${aspectClass} bg-gray-200 rounded-lg hover:shadow-xl transition-all overflow-hidden relative cursor-pointer`}
                    onClick={() => isYouTube && item.youtube_url && handleVideoClick(item.youtube_url)}
                  >
                    {item.cover_image_url ? (
                      <img 
                        src={item.cover_image_url} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                        <span className="text-gray-600 text-lg font-semibold px-4 text-center">
                          {item.title}
                        </span>
                      </div>
                    )}
                    
                    {/* Play button overlay for YouTube videos */}
                    {isYouTube && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-red-600 fill-red-600 ml-1" />
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-white">
                      <h3 className="text-lg font-bold mb-2 text-center">{item.title}</h3>
                      <p className="text-sm mb-1">{item.year}</p>
                      <p className="text-xs uppercase tracking-wider">{item.content_type}</p>
                      {item.category_name && (
                        <p className="text-xs mt-2 px-3 py-1 bg-white/20 rounded-full">{item.category_name}</p>
                      )}
                    </div>
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
