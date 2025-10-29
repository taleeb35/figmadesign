import { useState } from "react";
import InfographicsForm from "./InfographicsForm";
import InfographicsList from "./InfographicsList";

const InfographicsManager = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSuccess = () => {
    setEditingId(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Infographics Management</h2>
      <div className="space-y-8">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{editingId ? "Edit" : "Add"} Infographic</h3>
          <InfographicsForm
            infographicId={editingId}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Infographics List</h3>
          <InfographicsList
            onEdit={handleEdit}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </div>
    </div>
  );
};

export default InfographicsManager;
