import { fetchServicesData } from "@/lib/googleSheets";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ApplyForm from "@/components/ApplyForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60; // Keep ISR

export default async function ApplyPage({ params }) {
  const { id } = await params;
  const serviceId = parseInt(id);
  const servicesData = await fetchServicesData();
  
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-black flex flex-col pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <Link 
            href={`/services/${service.id}`} 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Service Details
          </Link>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className={`p-8 md:p-10 ${service.bgClass || 'bg-purple-800'} text-white`}>
              <span className="inline-block bg-black/20 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                Application Form
              </span>
              <h1 className="text-3xl md:text-4xl font-black mb-2">
                Apply for {service.title}
              </h1>
              <p className="text-white/80">
                Please fill out all the required information and upload the necessary documents to proceed with your application.
              </p>
            </div>
            
            {/* Form Component */}
            <div className="p-8 md:p-10">
              <ApplyForm service={service} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
