import FacebookIcon from "@mui/icons-material/Facebook";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router";

function Footer() {
  return (
    <div className="bg-yellow-300 bottom-0 mt-10 px-[5rem] pb-[5rem] pt-[2rem]">
      <div className="flex justify-center gap-[10rem]">
        <div>
          <p className="font-bold text-3xl">Liên hệ hợp tác</p>
          <br />
          <p className="cursor-pointer">Gmail: zentive@gmail.com</p>
        </div>
        <div>
          <p className="font-bold text-3xl">Tìm hiểu thêm</p>
          <br />
          <p className="cursor-pointer hover:underline">
            Chính sách người dùng
          </p>
          <p className="cursor-pointer hover:underline">FAQs</p>
        </div>
        <div>
          <p className="font-bold text-3xl">Mạng xã hội</p>
          <br />
          <a
            href="https://www.facebook.com/people/Zentive/61581569223635/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer"
          >
            <FacebookIcon />
            <p>Facebook</p>
          </a>

          <div className="flex items-center gap-2 text-blue-600 hover:underline cursor-pointer">
            <p>
              <MailIcon />
            </p>
            <p>Email</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
