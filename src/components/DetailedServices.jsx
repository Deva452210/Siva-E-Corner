import { FileText, Landmark } from "lucide-react";

export default function DetailedServices() {
  return (
    <section id="details" className="py-20 px-4 bg-white text-black">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* E-Services */}
        <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-8 rounded-2xl shadow-lg border-l-4 border-primary">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-4">E-Services</h3>
            <p className="text-gray-700 mb-6">
              Elevate your experience with our comprehensive E-services for all your government-related documents. As a trusted and authorized partner of both Central and State Governments, we ensure seamless and reliable service.
            </p>
          </div>
          <div className="flex-shrink-0">
            <FileText className="w-24 h-24 text-primary opacity-20" />
          </div>
        </div>

        {/* Banking Services */}
        <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-gray-50 p-8 rounded-2xl shadow-lg border-r-4 border-primary">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-4">Banking-Services</h3>
            <p className="text-gray-700 mb-6">
              Discover a full suite of banking services tailored to meet your needs, including account opening, money transfers, loans, and more. As certified agents within the banking sector, we offer a secure and trustworthy experience.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Landmark className="w-24 h-24 text-primary opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
