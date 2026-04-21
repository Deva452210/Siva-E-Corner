import ServiceCard from "./ServiceCard";
import { FileText, CreditCard, Landmark, Car } from "lucide-react";

export default function PopularServices() {
  return (
    <section id="services" className="py-20 px-4 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Popular Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            title="E-services"
            description="Comprehensive E-services for all your government-related documents."
            icon={<FileText className="w-8 h-8" />}
            link="/services"
          />
          <ServiceCard
            title="Card-services"
            description="Passport, Smart Card, Voter ID, and other essential cards."
            icon={<CreditCard className="w-8 h-8" />}
            link="/services"
          />
          <ServiceCard
            title="Banking-services"
            description="Account opening, money transfers, loans, and more."
            icon={<Landmark className="w-8 h-8" />}
            link="/services"
          />
          <ServiceCard
            title="Travel-services"
            description="SIVA Cabs for smooth, comfortable rides at affordable prices."
            icon={<Car className="w-8 h-8" />}
            link="#cabs"
          />
        </div>
      </div>
    </section>
  );
}
