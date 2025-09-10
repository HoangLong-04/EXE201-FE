import { motion } from "framer-motion";

function Introduction() {
  return (
    <div className="p-10">
      <div className="text-center font-bold text-4xl mb-10">ZENTIVE LÀ GÌ?</div>
      <div className="grid grid-flow-col grid-rows-3 gap-10">
        <motion.div
          className="bg-teal-300 shadow-[10px_4px_0px_black] text-center text-2xl row-span-1 p-4 rounded-2xl border-black-fig/40 
             hover:rotate-1 hover:scale-105 hover:shadow-lg will-change-transform cursor-default"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          Bạn là người đang có những ý tưởng bùng nổ, một dự án nghệ thuật đầy
          tâm huyết, một game đang ấp ủ, hay một sản phẩm truyền thông đột phá?
          Bạn đang tìm kiếm nguồn lực để biến những giấc mơ đó thành hiện thực?
        </motion.div>

        <motion.div
          className="bg-amber-300 shadow-[10px_4px_0px_black] text-center text-2xl row-span-2 p-4 rounded-2xl border-black-fig/40 
             hover:-rotate-1 hover:scale-105 hover:shadow-lg will-change-transform cursor-default"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          <p>
            ZENTIVE là cầu nối dành riêng cho các bạn sinh viên, nhà sáng tạo
            trẻ trong lĩnh vực truyền thông, thiết kế đồ họa, lập trình game, để
            biến những ý tưởng táo bạo thành hiện thực.{" "}
          </p>
          <br />
          <p>
            Tụi mình tin rằng mỗi ý tưởng đều xứng đáng được chắp cánh, và mỗi
            tài năng trẻ đều cần một bệ phóng để vươn xa.
          </p>
        </motion.div>

        <motion.div
          className="bg-pink-300 shadow-[10px_4px_0px_black] text-center text-2xl row-span-3 p-4 rounded-2xl border-black-fig/40 
             hover:rotate-1 hover:scale-105 hover:shadow-lg will-change-transform cursor-default"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        >
          <p>Tại đây, bạn có thể:</p>
          <br />
          <p>
            Kêu gọi vốn dễ dàng: Trình bày dự án của mình một cách chuyên nghiệp
            và thu hút sự ủng hộ từ cộng đồng.
          </p>
          <br />
          <p>
            Kết nối cộng đồng: Tìm kiếm những người cùng chí hướng, nhận được
            phản hồi giá trị và xây dựng mạng lưới sáng tạo của riêng bạn.
          </p>
          <br />
          <p>
            Hiện thực hóa đam mê: Biến những ý tưởng trên giấy thành sản phẩm
            thực tế, mang lại giá trị cho cộng đồng và bản thân.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Introduction;
