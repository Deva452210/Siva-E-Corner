"use client";

import { FileText, CreditCard, Landmark, Car, Award, MapPin, Phone, Mail, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", phone: "", service: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/submit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", phone: "", service: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <section className="bg-primary-gradient text-white py-20 px-4 md:py-32">
          <div className="max-w-7xl mx-auto flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-8 max-w-4xl leading-tight">
              Siva is a trusted and authorized service provider offering a range of essential services to meet your diverse needs.
            </h1>

            <div className="w-full max-w-3xl bg-white rounded-xl p-1.5 flex items-center shadow-2xl text-black">
              <input
                type="text"
                placeholder="Search for any service..."
                className="flex-grow px-4 py-3 bg-transparent outline-none text-base md:text-lg placeholder-gray-500 font-medium"
              />
              <button className="bg-secondary hover:bg-secondary/90 text-white p-3 md:px-6 md:py-3 rounded-lg flex items-center justify-center transition-colors shadow-md">
                <Search className="w-6 h-6" />
                <span className="hidden md:inline ml-2 font-bold">Search</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3 mt-8 flex-wrap">
              <span className="text-sm font-semibold text-white/90">Popular:</span>
              {["E-Services", "Card Services", "Banking", "SIVA Cabs"].map((tag) => (
                <a href="#services" key={tag} className="px-4 py-1.5 rounded-full border border-white/40 text-sm font-medium hover:bg-white/20 hover:border-white transition-all">
                  {tag}
                </a>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center md:justify-start gap-3 text-sm md:text-base font-medium text-white/90">
              <Award className="w-6 h-6" />
              <span>Accredited and Trusted Partner</span>
            </div>
          </div>
        </section>

        {/* Accredited By Section */}
        <section className="py-8 md:py-12 px-2 md:px-4 bg-[#EBEBEB]">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">We are accredited by</h3>
            <div className="flex justify-center items-center gap-2 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg md:rounded-2xl shadow-sm p-2 md:p-6 w-1/3 h-14 sm:h-20 md:h-28 flex items-center justify-center border border-gray-100">
                <img src="/csc-logo.avif" alt="CSC Logo" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="bg-white rounded-lg md:rounded-2xl shadow-sm p-2 md:p-6 w-1/3 h-14 sm:h-20 md:h-28 flex items-center justify-center border border-gray-100">
                <img src="/e-sevai-logo.avif" alt="E-Sevai Logo" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="bg-white rounded-lg md:rounded-2xl shadow-sm p-2 md:p-6 w-1/3 h-14 sm:h-20 md:h-28 flex items-center justify-center border border-gray-100">
                <img src="/digital-india-logo.avif" alt="Digital India Logo" className="max-h-full max-w-full object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Services Section */}
        <section id="services" className="py-20 px-4 bg-gray-50 text-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Popular Services</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
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
        {/* E-Services Preview Section */}
        <section className="py-16 md:py-24 px-4 bg-white text-black border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">E-Services</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {/* Card 1 */}
              <Link href="/services/1" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col group bg-gray-50 cursor-pointer">
                <div className="h-40 md:h-48 bg-[#0D4D20] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                    FIRST GRADUATE CERTIFICATE
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    First Graduate Certificate
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/services/2" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col group bg-gray-50 cursor-pointer">
                <div className="h-40 md:h-48 bg-[#4CAF50] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-xl uppercase leading-tight z-10 drop-shadow-md">
                    INDIRA GANDHI OLD AGE PENSION SHEME
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    Indira Gandhi National Old Age Pension Scheme
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="/services/3" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col group bg-gray-50 cursor-pointer">
                <div className="h-40 md:h-48 bg-[#9c27b0] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                    INCOME CERTIFICATE
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    Income Certificate
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>

              {/* Card 4 */}
              <Link href="/services/4" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col group bg-gray-50 cursor-pointer">
                <div className="h-40 md:h-48 bg-[#111111] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                    DESERTED WOMAN CERTIFICATE
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    Deserted Woman Certificate
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>
            </div>

            <div className="text-center">
              <Link href="/services" className="inline-block px-8 py-2 border border-purple-600 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                View all Services
              </Link>
            </div>
          </div>
        </section>

        {/* Certificates & Documents Section */}
        <section id="certificates" className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto bg-[#2b2b2b] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 shadow-2xl">

            {/* Left Content */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 md:space-y-12 w-full order-1">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
                SIVA Certificates
              </h2>
              <div className="w-full max-w-[280px] md:max-w-[400px]">
                <img src="/certificate/title-logo.webp" alt="Government Authorised CSC Center" className="w-full h-auto object-contain drop-shadow-xl" />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 w-full flex items-center justify-center order-2">
              <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-xl w-full max-w-[550px]">
                <img src="/certificate/certificate.avif" alt="CSC Certificate" className="w-full h-auto object-contain rounded-xl border border-gray-100" />
              </div>
            </div>

          </div>
        </section>

        {/* Card Services Preview Section */}
        <section className="py-16 md:py-24 px-4 bg-gray-50 text-black border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Card Services</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {/* Card 1 */}
              <Link href="/services" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col group bg-white cursor-pointer">
                <div className="h-40 md:h-48 bg-[#E65100] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                    PAN CARD
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    PAN Card Services
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>

              {/* Card 2 */}
              <Link href="/services" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col group bg-white cursor-pointer">
                <div className="h-40 md:h-48 bg-[#1565C0] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                    VOTER ID CARD
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    Voter ID Card Services
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="/services" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col group bg-white cursor-pointer">
                <div className="h-40 md:h-48 bg-[#C62828] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                    AADHAAR CARD
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    Aadhaar Card Services
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>

              {/* Card 4 */}
              <Link href="/services" className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 flex flex-col group bg-white cursor-pointer">
                <div className="h-40 md:h-48 bg-[#2E7D32] flex items-center p-6 relative overflow-hidden">
                  <h3 className="text-white font-black text-2xl uppercase leading-tight z-10 drop-shadow-md">
                    SMART CARD
                  </h3>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-gray-800 text-[15px] mb-2 group-hover:text-primary transition-colors">
                    Smart Card / Ration Card
                  </h4>
                  <p className="text-xs text-gray-500 font-semibold mt-auto">English</p>
                </div>
              </Link>
            </div>

            <div className="text-center">
              <Link href="/services?category=Bank Service" className="inline-block px-8 py-2 border border-purple-600 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
                View all Services
              </Link>
            </div>
          </div>
        </section>






      </main>
      <Footer />
    </>
  );
}
