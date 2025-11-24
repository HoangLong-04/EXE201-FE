import React, { useEffect, useState } from "react";
import PublicApi from "../../../services/PublicApi";
import { uploadImageToCloudinary } from "../../../utils/uploadImage";
import PrivateApi from "../../../services/PrivateApi";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

function AddProject() {
  const [category, setCategory] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    summary: "",
    description: "",
    goal: "",
    endAt: "",
    categoryId: "",
    imageFile: null,
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setForm((prev) => ({
        ...prev,
        imageFile: file,
      }));
    }
  };

  const handleGoalChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numberValue = rawValue ? parseInt(rawValue, 10) : 0;

    const formatted = numberValue.toLocaleString("vi-VN");

    setForm({ ...form, goal: formatted });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!user) {
      toast.error("Hãy đăng nhập trước");
      setLoading(false);
      return;
    } else if (
      !form.title ||
      !form.summary ||
      !form.description ||
      !form.goal ||
      !form.endAt ||
      !form.categoryId ||
      !form.imageFile
    ) {
      toast.error("Hãy nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }
    // if (
    //   !form.title ||
    //   !form.summary ||
    //   !form.description ||
    //   !form.goal ||
    //   !form.endAt ||
    //   !form.categoryId ||
    //   !form.imageFile
    // ) {
    //   toast.error("Hãy nhập đầy đủ thông tin");
    //   setLoading(false);
    //   return;
    // }
    try {
      const imageUrl = await uploadImageToCloudinary(form.imageFile);

      const response = await PrivateApi.createProject({
        title: form.title,
        summary: form.summary,
        description: form.description,
        goal: Number(form.goal.replace(/\./g, "")),
        endAt: form.endAt,
        categoryId: form.categoryId,
        mediaCoverUrl: imageUrl, // URL từ Cloudinary
      });

      console.log("Tạo dự án thành công:", response);
      navigate("/user/home");
      toast.success("Tạo dự án thành công!");
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.message || "Tạo dự án thất bại");
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async () => {
    try {
      const response = await PublicApi.getCategory();
      setCategory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="bg-[rgb(250,250,191)] rounded-b-4xl py-10">
      <p className="text-6xl text-center font-bold mb-10">
        Điền thông tin dự án
      </p>
      <form onSubmit={handleSubmit} className="px-10">
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Thể loại</p>
          <select
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
            className="pl-3 border-b-1 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0"
          >
            <option value="">Chọn thể loại dự án</option>
            {category.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Tên dự án</p>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Nhập tên dự án"
            className="border-b-1 pl-3 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0"
            type="text"
          />
        </div>
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Mô tả dự án</p>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border-b-1 pl-3 border-[rgb(246,194,244)] placeholder:text-[rgb(179,179,179)] w-full outline-0"
            rows={4}
            cols={50}
            placeholder="Mô tả dự án của bạn"
          />
        </div>
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Tóm tắt dự án</p>
          <textarea
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className="border-b-1 pl-3 border-[rgb(246,194,244)] placeholder:text-[rgb(179,179,179)] w-full outline-0"
            rows={4}
            cols={50}
            placeholder="Tóm tắt dự án của bạn"
          />
        </div>
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Hình ảnh về dự án</p>
          <input
            onChange={handleImageChange}
            className="border-b-1 pl-3 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0"
            type="file"
            accept="image/*"
          />
        </div>
        {previewUrl && (
          <div className="w-50 h-auto overflow-hidden rounded-2xl border-[12px] border-[rgb(246,243,232)] my-10">
            <img src={previewUrl} />
          </div>
        )}
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Ngày kết thúc</p>
          <input
            value={form.endAt}
            onChange={(e) => setForm({ ...form, endAt: e.target.value })}
            placeholder="Nhập tên dự án"
            className="border-b-1 pl-3 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0"
            type="date"
          />
        </div>
        <div className="mb-10">
          <p className="font-bold text-2xl mb-2">Mục tiêu</p>
          <input
            value={form.goal}
            onChange={handleGoalChange}
            placeholder="Mục tiêu gọi vốn (Vnd)"
            className="border-b-1 pl-3 border-[rgb(246,194,244)] w-full placeholder:text-[rgb(179,179,179)] outline-0"
            type="text"
          />
        </div>
        <div className="relative flex justify-center items-center">
          <button
            disabled={loading}
            type="submit"
            className="absolute w-80 h-12 bg-[rgb(250,250,191)] px-20 py-2 rounded-full cursor-pointer text-2xl font-semibold z-10 hover:bg-[rgb(239,239,155)] hover:translate-y-1 transform duration-200 ease-in-out"
          >
            {loading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Tạo bản nháp"
            )}
          </button>
          <button className="bg-black w-80 h-12 translate-y-2 px-20 py-2 rounded-3xl text-2xl">
            Tạo bản nháp
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProject;
