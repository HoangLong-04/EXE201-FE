import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from '@mui/icons-material/Mail';

function Footer() {
  return (
    <div className="bg-yellow-300 bottom-0 mt-10 px-[5rem] pb-[5rem] pt-[2rem]">
      <div className="flex justify-center gap-[10rem]">
        <div>
          <p className="font-bold text-3xl">Liên hệ hợp tác</p>
          <br />
          <p className='cursor-pointer'>Gmail: zentive@gmail.com</p>
        </div>
        <div>
          <p className="font-bold text-3xl">Tìm hiểu thêm</p>
          <br />
          <p className='cursor-pointer hover:underline'>Chính sách người dùng</p>
          <p className='cursor-pointer hover:underline'>FAQs</p>
        </div>
        <div>
          <p className="font-bold text-3xl">Mạng xã hội</p>
          <br />
          <div className='flex gap-1 cursor-pointer'>
            <p><FacebookIcon /></p>
            <p>Facebook</p>
          </div>
          <div className='flex gap-1 cursor-pointer'>
            <p><MailIcon /></p>
            <p>Email</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
