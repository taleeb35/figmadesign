import { useState } from "react";
import InfographicsForm from "./InfographicsForm";
import InfographicsList from "./InfographicsList";

const InfographicsManager = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setEditingId(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Infographics Management</h2>
      <InfographicsForm
        infographicId={editingId}
        onSuccess={handleSuccess}
        onCancel={() => setEditingId(null)}
      />
      <InfographicsList
        onEdit={setEditingId}
        refreshTrigger={refreshTrigger}
      />
    </div>
  );
};

export default InfographicsManager;
