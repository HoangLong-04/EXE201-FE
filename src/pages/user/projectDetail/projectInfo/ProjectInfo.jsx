import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import PrivateApi from "../../../../services/PrivateApi";
import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "../../../../utils/uploadImage";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Trash2, X } from "lucide-react";
import ConfirmModal from "../../../../components/user/confirmModal/ConfirmModal";

function ProjectInfo({
  img,
  desciption,
  title,
  summary,
  id,
  status,
  user,
  project,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ file: "", type: "", sortOrder: 0 });
  const [media, setMedia] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState({ media: false });

  const fetchMedia = async () => {
    try {
      const response = await PrivateApi.getMedia(id);
      setMedia(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMedia();
  }, [id]);

  const handleDeleteMedia = async () => {
    try {
      await PrivateApi.deleteMedia(id, selectedId);
      toast.success("Xóa thành công");
      fetchMedia(id);
      setConfirmDelete((p) => ({ ...p, media: false }));
    } catch (error) {
      toast.error("Thất bại");
    }
  };

  const handleResetField = () => {
    setOpen(false);
    setForm({ file: "", type: "", sortOrder: 0 });
    console.log(form.sortOrder);

    setPreviewUrl("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setForm((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };

  const handleAddMedia = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(form);

    if (!form.file || !form.type) {
      toast.error("Thêm đầy đủ thông tin");
      setLoading(false);
      return;
    }
    try {
      const mediaUrl = await uploadImageToCloudinary(form.file);
      await PrivateApi.addMedia(id, {
        url: mediaUrl,
        type: form.type,
        sortOrder: 0,
      });
      toast.success("Thêm thành công");
      fetchMedia();
      handleResetField();
    } catch (error) {
      console.log(error);

      toast.error("Tạo thất bại");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Ảnh đại diện */}
        <div className="mb-6">
          <img
            className="rounded-2xl w-full h-[400px] object-cover shadow-md"
            src={img}
            alt=""
          />
        </div>

        {/* Slider media */}
        {media?.length > 0 && (
          <div className="mb-8">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {media.map((m) => (
                <SwiperSlide key={m.id}>
                  <div
                    onClick={() => setSelectedMedia(m)}
                    className="relative cursor-pointer group w-full h-[220px] overflow-hidden rounded-xl border border-gray-200 bg-gray-900 flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-[1.02]"
                  >
                    {m.type === "video" ? (
                      <video
                        src={m.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={m.url}
                        alt="Media"
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>

                    {user?.fullName === project.creatorName &&
                      (project.status === "Draft" ||
                        project.status === "Rejected") && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedId(m.id);
                            setConfirmDelete((prev) => ({
                              ...prev,
                              media: true,
                            }));
                          }}
                          className="
            absolute top-3 right-3 
            bg-red-500 text-white p-2 rounded-full
            opacity-0 group-hover:opacity-100
            transition-all duration-300
            hover:bg-red-600
          "
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <ConfirmModal
          message={"Bạn có chắc muốn xóa media này?"}
          onCancel={() =>
            setConfirmDelete((prev) => ({ ...prev, media: false }))
          }
          open={confirmDelete.media}
          title={"Xác nhận xóa media"}
          onConfirm={handleDeleteMedia}
        />

        {/* Nút thêm ảnh/video */}
        {status === "Draft" && (
          <div className="mb-8 text-center">
            <Button
              onClick={() => setOpen(!open)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full px-6 py-2 shadow transition-all duration-300"
            >
              Thêm ảnh / video
            </Button>
          </div>
        )}

        {/* Thông tin dự án */}
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">{title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-3">
            {summary}
          </p>
          <p className="text-gray-600 leading-relaxed">{desciption}</p>
        </div>

        {/* Modal xem ảnh/video full màn hình */}
        {selectedMedia && (
          <div
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn"
          >
            <div
              onClick={(e) => e.stopPropagation()} // chặn đóng khi click bên trong
              className="relative max-w-5xl w-full max-h-[90vh] p-4"
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-10 right-3 cursor-pointer rounded-full hover:bg-black/50 hover:rounded-full transition text-white hover:text-gray-300"
              >
                <X size={32} />
              </button>

              {selectedMedia.type === "video" ? (
                <video
                  src={selectedMedia.url}
                  controls
                  autoPlay
                  className="w-full mt-10 scale-95 max-h-[85vh] rounded-2xl object-contain"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt=""
                  className="w-full mt-10 scale-95 max-h-[85vh] rounded-2xl object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Form thêm media */}
      <Dialog
        open={open}
        onClose={handleResetField}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "rounded-2xl shadow-lg bg-white",
        }}
      >
        <DialogTitle className="text-xl font-semibold text-center border-b pb-2">
          Thêm ảnh / video
        </DialogTitle>

        <DialogContent dividers className="space-y-4 mt-2">
          <form
            onSubmit={handleAddMedia}
            id="subscription-form"
            className="space-y-4"
          >
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Ảnh / video
              </label>
              <input
                type="file"
                name="file"
                accept="image/*,video/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Thêm ảnh / video"
              />
              {previewUrl && (
                <div className="w-50 h-auto overflow-hidden rounded-2xl border-[12px] border-[rgb(246,243,232)] my-10">
                  {form.file.type.startsWith("video/") ? (
                    <video
                      src={previewUrl}
                      controls
                      className="w-full rounded-2xl"
                    />
                  ) : (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full rounded-2xl"
                    />
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Loại
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                name=""
                id=""
              >
                <option>Chọn loại file</option>
                <option value="video">Video</option>
                <option value="image">Ảnh</option>
              </select>
            </div>
            {/* <div>
              <label className="block font-medium mb-1 text-gray-700">
                Thứ tự hiển thị
              </label>
              <input
                type="number"
                name="sortOrder"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm({ ...form, sortOrder: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-400 outline-none"
                placeholder="Thứ tự hiển thị"
              />
            </div> */}
          </form>
        </DialogContent>

        <DialogActions className="px-6 py-3 border-t bg-gray-50">
          <Button
            onClick={handleResetField}
            variant="outlined"
            color="inherit"
            className="rounded-full px-5"
          >
            Hủy
          </Button>
          <Button
            disabled={loading}
            type="submit"
            form="subscription-form"
            variant="contained"
            color="primary"
            className="!bg-pink-500 hover:!bg-pink-600 rounded-full px-5 flex justify-center items-center"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Tạo"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProjectInfo;
