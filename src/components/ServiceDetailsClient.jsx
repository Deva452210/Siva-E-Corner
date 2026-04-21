"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ServiceDetailsClient({ initialService, initialSimilarServices, serviceId }) {
  const { data: services } = useSWR("/api/services", fetcher, {
    fallbackData: [initialService, ...initialSimilarServices], // Just to satisfy fallback, actual mapping below
    refreshInterval: 10000,
  });

  // Re-derive data from SWR cache
  const service = services?.find((s) => s.id === serviceId) || initialService;
  const similarServices = (services || initialSimilarServices)
    .filter((s) => s.category === service.category && s.id !== serviceId)
    .slice(0, 4);

  if (!service) return null;

  return (
    <>
      {/* Top Purple Banner Section */}
      <section className="bg-purple-800 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 opacity-90 z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 pt-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 border border-white/40 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/10 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            
            <div>
              <span className="inline-block border border-white/50 text-white/90 px-4 py-1 rounded-full text-sm font-medium mb-6">
                {service.category}
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                {service.title}
              </h1>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-white/90">Description:</h3>
                <p className="text-white/80 leading-relaxed max-w-3xl">
                  {service.description}
                </p>
              </div>
              
              <div className="text-2xl font-bold mb-10 flex items-center gap-3">
                Amount to pay: <span className="text-yellow-400">{service.amount}</span>
              </div>
              
              {/* Info Bar */}
              <div className="bg-[#240b36]/40 backdrop-blur-md border border-white/10 rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-white mb-2">No.of Documents</h4>
                  <p className="text-white/80 font-medium">{service.noOfDocuments}</p>
                </div>
                <div className="md:border-l md:border-white/20 md:pl-6">
                  <h4 className="font-bold text-white mb-2">Estimated Time</h4>
                  <p className="text-white/80 font-medium">{service.estimatedTime}</p>
                </div>
                <div className="md:border-l md:border-white/20 md:pl-6">
                  <h4 className="font-bold text-white mb-2">Processing Time</h4>
                  <p className="text-white/80 font-medium">{service.processingTime}</p>
                </div>
                <div className="md:border-l md:border-white/20 md:pl-6">
                  <h4 className="font-bold text-white mb-2">Language</h4>
                  <p className="text-white/80 font-medium">{service.language}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white text-black rounded-xl shadow-2xl p-8 relative top-4 md:top-12 border border-gray-100">
              <div className="absolute -top-3 right-6 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-sm shadow-sm">
                Essentials Service
              </div>
              
              <h3 className="text-xl font-extrabold mb-6 text-gray-900 border-b pb-4">
                Documents Required:
              </h3>
              
              <ol className="list-decimal pl-5 space-y-3 text-sm font-semibold text-gray-800">
                {service.documentsRequired?.map((doc, index) => (
                  <li key={index} className="pl-1 leading-snug">{doc}</li>
                ))}
              </ol>
              
              <Link 
                href={`/services/${service.id}/apply`}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 rounded-lg mt-8 transition-colors shadow-md block text-center"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Services Section */}
      {similarServices.length > 0 && (
        <section className="py-20 px-4 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Similar - Services</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarServices.map((simService) => (
                <Link 
                  href={`/services/${simService.id}`}
                  key={simService.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer"
                >
                  {/* Top Image/Gradient area */}
                  <div className={`h-48 ${simService.bgClass || 'bg-gray-800'} flex items-center p-6 relative overflow-hidden`}>
                    <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                      {simService.titleUpper}
                    </h3>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Bottom Text area */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-purple-600 transition-colors">
                      {simService.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-semibold mt-auto">
                      {simService.language}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
