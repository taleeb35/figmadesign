import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Menu, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

interface Statistic {
  id: string;
  title: string;
  year: number;
  image_url: string;
  external_link: string;
  category_id?: string;
  category_name?: string;
}

interface ContentCategory {
  id: string;
  name: string;
}

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [categories, setCategories] = useState<ContentCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<Statistic | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statisticsRes, categoriesRes] = await Promise.all([
        supabase
          .from("statistics")
          .select(`
            *,
            content_categories (
              name
            )
          `)
          .order("year", { ascending: false }),
        supabase
          .from("content_categories")
          .select("*")
          .order("name"),
      ]);

      if (statisticsRes.error) throw statisticsRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      const statisticsWithCategories = (statisticsRes.data || []).map(item => ({
        ...item,
        category_name: item.content_categories?.name
      }));

      setStatistics(statisticsWithCategories);
      setCategories(categoriesRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredStatistics = selectedCategories.length === 0
    ? statistics
    : statistics.filter(stat => stat.category_id && selectedCategories.includes(stat.category_id));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Banner Section */}
      <section className="px-4 md:px-12 lg:px-24 py-6 md:py-8">
        <div className="bg-[#C62828] rounded-r-lg py-4 px-6 md:py-6 md:px-8 inline-flex items-center gap-4 md:gap-6">
          <h1 className="text-white text-2xl md:text-4xl font-bold lowercase">statistics</h1>
          <Menu className="text-white w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-6 md:py-12 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-48 flex-shrink-0">
              <div className="bg-muted/30 rounded-lg p-4 lg:bg-transparent lg:p-0">
                <h2 className="font-semibold mb-4 lg:hidden">Filter by Category</h2>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:space-y-4 lg:gap-0">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Statistics Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-12">Loading...</div>
              ) : filteredStatistics.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No statistics found</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredStatistics.map((stat) => (
                    <div key={stat.id} className="bg-card rounded-lg border p-4 hover:shadow-lg transition-shadow">
                      <img 
                        src={stat.image_url} 
                        alt={stat.title} 
                        className="w-full object-contain rounded-md mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedImage(stat)}
                      />
                      <h3 className="font-semibold text-lg mb-2">{stat.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">Year: {stat.year}</p>
                      {stat.category_name && (
                        <p className="text-xs text-muted-foreground mb-3">{stat.category_name}</p>
                      )}
                      <a 
                        href={stat.external_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Source
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedImage && (
            <div className="relative bg-black">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Statistics;
