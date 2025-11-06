import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

function ProjectCard({
  mediaCoverUrl,
  title,
  category,
  currentAmount,
  goal,
  summary,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!user) {
      toast.error("Hãy đăng nhập trước");
    } else {
      const slug = slugify(title);
      navigate(`/user/project-detail/${slug}`);
    }
  };

  const slugify = (text) => {
    return text
      .normalize("NFD") // loại bỏ dấu tiếng Việt
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d") // thay 'đ' thành 'd'
      .replace(/Đ/g, "d")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // bỏ ký tự đặc biệt trừ dấu '-'
      .trim()
      .replace(/\s+/g, "-") // thay khoảng trắng bằng '-'
      .replace(/-+/g, "-"); // gộp các dấu '-' liền nhau thành 1
  };

  const progressPercentage = Math.min(
    Math.floor((currentAmount / goal) * 100),
    100
  );

  return (
    <div
      onClick={handleNavigate}
      className="group relative w-full h-110 max-w-sm bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          src={mediaCoverUrl}
          alt={title}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-block bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-md">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
          {title}
        </h3>

        {/* Summary (optional) */}
        {summary && (
          <p className="text-sm text-gray-600 line-clamp-2">{summary}</p>
        )}

        {/* Progress Section */}
        <div className="space-y-2">
          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {currentAmount.toLocaleString("vi-VN")}₫
              </p>
              <p className="text-gray-500 text-xs">
                raised of {goal.toLocaleString("vi-VN")}₫
              </p>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {progressPercentage}%
              </p>
              <p className="text-gray-500 text-xs">funded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-br-full" />
    </div>
  );
}

export default ProjectCard;
