"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const categories = ["E-Service", "Card Service", "Bank Service"];

export default function ServicesTabs({ initialServices }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [activeTab, setActiveTab] = useState(() => {
    if (initialCategory && categories.includes(initialCategory)) {
      return initialCategory;
    }
    return "E-Service";
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category && categories.includes(category)) {
      setActiveTab(category);
    }
  }, [searchParams]);

  // useSWR will instantly return initialServices, then fetch in the background
  const { data: services } = useSWR("/api/services", fetcher, {
    fallbackData: initialServices,
    refreshInterval: 10000, // Optional: auto-refresh every 10 seconds while tab is open
  });

  const currentServices = services || initialServices;
  const filteredServices = currentServices.filter(service => {
    const matchesCategory = service.category === activeTab;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (service.titleUpper && service.titleUpper.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none sm:text-sm transition-shadow text-black"
          />
        </div>
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
              <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
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
