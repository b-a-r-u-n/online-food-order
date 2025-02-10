const Footer = () => {
  return (
    <footer className="bg-[#333333] text-[#FFFDD0] py-8 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold text-[#FFD700]">FoodieExpress</h2>
          <p className="mt-2 text-sm">
            Satisfy your cravings with our delicious meals, delivered fresh & fast!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD700]">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>Home</li>
            <li>Menu</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold text-[#FFD700]">Contact Us</h3>
          <p className="mt-2 text-sm">📍 123 Food Street, Taste City</p>
          <p className="text-sm">📞 +123 456 7890</p>
          <p className="text-sm">📧 support@foodieexpress.com</p>

          <div className="mt-4 flex justify-center md:justify-start space-x-4">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
          </div>
        </div>
      </div>

      <hr className="border-[#FFD700] my-6" />

      <p className="text-center text-sm">© {new Date().getFullYear()} FoodieExpress. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

