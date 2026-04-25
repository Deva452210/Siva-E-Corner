import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesTabs from "@/components/ServicesTabs";
import { fetchServicesData } from "@/lib/googleSheets";
import { Suspense } from "react";

// Revalidate this page every 60 seconds so it reflects Google Sheet changes quickly
export const revalidate = 60;

export default async function ServicesPage() {
  const servicesData = await fetchServicesData();

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col bg-white text-black min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-6">Services</h1>
          </div>

          <Suspense fallback={<div className="py-20 text-center text-gray-500">Loading services...</div>}>
            <ServicesTabs initialServices={servicesData} />
          </Suspense>
          
        </div>
      </main>
      <Footer />
    </>
  );
}
