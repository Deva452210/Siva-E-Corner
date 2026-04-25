import Link from "next/link";

export default function ServiceCard({ title, description, image, link }) {
  return (
    <Link href={link || "#"} className="bg-[#F3F4F6] rounded-xl overflow-hidden block group hover:shadow-lg transition-all duration-300">
      {image && (
        <div className="w-full aspect-[16/10] relative overflow-hidden bg-white">
          <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-4 md:p-5 text-left">
        <h3 className="text-base md:text-lg font-bold text-black mb-1 group-hover:text-primary transition-colors">{title}</h3>
        {description && (
          <p className="text-gray-600 text-xs md:text-sm">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
