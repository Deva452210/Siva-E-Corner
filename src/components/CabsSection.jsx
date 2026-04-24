import { Car } from "lucide-react";

export default function CabsSection() {
  return (
    <section id="cabs" className="py-20 px-4 bg-white text-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">SIVA Cabs</h2>
          <h3 className="text-2xl font-semibold mb-4 text-black">Make your travel Smoother</h3>
          <p className="text-lg mb-6 text-gray-700">
            All over Tamil Nadu & Kerala. Available 24x7. Enjoy smooth, comfortable rides at affordable prices, with guaranteed on-time pickup and drop-off.
          </p>
          <a href="tel:8300849109" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-bold text-lg hover:from-secondary hover:to-primary transition-all shadow-lg">
            <Car className="w-5 h-5" />
            Book Now
          </a>
        </div>
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-md h-64 bg-gray-50 rounded-2xl border-4 border-primary flex items-center justify-center shadow-2xl relative overflow-hidden">
            <Car className="w-32 h-32 text-primary opacity-20 absolute" />
            <span className="text-2xl font-bold z-10 text-primary">SIVA Travels</span>
          </div>
        </div>
      </div>
    </section>
  );
}
