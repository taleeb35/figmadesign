import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatisticsForm from "./StatisticsForm";
import StatisticsList from "./StatisticsList";
import StatisticsCategoryManager from "./StatisticsCategoryManager";

const StatisticsManager = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setEditingId(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Statistics Management</h2>
      
      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Statistics Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="items" className="space-y-6">
          <StatisticsForm
            statisticId={editingId}
            onSuccess={handleSuccess}
            onCancel={() => setEditingId(null)}
          />
          <StatisticsList
            onEdit={setEditingId}
            refreshTrigger={refreshTrigger}
          />
        </TabsContent>
        
        <TabsContent value="categories">
          <StatisticsCategoryManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsManager;
