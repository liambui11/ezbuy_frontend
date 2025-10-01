import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
export default function ContactPage() {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Liên hệ với EZPhone</h1>
        <p className="text-gray-600 mb-10">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Dưới đây là các kênh liên hệ chính thức của EZPhone.
        </p>
  
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Chăm sóc khách hàng</h2>
              <p className="text-gray-700">Hotline: <span className="font-medium">1900 1234</span></p>
              <p className="text-gray-700">Điện thoại: <span className="font-medium">(+84) 12 345 6789</span></p>
            </div>
  
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Địa chỉ</h2>
              <p className="flex text-gray-700">
                <CiLocationOn size={25}/>123 Đường vào tim em ôi băng giá, Quận 1, TP. Hồ Chí Minh
              </p>
            </div>
  
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Mạng xã hội</h2>
              <ul className="flex space-x-3">
                <li>
                  <a href="https://facebook.com" target="_blank" className="text-blue-600 hover:underline ">
                    <FaFacebook size={30}/>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" className="text-pink-500 hover:underline">
                    <FaInstagram size={30}/>
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" className="text-cyan-600 hover:underline">
                    <FaXTwitter size={30}/>
                  </a>
                </li>
              </ul>
            </div>
  
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Email
              </h2>
              <p className="flex items-center gap-2 text-gray-700">
                <CiMail size={20}/>support@ezphone.vn
              </p>
            </div>
          </div>
  
          {/* Form liên hệ */}
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 mb-4">
              <MdOutlineMessage size={25}/>Gửi tin nhắn
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Tin nhắn</label>
                <textarea
                  rows={4}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                  placeholder="Nội dung liên hệ"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  