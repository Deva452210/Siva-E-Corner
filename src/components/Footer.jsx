export default function Footer() {
  return (
    <footer className="bg-white text-black mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">SIVA E-Corner</h3>
            <p className="text-sm text-gray-700">
              Your trusted partner for all government-related documents, banking services, and seamless travel solutions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Contact Address</h3>
            <address className="not-italic text-sm text-gray-700 space-y-2">
              <p>94, Main Road,</p>
              <p>Vadakarai Kilpidagai,</p>
              <p>Tenkasi District</p>
              <p>Pincode: 627812</p>
              <p className="mt-2 font-bold text-black">Phone: <a href="tel:8300849109" className="hover:text-primary transition-colors">8300849109</a></p>
            </address>
          </div>
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Quick Links</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><a href="/#services" className="hover:text-primary transition-colors font-semibold">E-Services</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors font-semibold">Card Services</a></li>
              <li><a href="/#services" className="hover:text-primary transition-colors font-semibold">Banking Services</a></li>
              <li><a href="/#cabs" className="hover:text-primary transition-colors font-semibold">Travel Services</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600 font-medium">
          <p>&copy; {new Date().getFullYear()} Siva E-Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
