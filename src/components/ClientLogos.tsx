import logo1 from "@/assets/clients/logo-1.png";
import logo2 from "@/assets/clients/logo-2.png";
import logo3 from "@/assets/clients/logo-3.png";
import logo4 from "@/assets/clients/logo-4.png";
import logo5 from "@/assets/clients/logo-5.png";
import logo6 from "@/assets/clients/logo-6.png";
import logo7 from "@/assets/clients/logo-7.png";

const ClientLogos = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <div className="mt-16">
      <div className="flex justify-center items-center gap-12 flex-wrap">
        {logos.map((logo, i) => (
          <div key={i} className="flex-shrink-0">
            <img src={logo} alt={`Client ${i + 1}`} className="h-16 opacity-70 hover:opacity-100 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
