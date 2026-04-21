import { Award } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white text-black py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary">SIVA E-Corner</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Siva is a trusted and authorized service provider offering a range of essential services to meet your diverse needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services" className="bg-primary text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-secondary transition-colors shadow-lg">
            Explore Services
          </Link>
          <a href="#contact" className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-primary hover:text-white transition-colors shadow-lg">
            Get In Touch
          </a>
        </div>
        <div className="mt-12 flex items-center justify-center gap-4 text-sm font-bold text-black">
          <Award className="w-5 h-5 text-primary" />
          <span>Accredited and Trusted Partner</span>
        </div>
      </div>
    </section>
  );
}
