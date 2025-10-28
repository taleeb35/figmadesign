import { useState } from "react";
import StatisticsCategoryForm from "./StatisticsCategoryForm";
import StatisticsCategoryList from "./StatisticsCategoryList";

const StatisticsCategoryManager = () => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setEditingCategory(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <StatisticsCategoryForm
        categoryId={editingCategory}
        onSuccess={handleSuccess}
        onCancel={() => setEditingCategory(null)}
      />
      <StatisticsCategoryList
        onEdit={setEditingCategory}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default StatisticsCategoryManager;
