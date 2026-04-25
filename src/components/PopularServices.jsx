import ServiceCard from "./ServiceCard";
import { FileText, CreditCard, Landmark, Car } from "lucide-react";

export default function PopularServices() {
  return (
    <section id="services" className="py-20 px-4 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Popular Services</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          <ServiceCard
            title="E-services"
            description="Comprehensive E-services for all your government-related documents."
            image="/services/e-service.avif"
            link="/services?category=E-Service"
          />
          <ServiceCard
            title="Card-services"
            description="Passport, Smart Card, Voter ID, and other essential cards."
            image="/services/card-service.avif"
            link="/services?category=Card Service"
          />
          <ServiceCard
            title="Banking-services"
            description="Account opening, money transfers, loans, and more."
            image="/services/bank-service.avif"
            link="/services?category=Bank Service"
          />
        </div>
      </div>
    </section>
  );
}
