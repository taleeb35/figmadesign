import { Button } from "@/components/ui/button";
import ctaShape from "@/assets/cta-shape.png";

const CTASection = () => {
  return (
    <section className="py-12 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative w-full overflow-hidden rounded-2xl md:rounded-[28px] shadow-2xl"
          style={{ backgroundImage: `url(${ctaShape})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          {/* Darker red curves on sides */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-32 lg:w-40 bg-gradient-to-r from-red-800/40 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-32 lg:w-40 bg-gradient-to-l from-red-800/40 to-transparent pointer-events-none"></div>
          
          <div className="px-6 md:px-10 lg:px-12 py-12 md:py-14 text-center relative z-10">
            <h2 className="text-white mb-6 leading-tight">
              <span className="block text-lg md:text-xl font-medium">Let the people know your</span>
              <span className="block text-3xl md:text-4xl font-extrabold">Achievement</span>
            </h2>
            <Button className="bg-white hover:bg-white/90 text-gray-900 px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base rounded-full font-semibold shadow-md">
              Book a Meeting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
