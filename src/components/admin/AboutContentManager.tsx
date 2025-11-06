import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AboutHeroManager } from "./AboutHeroManager";
import { AboutExperienceManager } from "./AboutExperienceManager";
import { AboutAdvantageManager } from "./AboutAdvantageManager";
import { CompanyValuesManager } from "./CompanyValuesManager";
import { TestimonialsManager } from "./TestimonialsManager";

export function AboutContentManager() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">About Us Page Content</h1>
      
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="advantage">Advantage</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <AboutHeroManager />
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <AboutExperienceManager />
        </TabsContent>

        <TabsContent value="advantage" className="mt-6">
          <AboutAdvantageManager />
        </TabsContent>

        <TabsContent value="values" className="mt-6">
          <CompanyValuesManager />
        </TabsContent>

        <TabsContent value="testimonials" className="mt-6">
          <TestimonialsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}