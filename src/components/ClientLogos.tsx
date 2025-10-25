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
    <div className="mt-16 overflow-hidden">
      <div className="flex animate-scroll">
        {/* First set of logos */}
        {logos.map((logo, i) => (
          <div key={`first-${i}`} className="flex-shrink-0 mx-8">
            <img src={logo} alt={`Client ${i + 1}`} className="h-12 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all" />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, i) => (
          <div key={`second-${i}`} className="flex-shrink-0 mx-8">
            <img src={logo} alt={`Client ${i + 1}`} className="h-12 opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
