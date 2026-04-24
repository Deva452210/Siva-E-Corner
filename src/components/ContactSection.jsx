"use client";

import { MapPin, Phone, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
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
    <section id="contact" className="py-20 px-4 bg-white text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Need Our Help?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Can't find what you are looking for? Not sure which service you need? Please connect with us.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary">Siva E-Corner</h4>
                <p className="text-gray-600">94, Main Road, Vadakarai Kilpidagai,<br />Tenkasi District, Pincode: 627812</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-primary">Phone</h4>
                <a href="tel:8300849109" className="text-gray-600 hover:text-primary transition-colors">8300849109</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-primary">Get In Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-black mb-1">Name</label>
              <input required type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white text-black" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1">Phone</label>
              <input required type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white text-black" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1">Service Needed</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white text-black" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                <option value="">Select a service</option>
                <option value="e-services">E-Services</option>
                <option value="card-services">Card Services</option>
                <option value="banking">Banking Services</option>
                <option value="travel">Travel / Cabs</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-black mb-1">Message</label>
              <textarea rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white text-black" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}></textarea>
            </div>
            <button type="submit" disabled={submitStatus === "loading"} className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-lg hover:from-secondary hover:to-primary transition-all flex justify-center items-center gap-2">
              {submitStatus === "loading" ? "Sending..." : "Submit Request"}
              {!submitStatus && <ChevronRight className="w-5 h-5" />}
            </button>
            {submitStatus === "success" && <p className="text-green-600 text-center font-medium mt-2">Message sent successfully!</p>}
            {submitStatus === "error" && <p className="text-red-600 text-center font-medium mt-2">Failed to send message. Please try again.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
