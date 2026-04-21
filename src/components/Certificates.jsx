import { FileText } from "lucide-react";

export default function Certificates() {
  return (
    <section id="certificates" className="py-20 px-4 bg-white text-black text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">SIVA Certificates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["First Graduate Certificate", "Old Age Pension Scheme", "Income Certificate", "Deserted Woman Certificate"].map((cert, i) => (
            <div key={i} className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary transition-all cursor-pointer group bg-white">
              <FileText className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-lg text-black">{cert}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
