import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

function ProjectCard({
  mediaCoverUrl,
  title,
  category,
  currentAmount,
  goal,
  
}) {
  const { user } = useAuth()
  const navigate = useNavigate();

  const handleNavigate = () => {
    if(!user) {
      toast.error('Hãy đăng nhập trước')
    } else {
      const slug = slugify(title);
      navigate(`/user/project-detail/${slug}`)
    }
  }

  const slugify = (text) => {
    return text
      .normalize("NFD") // loại bỏ dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt
      .trim()
      .replace(/\s+/g, "-"); // thay khoảng trắng bằng dấu "-"
  };
  return (
    <div
      onClick={handleNavigate}
      className="rounded-3xl w-[35rem] h-[80dvh] overflow-hidden "
    >
      <div className="border-[12px] border-[rgb(246,243,232)] overflow-hidden rounded-3xl">
        <img
          className="hover:scale-105 w-full h-[20rem] object-cover hover:contrast-50 transform transition duration-300 cursor-pointer"
          src={mediaCoverUrl}
          alt="Film"
        />
      </div>
      <div className="ml-[2rem] mt-1">
        <div className="flex gap-5 items-center">
          <p>{Math.floor(currentAmount / goal)}% funded</p>
          <p>-</p>
          <p className="bg-amber-200 rounded-2xl py-1 px-3 font-semibold">
            {category}
          </p>
        </div>

        <br />
        <p className="font-medium text-3xl hover:underline cursor-pointer">
          {title}
        </p>
      </div>
    </div>
  );
}

export default ProjectCard;
