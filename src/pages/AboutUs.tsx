import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

interface AboutHero {
  subtitle: string;
  main_title: string;
}

interface AboutExperience {
  title: string;
  description: string;
  years_text: string;
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
  stat3_value: string;
  stat3_label: string;
  image_url: string | null;
}

interface AboutAdvantage {
  title: string;
  description: string;
  image_url: string | null;
  point1: string;
  point2: string;
  point3: string;
  point4: string;
  point5: string;
  point6: string;
}

interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
}

interface Testimonial {
  quote: string;
  author_name: string;
  author_position: string;
  author_image_url: string | null;
}

const AboutUs = () => {
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState<AboutHero | null>(null);
  const [experience, setExperience] = useState<AboutExperience | null>(null);
  const [advantage, setAdvantage] = useState<AboutAdvantage | null>(null);
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const [heroData, expData, advData, valuesData, testimonialsData] = await Promise.all([
        supabase.from("about_hero").select("*").maybeSingle(),
        supabase.from("about_experience").select("*").maybeSingle(),
        supabase.from("about_advantage").select("*").maybeSingle(),
        supabase.from("company_values").select("*").order("display_order"),
        supabase.from("testimonials").select("*").order("display_order").limit(1)
      ]);

      if (heroData.data) setHero(heroData.data);
      if (expData.data) setExperience(expData.data);
      if (advData.data) setAdvantage(advData.data);
      if (valuesData.data) setValues(valuesData.data);
      if (testimonialsData.data) setTestimonials(testimonialsData.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Heart: () => <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
      Lightbulb: () => <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      Users: () => <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
      Zap: () => <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    };
    return icons[iconName] ? icons[iconName]() : icons.Heart();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gray-700 py-16 md:py-20 text-center">
        <p className="text-gray-400 text-lg mb-2">{hero?.subtitle || "About us"}</p>
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {hero?.main_title || "What set us apart?"}
        </h1>
      </section>

      {/* Our Experience Section */}
      {experience && (
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-[hsl(var(--accent))] mb-6">{experience.title}</h2>
                <p className="text-gray-800 leading-relaxed mb-8">{experience.description}</p>
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-5xl font-bold text-gray-800 mb-2">{experience.stat1_value}</div>
                    <div className="text-gray-700 font-semibold">{experience.stat1_label}</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-gray-800 mb-2">{experience.stat2_value}</div>
                    <div className="text-gray-700 font-semibold">{experience.stat2_label}</div>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-gray-800 mb-2">{experience.stat3_value}</div>
                    <div className="text-gray-700 font-semibold">{experience.stat3_label}</div>
                  </div>
                </div>
              </div>
              {experience.image_url ? (
                <img 
                  src={experience.image_url} 
                  alt={experience.title} 
                  className="aspect-[4/3] w-full object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="aspect-[4/3] bg-gray-200 rounded-lg shadow-md"></div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Our Advantage Section */}
      {advantage && (
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {advantage.image_url ? (
                <img 
                  src={advantage.image_url} 
                  alt={advantage.title} 
                  className="aspect-[4/3] w-full object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="aspect-[4/3] bg-gray-200 rounded-lg shadow-md"></div>
              )}
              <div>
                <h2 className="text-4xl font-bold text-[hsl(var(--accent))] mb-6">{advantage.title}</h2>
                <p className="text-gray-800 leading-relaxed mb-8">{advantage.description}</p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {advantage.point1 && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gray-600" />
                      <span className="text-[hsl(var(--accent))] font-semibold">{advantage.point1}</span>
                    </div>
                  )}
                  {advantage.point2 && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gray-600" />
                      <span className="text-[hsl(var(--accent))] font-semibold">{advantage.point2}</span>
                    </div>
                  )}
                  {advantage.point3 && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gray-600" />
                      <span className="text-[hsl(var(--accent))] font-semibold">{advantage.point3}</span>
                    </div>
                  )}
                  {advantage.point4 && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gray-600" />
                      <span className="text-[hsl(var(--accent))] font-semibold">{advantage.point4}</span>
                    </div>
                  )}
                  {advantage.point5 && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gray-600" />
                      <span className="text-[hsl(var(--accent))] font-semibold">{advantage.point5}</span>
                    </div>
                  )}
                  {advantage.point6 && (
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-gray-600" />
                      <span className="text-[hsl(var(--accent))] font-semibold">{advantage.point6}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What Makes us Different Section */}
      {values.length > 0 && (
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-2">What Makes us</h2>
              <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--accent))]">Different!</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div key={value.id} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-shadow">
                  <div className="text-[hsl(var(--accent))]">
                    {getIconComponent(value.icon_name)}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-[hsl(var(--accent))]">
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-[200px_1fr] gap-8 items-start">
                    <div className="flex justify-center md:justify-start">
                      {testimonial.author_image_url ? (
                        <img 
                          src={testimonial.author_image_url} 
                          alt={testimonial.author_name}
                          className="w-40 h-40 rounded-full object-cover border-4 border-pink-200"
                        />
                      ) : (
                        <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-pink-200"></div>
                      )}
                    </div>
                    <div>
                      <svg className="w-8 h-8 text-[hsl(var(--accent))] mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-800 leading-relaxed mb-6 text-lg">
                        {testimonial.quote}
                      </p>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">{testimonial.author_name}</p>
                        <p className="text-sm text-gray-600">{testimonial.author_position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <CTASection />
      <Footer />
    </div>
  );
};

export default AboutUs;
