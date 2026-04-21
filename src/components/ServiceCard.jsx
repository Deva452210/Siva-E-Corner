import Link from "next/link";

export default function ServiceCard({ title, description, icon, link }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col h-full group">
      <div className="p-6 flex-grow flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-peacock-light flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-black group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-700 text-sm flex-grow">
          {description}
        </p>
      </div>
      <div className="bg-gray-50 px-6 py-4 mt-auto border-t border-gray-100">
        <Link href={link} className="text-primary font-bold hover:text-secondary transition-colors flex items-center justify-center gap-2 w-full">
          View Services
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </Link>
      </div>
    </div>
  );
}
