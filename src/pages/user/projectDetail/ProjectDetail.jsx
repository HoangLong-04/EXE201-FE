import React, { useEffect, useState } from "react";
import DoFund from "./doFund/DoFund";
import ProjectInfo from "./projectInfo/ProjectInfo";
import ProjectCarousel from "../../../components/projectCarousel/ProjectCarousel";
import { useParams } from "react-router";
import PrivateApi from "../../../services/PrivateApi";
import TierReward from "../../../components/tierReward/TierReward";
import { useAuth } from "../../../hooks/useAuth";
import PledgeTable from "./pledgeTable/PledgeTable";
import { toast } from "react-toastify";

function ProjectDetail() {
  const [project, setProject] = useState({});
  const [tiers, setTiers] = useState([]);
  const [pledge, setPledge] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [status, setStatus] = useState("Paid");
  const [totalPage, setTotalPage] = useState(1);
  const { title } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [title]);

  const getProjectDetail = async () => {
    try {
      const resProject = await PrivateApi.getProjectSlug(title);
      setProject(resProject.data);
      setTiers(resProject.data.tiers);

      if (resProject.data.id) {
        const resPledge = await PrivateApi.getPledge(resProject.data.id, {
          page,
          pageSize,
          status,
        });
        setPledge(resPledge.data.items);
        setTotalPage(resPledge.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjectDetail();
  }, [title, page, pageSize, status]);

  // const handleGetPledge = async (id) => {
  //   try {
  //     const response = await PrivateApi.getPledge(id, { page, pageSize });
  //     setPledge(response.data.items);
  //     setTotalPage(response.data.totalPages);
  //   } catch (error) {
  //     console.log(error);

  //     toast.error("Lỗi");
  //   }
  // };

  return (
    <div>
      <div className="bg-gray-50">
        <section className="flex flex-col md:flex-row gap-6 p-8 min-h-screen">
          <ProjectInfo
            id={project.id}
            status={project.status}
            title={project.title}
            desciption={project.description}
            summary={project.summary}
            img={project.mediaCoverUrl}
          />
          <DoFund
            currentAmount={project.currentAmount}
            goal={project.goal}
            id={project.id}
            creatorName={project.creatorName}
            endAt={project.endAt}
            createAt={project.createdAt}
            backer={project.backerCount}
            status={project.status}
            tiers={tiers}
            getProjectDetail={getProjectDetail}
          />
        </section>

        <section className="flex flex-col md:grid md:grid-cols-3 md:gap-5 p-8">
          {tiers?.map((t) => (
            <TierReward
              tierId={t.id}
              projectId={project.id}
              key={t.id}
              title={t.title}
              description={t.description}
              amount={t.amount}
              quantity={t.quantity}
              creatorName={project.creatorName}
            />
          ))}
        </section>
        {user?.userProfile?.fullName === project.creatorName ? (
          <section>
            <div className="flex justify-between items-center mb-3">
              <div>
                <label className="mr-2 font-medium text-gray-600">
                  Trạng thái:
                </label>
                <select
                  className="border border-gray-300 rounded-md px-2 py-1"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Tất cả</option>
                  <option value="Paid">Đã thanh toán</option>
                  <option value="Pending">Đang chờ</option>
                </select>
              </div>
            </div>
            <PledgeTable
              pledges={pledge}
              currentPage={page}
              onPageChange={setPage}
              totalPages={totalPage}
            />
          </section>
        ) : null}
      </div>
      {user.userProfile.fullName === project.creatorName ? null : (
        <section className="p-8">
          <h1 className="text-3xl text-center font-semibold my-10">
            Những dự án khác
          </h1>
          <ProjectCarousel />
        </section>
      )}
    </div>
  );
}

export default ProjectDetail;
