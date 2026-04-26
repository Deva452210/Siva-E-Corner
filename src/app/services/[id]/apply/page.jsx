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
      <main className="min-h-screen bg-white md:bg-gray-50 text-black flex flex-col pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-0 md:px-4 w-full">
          <Link 
            href={`/services/${service.id}`} 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6 md:mb-8 font-medium px-5 md:px-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Service Details
          </Link>
          
          <div className="bg-white rounded-none md:rounded-2xl shadow-none md:shadow-xl overflow-hidden border-none md:border md:border-gray-100">
            {/* Header */}
            <div className={`p-6 md:p-10 ${service.bgClass || 'bg-primary-gradient'} text-white`}>
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
            <div className="p-5 md:p-10">
              <ApplyForm service={service} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
