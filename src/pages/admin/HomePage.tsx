import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeHeroManager } from "@/components/admin/HomeHeroManager";
import { HomeStatisticsManager } from "@/components/admin/HomeStatisticsManager";
import { HomeServiceSectionManager } from "@/components/admin/HomeServiceSectionManager";
import { TimelineManager } from "@/components/admin/TimelineManager";
import { ClientLogosManager } from "@/components/admin/ClientLogosManager";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Home Page Content</h1>
      
      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="service">Service Section</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="logos">Client Logos</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-6">
          <HomeHeroManager />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <HomeStatisticsManager />
        </TabsContent>

        <TabsContent value="service" className="mt-6">
          <HomeServiceSectionManager />
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <TimelineManager />
        </TabsContent>

        <TabsContent value="logos" className="mt-6">
          <ClientLogosManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
