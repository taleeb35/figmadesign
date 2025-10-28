import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Linkedin, Facebook, Instagram, Youtube } from "lucide-react";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import logo from "@/assets/logo.png";

type Statistic = {
  id: string;
  title: string;
  year: number;
  image_url?: string;
  external_link?: string;
  category_id?: string;
  category_name?: string;
};

type StatisticsCategory = {
  id: string;
  name: string;
};

const Statistics = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [categories, setCategories] = useState<StatisticsCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const { data: categoriesData } = await supabase
        .from("statistics_categories")
        .select("*")
        .order("name");
      
      const { data: statisticsData } = await supabase
        .from("statistics")
        .select(`
          *,
          statistics_categories (
            name
          )
        `)
        .order("created_at", { ascending: false });

      setCategories(categoriesData || []);
      
      const statisticsWithCategories = (statisticsData || []).map(item => ({
        ...item,
        category_name: item.statistics_categories?.name
      }));
      
      setStatistics(statisticsWithCategories);
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

      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Statistics</h1>

          <div className="flex gap-12">
            {/* Sidebar Filters */}
            <aside className="w-48 flex-shrink-0">
              <div className="space-y-4">
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
            </aside>

            {/* Statistics Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="text-center py-12">Loading...</div>
              ) : filteredStatistics.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No statistics found</div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStatistics.map((stat) => (
                    <div key={stat.id} className="group">
                      <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-3">
                        {stat.image_url ? (
                          <img
                            src={stat.image_url}
                            alt={stat.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                            <span className="text-gray-600 text-lg font-semibold px-4 text-center">
                              {stat.title}
                            </span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{stat.title}</h3>
                      {stat.external_link && (
                        <a
                          href={stat.external_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-[hsl(var(--accent))] hover:underline"
                        >
                          Source Link: <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Footer */}
      <footer className="bg-white pt-12 pb-0 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
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

            <div>
              <ul className="space-y-4 text-base">
                <li><a href="/" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Home</a></li>
                <li><a href="/reports" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Work</a></li>
                <li><a href="/statistics" className="font-bold text-gray-900 hover:text-[hsl(var(--accent))]">Statistics</a></li>
              </ul>
            </div>

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

          <div className="border-t border-gray-300 py-6 text-center">
            <p className="text-sm text-gray-700">@theannualreports - all rights reserved 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Statistics;
