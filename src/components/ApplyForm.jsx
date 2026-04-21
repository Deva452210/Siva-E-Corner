"use client";
import { useState } from "react";
import { UploadCloud, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import Script from "next/script";

export default function ApplyForm({ service }) {
  const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  
  // Track files for UI feedback
  const [uploadedFiles, setUploadedFiles] = useState({});

  const handleFileChange = (e, docName) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles(prev => ({
        ...prev,
        [docName]: e.target.files[0]
      }));
    }
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  // Pricing Calculations
  const parseAmount = (amtStr) => {
    if (!amtStr || amtStr === "Varies") return 0;
    return parseFloat(amtStr.replace(/[^0-9.]/g, '')) || 0;
  };
  
  const baseFee = parseAmount(service.amount);
  const platformFee = Math.round(baseFee * 0.02 * 100) / 100; // 2%
  const gst = Math.round(platformFee * 0.18 * 100) / 100; // 18% on platform fee
  const totalAmount = baseFee + platformFee + gst;
  const isFree = totalAmount === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newAppId = "APP-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
    setApplicationId(newAppId);

    try {
      const formData = new FormData(e.target);
      const data = {
        action: "create",
        applicationId: newAppId,
        paymentStatus: isFree ? "Free" : "Unpaid",
        serviceName: service.title,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        dob: formData.get("dob"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        files: []
      };

      // Convert all uploaded files to Base64
      for (const [docName, file] of Object.entries(uploadedFiles)) {
        if (file) {
          const base64 = await toBase64(file);
          data.files.push({
            name: `${docName} - ${file.name}`,
            mimeType: file.type,
            base64: base64
          });
        }
      }

      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

      if (!scriptUrl) {
        console.warn("NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set. Simulating background upload.");
      } else {
        // Fire and forget to Apps Script (Background Upload)
        fetch(scriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(data)
        }).catch(err => console.error("Background upload failed", err));
      }

      setIsSubmitting(false);
      
      // Instantly transition to next step
      if (isFree) {
        setStep(3); // Skip payment
      } else {
        setStep(2); // Go to Payment Summary
      }
    } catch (error) {
      console.error("Submission failed:", error);
      setIsSubmitting(false);
      alert("Failed to process application. Please check your connection and try again.");
    }
  };

  const handlePayment = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(totalAmount * 100) }) // to paise
      });
      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: order.amount,
        currency: order.currency,
        name: "Siva E-Corner",
        description: `Payment for ${service.title}`,
        order_id: order.simulated ? undefined : order.id, // Omit order_id if simulated
        handler: async function (response) {
          // On Success: Update Google Sheet Status
          const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
          if (scriptUrl) {
            fetch(scriptUrl, {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=utf-8" },
              body: JSON.stringify({
                action: "updateStatus",
                applicationId: applicationId,
                paymentStatus: "Paid",
                paymentId: response.razorpay_payment_id || "simulated_success"
              })
            }).catch(err => console.error("Failed to update payment status", err));
          }
          setStep(3); // Go to Success
        },
        theme: { color: "#9333ea" }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
         alert("Payment failed: " + response.error.description);
      });
      rzp.open();
      setIsSubmitting(false);
    } catch (error) {
      console.error("Payment failed to initialize:", error);
      setIsSubmitting(false);
      alert("Could not load payment gateway.");
    }
  };

  if (step === 3) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We have received your application and documents for <strong>{service.title}</strong>. Our team will review them and contact you shortly.
        </p>
        <button 
          onClick={() => window.location.href = "/services"}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md"
        >
          Return to Services
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Payment Summary</h2>
            <p className="text-gray-500 text-sm">Review fees before payment</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center text-gray-700">
            <span>Application Fee ({service.title})</span>
            <span className="font-semibold">₹{baseFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span>Platform Fee (2%)</span>
            <span className="font-semibold">₹{platformFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-700">
            <span>GST on Platform Fee (18%)</span>
            <span className="font-semibold">₹{gst.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total Amount</span>
            <span className="text-2xl font-black text-purple-600">₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-blue-50 text-blue-700 p-4 rounded-xl flex gap-3 text-sm mb-8">
          <ShieldCheck className="w-5 h-5 flex-shrink-0" />
          <p>Your documents are currently uploading in the background securely. Please proceed with payment.</p>
        </div>

        <button 
          onClick={handlePayment}
          disabled={isSubmitting}
          className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Loading...' : `Pay ₹${totalAmount.toFixed(2)} Securely`}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* Personal Details Section */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">1. Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
            <input required type="text" id="firstName" name="firstName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="Enter your first name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
            <input required type="text" id="lastName" name="lastName" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="Enter your last name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="dob" className="block text-sm font-semibold text-gray-700">Date of Birth <span className="text-red-500">*</span></label>
            <input required type="date" id="dob" name="dob" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
            <input required type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="+91 00000 00000" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Full Address <span className="text-red-500">*</span></label>
            <textarea required id="address" name="address" rows="3" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all" placeholder="Enter your complete residential address..."></textarea>
          </div>
        </div>
      </section>

      {/* Document Uploads Section */}
      <section>
        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">2. Required Documents</h3>
        <p className="text-sm text-gray-500 mb-6">Please upload clear, legible copies of the following documents. Max size: 5MB per file.</p>
        
        <div className="space-y-5">
          {service.documentsRequired?.map((doc, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{doc} <span className="text-red-500">*</span></h4>
                <p className="text-xs text-gray-500 mt-1">Accepted formats: JPG, PNG, PDF</p>
              </div>
              
              <div className="relative">
                <input 
                  required 
                  type="file" 
                  id={`doc-${index}`} 
                  name={`doc-${index}`} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, doc)}
                />
                <div className={`px-6 py-2.5 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 transition-colors ${uploadedFiles[doc] ? 'bg-green-50 border-green-400 text-green-700' : 'bg-white border-purple-300 text-purple-600 hover:bg-purple-50'}`}>
                  {uploadedFiles[doc] ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-semibold truncate max-w-[150px]">{uploadedFiles[doc].name}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span className="text-sm font-semibold">Upload File</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {(!service.documentsRequired || service.documentsRequired.length === 0) && (
            <div className="text-gray-500 italic p-4 bg-gray-50 rounded-lg">No specific documents required for this service.</div>
          )}
        </div>
      </section>

      {/* Submit Section */}
      <div className="pt-6 border-t border-gray-200">
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full md:w-auto md:min-w-[200px] bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-lg flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            isFree ? 'Submit Application (Free)' : 'Submit & Proceed to Payment'
          )}
        </button>
        <p className="text-xs text-gray-500 mt-4">
          By submitting this form, you confirm that all provided details and documents are authentic.
        </p>
      </div>

    </form>
  );
}
