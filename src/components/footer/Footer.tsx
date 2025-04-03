import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";


const Footer = () => {
  return (
    <div className=" text-black py-10 border-t">
      <div className="container mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 gap-6">

        <div>
          <h3 className="text-[#0a96d4] text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white">Men</a></li>
            <li><a href="#" className="hover:text-white">Women</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#0a96d4] text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">Order Tracking</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[#0a96d4] text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-xl"><FacebookOutlined /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><TwitterOutlined /></a>
            <a href="#" className="text-gray-400 hover:text-white text-xl"><InstagramOutlined /></a>
          </div>
        </div>
      </div>

          
      <div className="mt-10 text-center text-gray-500">
        <p>Fake Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;