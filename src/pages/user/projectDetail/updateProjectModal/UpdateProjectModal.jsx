import { X, ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import PublicApi from "../../../../services/PublicApi";
import dayjs from "dayjs";
import { uploadImageToCloudinary } from "../../../../utils/uploadImage";
import { toast } from "react-toastify";

export default function UpdateProjectModal({
  open,
  onClose,
  project,
  onSubmit,
}) {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(project?.mediaCoverUrl || "");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    goal: 0,
    startAt: "",
    endAt: "",
    categoryId: "",
    mediaCoverUrl: null,
  });

  useEffect(() => {
    if (project) {
      setPreview(project.mediaCoverUrl);
      setFormData({
        title: project.title || "",
        summary: project.summary || "",
        description: project.description || "",
        goal: project.goal || 0,
        startAt: dayjs(project.startAt).format("YYYY-MM-DD"),
        endAt: dayjs(project.endAt).format("YYYY-MM-DD"),
        categoryId: project.categoryId || "",
        mediaCoverUrl: project.mediaCoverUrl,
      });
    }
  }, [project]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await PublicApi.getCategory();
        setCategories(res.data);
      } catch (err) {
        console.log(err);
        toast.error("Lấy danh mục thất bại");
      }
    };

    if (open) fetchCategory();
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((p) => ({ ...p, mediaCoverUrl: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setLoading(true); // bật loading
    try {
      let mediaUrl = formData.mediaCoverUrl;
      if (mediaUrl && mediaUrl instanceof File) {
        mediaUrl = await uploadImageToCloudinary(mediaUrl);
      }

      const data = {
        title: formData.title,
        summary: formData.summary,
        description: formData.description,
        goal: Number(formData.goal),
        endAt: dayjs(formData.endAt).format("YYYY-MM-DD"),
        categoryId: formData.categoryId,
        mediaCoverUrl: mediaUrl,
      };

      await onSubmit(data); // gọi API cập nhật project
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // tắt loading
    }
  };

  const handleCancel = () => {
    onClose();
    setFormData({
      title: project.title || "",
      summary: project.summary || "",
      description: project.description || "",
      goal: project.goal || 0,
      startAt: dayjs(project.startAt).format("YYYY-MM-DD"),
      endAt: dayjs(project.endAt).format("YYYY-MM-DD"),
      categoryId: project.categoryId || "",
      mediaCoverUrl: project.mediaCoverUrl,
    });
    setPreview(project.mediaCoverUrl);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-gray-100 rounded-2xl shadow-xl max-w-3xl w-full p-6 relative animate-slideUp">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-pink-600">
            Cập nhật dự án
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Title */}
          {/* <div className="col-span-2">
            <label className="font-medium">Tiêu đề</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Nhập tiêu đề..."
            />
          </div> */}

          <div>
            <label className="font-medium">Tóm tắt</label>
            <input
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-2 rounded-lg mt-1 outline-0 shadow-lg"
              placeholder="Nhập tóm tắt..."
            />
          </div>

          <div>
            <label className="font-medium">Mục tiêu (VND)</label>
            <input
              type="number"
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full p-2 rounded-lg mt-1 outline-0 shadow-lg"
            />
          </div>

          <div className="col-span-2">
            <label className="font-medium">Mô tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 outline-0 shadow-lg rounded-lg mt-1 h-32"
              placeholder="Nhập mô tả chi tiết..."
            />
          </div>

          <div>
            <label className="font-medium">Ngày băt đầu</label>
            <input
              type="date"
              name="startAt"
              value={formData.startAt}
              onChange={handleChange}
              className="w-full p-2 outline-0 shadow-lg rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Ngày kết thúc</label>
            <input
              type="date"
              name="endAt"
              value={formData.endAt}
              onChange={handleChange}
              className="w-full p-2 outline-0 shadow-lg rounded-lg mt-1"
            />
          </div>

          <div>
            <label className="font-medium">Danh mục</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-2 outline-0 shadow-lg rounded-lg mt-1"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <label className="font-medium">Ảnh</label>
            <div className="mt-2 flex flex-col md:flex-row items-center gap-4">
              <div className="w-40 h-40 border rounded-xl overflow-hidden bg-gray-100">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Chưa có ảnh
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer px-4 py-2 outline-0 shadow-lg rounded-lg hover:bg-gray-100">
                <ImagePlus size={20} />
                <span>Chọn ảnh</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition flex items-center justify-center gap-2"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
