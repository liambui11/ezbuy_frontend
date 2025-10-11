import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { FaPhoneAlt, FaEnvelopeOpenText } from "react-icons/fa";

interface ContactItemProps {
  icon: React.ReactElement; // Kiểu dữ liệu chính xác cho icon (React Element)
  title: string;
  content: string;
  link?: string;
  isLink?: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({ 
    icon, 
    title, 
    content, 
    link, 
    isLink = false 
}) => (
  <div className="flex items-start p-4 bg-white rounded-xl shadow-md border border-border transition hover:shadow-lg">
    <div className="flex-shrink-0 text-primary mt-1">
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold text-primary-700 mb-1">{title}</h3>
      {isLink ? (
        <a 
          href={link} 
          className="text-foreground hover:text-primary-700 font-medium underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      ) : (
        <p className="text-foreground font-medium">{content}</p>
      )}
    </div>
  </div>
);

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-primary-700 mb-3">
          Liên hệ với EZPhone
        </h1>
        <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Dưới đây là các kênh liên hệ chính thức và nhanh chóng của EZPhone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* KHỐI 1: Hotline & Email (Quan trọng nhất) */}
        
        <ContactItem
          icon={<FaPhoneAlt size={24} />}
          title="Hotline Hỗ trợ"
          content="1900 1234"
          link="tel:19001234"
          isLink={true}
        />
        
        <ContactItem
          icon={<CiMail size={28} />}
          title="Email Hỗ trợ Khách hàng"
          content="support@ezphone.vn"
          link="mailto:support@ezphone.vn"
          isLink={true}
        />

        
        <div className="md:col-span-2 lg:col-span-1">
            <ContactItem
              icon={<CiLocationOn size={28} />}
              title="Địa chỉ Trụ sở chính"
              content="123 Đường vào tim em ôi băng giá, Quận 1, TP. Hồ Chí Minh"
            />
        </div>
      </div>
      
      {/* --- PHÂN CÁCH --- */}

      <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-primary-700 mb-4 flex items-center gap-2">
            <FaEnvelopeOpenText size={24} /> Kết nối qua Mạng xã hội
          </h2>
          
          <ul className="flex space-x-6">
            <li>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-700 transition"
              >
                <FaFacebook size={40} />
              </a>
            </li>
            <li>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 transition"
              >
                <FaInstagram size={40} />
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-600 hover:text-foreground transition"
              >
                <FaXTwitter size={40} />
              </a>
            </li>
          </ul>
      </div>

    </div>
  );
}