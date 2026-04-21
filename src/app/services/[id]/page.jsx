import { fetchServicesData } from "@/lib/googleSheets";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetailsClient from "@/components/ServiceDetailsClient";

export const revalidate = 60; // Keep ISR for SEO, SWR handles live updates

export default async function ServiceDetailsPage({ params }) {
  const { id } = await params;
  const serviceId = parseInt(id);
  const servicesData = await fetchServicesData();
  
  const initialService = servicesData.find((s) => s.id === serviceId);

  if (!initialService) {
    notFound();
  }

  const initialSimilarServices = servicesData
    .filter((s) => s.category === initialService.category && s.id !== serviceId)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black flex flex-col">
        <ServiceDetailsClient 
          initialService={initialService} 
          initialSimilarServices={initialSimilarServices}
          serviceId={serviceId}
        />
      </main>
      <Footer />
    </>
  );
}
