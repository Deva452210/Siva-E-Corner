"use client";
import { useState } from "react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const categories = ["E-Service", "Card Service", "Bank Service"];

export default function ServicesTabs({ initialServices }) {
  const [activeTab, setActiveTab] = useState("E-Service");

  // useSWR will instantly return initialServices, then fetch in the background
  const { data: services } = useSWR("/api/services", fetcher, {
    fallbackData: initialServices,
    refreshInterval: 10000, // Optional: auto-refresh every 10 seconds while tab is open
  });

  const currentServices = services || initialServices;
  const filteredServices = currentServices.filter(service => service.category === activeTab);

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === category
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <Link 
            href={`/services/${service.id}`}
            key={service.id} 
            className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col group cursor-pointer"
          >
            {/* Top Image/Gradient area */}
            <div className={`h-48 ${service.bgClass || 'bg-gray-800'} flex items-center p-6 relative overflow-hidden`}>
              <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                {service.titleUpper}
              </h3>
              {/* Subtle overlay effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            
            {/* Bottom Text area */}
            <div className="bg-gray-50 p-4 flex flex-col flex-grow">
              <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-purple-600 transition-colors">
                {service.title}
              </h4>
              <p className="text-xs text-gray-500 font-semibold mt-auto">
                {service.language}
              </p>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No services found for this category.
        </div>
      )}
    </>
  );
}
