import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
  display_order: number;
}

const ClientLogos = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const { data, error } = await supabase
        .from("client_logos")
        .select("*")
        .order("display_order");

      if (error) throw error;
      setLogos(data || []);
    } catch (error) {
      console.error("Failed to load client logos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (logos.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex justify-center items-center gap-12 flex-wrap">
        {logos.map((logo) => (
          <div key={logo.id} className="flex-shrink-0">
            <img 
              src={logo.logo_url} 
              alt={logo.name} 
              className="h-16 opacity-70 hover:opacity-100 transition-all" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
