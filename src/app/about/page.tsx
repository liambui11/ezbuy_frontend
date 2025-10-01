"use client";

import { useState } from "react";

const sections = [
  { id: "intro", title: "1.Giới thiệu" },
  { id: "founders", title: "2.Đội ngũ sáng lập" },
  { id: "products", title: "3.Sản phẩm & Dịch vụ" },
  { id: "su_menh", title: "4.Sứ mệnh" },
  { id: "gia_tri", title: "5.Giá trị mang lại" },
  { id: "dinh_huong", title: "6.Định hướng tương lai" },
];

export default function AboutPage() {
  const [active, setActive] = useState("intro");

  return (
    <main className="flex max-w-6xl mx-auto px-6 py-12 gap-5">
      {/* Sidebar Mục lục */}
      <aside className="w-1/5 bg-gray-100 rounded-lg p-6 self-start">
        <h2 className="text-xl font-semibold mb-4">Mục chính sách</h2>
        <ul className="space-y-5">
          {sections.map((sec) => (
            <li key={sec.id}>
              <a
                href={`#${sec.id}`}
                onClick={() => setActive(sec.id)}
                className={`block hover:text-blue-600 ${
                  active === sec.id ? "text-blue-600 font-semibold" : ""
                }`}
              >
                {sec.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Nội dung chính */}
      <section className="w-4/5 space-y-15">
        {/* Giới thiệu */}
        <div id="intro" className="scroll-mt-25">
          <h1 className="text-3xl font-bold mb-4">1.Về EZPhone</h1>
          <p className="text-lg leading-relaxed">
            EZPhone là website bán điện thoại di động hàng đầu tại Việt Nam, 
            nơi bạn có thể tìm thấy đầy đủ các dòng điện thoại từ phổ thông 
            đến cao cấp.Chúng tôi cung cấp các sản phẩm chất lượng cao đến từ các thương hiệu lớn, 
            với mẫu mã đa dạng và mức giá tối ưu nhất cho khách hàng.
            Chúng tôi cam kết mang đến sản phẩm chính hãng, 
            giá cả minh bạch cùng dịch vụ chăm sóc khách hàng tận tâm.
          </p>
        </div>

        {/* Đội ngũ sáng lập */}
        <div id="founders" className="scroll-mt-25">
          <h2 className="text-2xl font-semibold mb-4">2. Đội ngũ sáng lập</h2>
          <p className="text-lg leading-relaxed mb-2">
            EZPhone được sáng lập bởi 3 thành viên đam mê công nghệ:
          </p>
          <ul className="list-disc list-inside text-lg space-y-1">
            <li>Nguyễn Ngọc Long</li>
            <li>Bùi Kinh Luân</li>
            <li>Bùi Minh Quân</li>
          </ul>
          <p>Với niềm đam mê công nghệ mãnh liệt 3 nhà sáng lập đã gặp nhau
            và họ quyết tâm cùng nhau xây dựng một công ty công nghệ mạnh mẽ - uy tín - chất lượng </p>
        </div>

        {/* Sản phẩm & Dịch vụ */}
        <div id="products" className="scroll-mt-25">
          <h2 className="text-2xl font-semibold mb-4">3. Sản phẩm & Dịch vụ</h2>
          <p className="text-lg leading-relaxed mb-2">
            Chúng tôi cung cấp đa dạng các dòng điện thoại di động 
            từ những thương hiệu lớn như iPhone, Samsung, Oppo, Huawei, Xiaomi...  
            Bên cạnh đó, EZPhone luôn cập nhật nhanh chóng các sản phẩm mới nhất 
            để đáp ứng nhu cầu công nghệ của khách hàng.
          </p>
        </div>
        
        <div id="su_menh" className="scroll-mt-25">
          <h2 className="text-2xl font-semibold mb-4">4.Sứ mệnh</h2>
          <p className="text-lg leading-relaxed mb-2">
          Hệ thống EzPhone kỳ vọng mang đến cho khách hàng những trải nghiệm mua sắm tốt 
          nhất thông qua việc cung cấp các sản phẩm chính hãng, 
          dịch vụ chuyên nghiệp cùng chính sách hậu mãi chu đáo. 
          EzPhone không ngừng cải tiến và phát triển, 
          hướng tới việc trở thành nhà bán lẻ công nghệ hàng đầu Việt Nam, 
          đồng thời mang lại giá trị thiết thực cho cộng đồng.
          </p>
        </div>

        <div id="gia_tri" className="scroll-mt-25">
          <h2 className="text-2xl font-semibold mb-4">5.Giá trị</h2>
          <div className="text-lg leading-relaxed mb-2">
            <ul>
              Chất lượng và Uy tín: EzPhone cam kết cung cấp các sản phẩm chính hãng, 
              chất lượng cao với chính sách bảo hành uy tín và dịch vụ chăm sóc khách hàng chu đáo, 
              nhằm đem đến cho khách hàng sự an tâm tuyệt đối khi mua sắm các sản phẩm công nghệ, điện máy - gia dụng.
            </ul>
            <ul>
              Khách hàng là trọng tâm: Phục vụ khách hàng luôn là ưu tiên số 1. 
              EzPhone luôn chú trọng hoàn thiện chất lượng dịch vụ, bồi dưỡng đội ngũ nhân viên nhiệt tình, 
              trung thực, chân thành, mang lại lợi ích và sự hài lòng tối đa cho khách hàng.
            </ul>
            <ul>
              Đổi mới và phát triển: EzPhone luôn cập nhật và đổi mới sản phẩm, 
              công nghệ cũng như dịch vụ để đáp ứng nhu cầu thay đổi liên tục của thị trường và khách hàng. 
            </ul>
            <ul>
              Đồng hành cùng cộng đồng: EzPhone không chỉ tập trung vào phát triển kinh doanh 
              mà còn chú trọng đến các hoạt động xã hội, đóng góp tích cực cho sự phát triển của cộng đồng và xã hội.
            </ul>
          </div>
        </div>

        <div id="dinh_huong" className="scroll-mt-25">
          <h2 className="text-2xl font-semibold mb-4">6.Định hướng tương lai</h2>
          <p className="text-lg leading-relaxed">
          Với mục tiêu “Tạo trải nghiệm xuất sắc cho khách hàng”, 
          EzPhone tiếp tục đẩy mạnh chuyển đổi số để ứng dụng vào công tác bán hàng, 
          quản lý và đào tạo nhân sự... theo chiến lược tận tâm phục vụ nhằm gia tăng trải nghiệm khách hàng. 
          Đầu tư mạnh mẽ kinh doanh trực tuyến đa nền tảng, khai thác và 
          ứng dụng công nghệ để thấu hiểu và tiếp cận khách hàng một cách linh hoạt và hiệu quả nhất, 
          không ngừng khẳng định vị thế là một trong những thương hiệu bán lẻ uy tín tại Việt Nam.
          </p>
        </div>
      </section>
    </main>
  );
}
