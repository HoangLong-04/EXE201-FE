import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import PublicApi from "../../services/PublicApi";
import ProjectCard from "../projectCard.jsx/ProjectCard";

function ProjectCarousel() {
  const [project, setProject] = useState([]);
  const getProjectList = async () => {
    try {
      const response = await PublicApi.getProjectList();
      setProject(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {project?.map((p) => (
          <SwiperSlide key={p.id}>
            <div className="flex justify-center">
              <ProjectCard
                id={p.id}
                category={p.categoryName}
                title={p.title}
                mediaCoverUrl={p.mediaCoverUrl}
                currentAmount={p.currentAmount}
                goal={p.goal}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProjectCarousel;
