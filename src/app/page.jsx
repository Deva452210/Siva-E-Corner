"use client";

import { FileText, CreditCard, Landmark, Car, Award, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
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
        <section className="bg-white text-black py-20 px-4 border-b border-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-purple-700">SIVA E-Corner</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-700">
              Siva is a trusted and authorized service provider offering a range of essential services to meet your diverse needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services" className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg">
                Explore Services
              </a>
              <a href="#contact" className="bg-transparent border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg">
                Get In Touch
              </a>
            </div>
            <div className="mt-12 flex items-center justify-center gap-4 text-sm font-medium text-gray-600">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Accredited and Trusted Partner</span>
            </div>
          </div>
        </section>

        {/* Popular Services Section */}
        <section id="services" className="py-20 px-4 bg-gray-50 text-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Popular Services</h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ServiceCard
                title="E-services"
                description="Comprehensive E-services for all your government-related documents."
                icon={<FileText className="w-8 h-8" />}
                link="#details"
              />
              <ServiceCard
                title="Card-services"
                description="Passport, Smart Card, Voter ID, and other essential cards."
                icon={<CreditCard className="w-8 h-8" />}
                link="#details"
              />
              <ServiceCard
                title="Banking-services"
                description="Account opening, money transfers, loans, and more."
                icon={<Landmark className="w-8 h-8" />}
                link="#details"
              />
              <ServiceCard
                title="Travel-services"
                description="SIVA Cabs for smooth, comfortable rides at affordable prices."
                icon={<Car className="w-8 h-8" />}
                link="#cabs"
              />
            </div>
          </div>
        </section>

        {/* Certificates & Documents Section */}
        <section id="certificates" className="py-20 px-4 bg-white text-center text-black border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-12">SIVA Certificates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {["First Graduate Certificate", "Old Age Pension Scheme", "Income Certificate", "Deserted Woman Certificate"].map((cert, i) => (
                <div key={i} className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-purple-600 transition-all cursor-pointer group bg-white">
                  <FileText className="w-8 h-8 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-lg">{cert}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SIVA Cabs Section */}
        <section id="cabs" className="py-20 px-4 bg-gray-50 text-black">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">SIVA Cabs</h2>
              <h3 className="text-2xl font-semibold mb-4 text-purple-700">Make your travel Smoother</h3>
              <p className="text-lg mb-6 text-gray-700">
                All over Tamil Nadu & Kerala. Available 24x7. Enjoy smooth, comfortable rides at affordable prices, with guaranteed on-time pickup and drop-off.
              </p>
              <a href="tel:8300849109" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg">
                <Car className="w-5 h-5" />
                Book Now
              </a>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="w-full max-w-md h-64 bg-white rounded-2xl border border-gray-200 flex items-center justify-center shadow-xl relative overflow-hidden">
                <Car className="w-32 h-32 text-purple-100 absolute" />
                <span className="text-2xl font-bold z-10 text-black">SIVA Travels</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section id="details" className="py-20 px-4 bg-white text-black border-y border-gray-100">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* E-Services */}
            <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black mb-4">E-Services</h3>
                <p className="text-gray-700 mb-6">
                  Elevate your experience with our comprehensive E-services for all your government-related documents. As a trusted and authorized partner of both Central and State Governments, we ensure seamless and reliable service.
                </p>
              </div>
              <div className="flex-shrink-0">
                <FileText className="w-24 h-24 text-purple-600 opacity-20" />
              </div>
            </div>

            {/* Banking Services */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black mb-4">Banking-Services</h3>
                <p className="text-gray-700 mb-6">
                  Discover a full suite of banking services tailored to meet your needs, including account opening, money transfers, loans, and more. As certified agents within the banking sector, we offer a secure and trustworthy experience.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Landmark className="w-24 h-24 text-purple-600 opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section id="contact" className="py-20 px-4 bg-gray-50 text-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Need Our Help?</h2>
              <p className="text-lg text-gray-700 mb-8">
                Can't find what you are looking for? Not sure which service you need? Please connect with us.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-black">Siva E-Corner</h4>
                    <p className="text-gray-600">94, Main Road, Vadakarai Kilpidagai,<br />Tenkasi District, Pincode: 627812</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-black">Phone</h4>
                    <a href="tel:8300849109" className="text-gray-600 hover:text-purple-600">8300849109</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-black">Get In Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
                  <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Phone</label>
                  <input required type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Service Needed</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                    <option value="">Select a service</option>
                    <option value="e-services">E-Services</option>
                    <option value="card-services">Card Services</option>
                    <option value="banking">Banking Services</option>
                    <option value="travel">Travel / Cabs</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Message</label>
                  <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
                </div>
                <button type="submit" disabled={submitStatus === "loading"} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors flex justify-center items-center gap-2 shadow-md">
                  {submitStatus === "loading" ? "Sending..." : "Submit Request"}
                  {!submitStatus && <ChevronRight className="w-5 h-5" />}
                </button>
                {submitStatus === "success" && <p className="text-green-600 text-center font-medium mt-2">Message sent successfully!</p>}
                {submitStatus === "error" && <p className="text-red-600 text-center font-medium mt-2">Failed to send message. Please try again.</p>}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
