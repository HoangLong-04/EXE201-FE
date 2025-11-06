import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router";

function Footer() {
  return (
    <div className="bg-yellow-300 bottom-0 mt-10 px-4 py-6 lg:px-[5rem] lg:pb-[5rem] lg:pt-[2rem]">
      {/* Flex-col trên mobile, Flex-row trên desktop/lớn */}
      <div className="flex flex-col lg:flex-row justify-between lg:gap-[10rem] max-w-6xl mx-auto"> 
        
        {/* Liên hệ */}
        <div className="mb-6 lg:mb-0">
          <p className="font-bold text-xl lg:text-3xl mb-3">Liên hệ hợp tác</p>
          <p className="cursor-pointer text-base hover:text-red-500">Gmail: zentive@gmail.com</p>
        </div>
        
        {/* Tìm hiểu thêm */}
        <div className="mb-6 lg:mb-0">
          <p className="font-bold text-xl lg:text-3xl mb-3">Tìm hiểu thêm</p>
          <p className="cursor-pointer hover:underline text-base mb-1">
            Chính sách người dùng
          </p>
          <p className="cursor-pointer hover:underline text-base">FAQs</p>
        </div>
        
        {/* Mạng xã hội */}
        <div className="mb-6 lg:mb-0">
          <p className="font-bold text-xl lg:text-3xl mb-3">Mạng xã hội</p>
          <a
            href="https://www.facebook.com/people/Zentive/61581569223635/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer mb-1"
          >
            <FacebookIcon className="w-5 h-5"/> {/* Thêm class kích thước cho Icon */}
            <p>Facebook</p>
          </a>

          <div className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer">
            <MailIcon className="w-5 h-5"/> {/* Thêm class kích thước cho Icon */}
            <p>Email</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
