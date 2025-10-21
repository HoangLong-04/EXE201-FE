import { apiConfig } from "./ApiConfig";

const PrivateApi = {
  createProject: (projectInfo) =>
    apiConfig.privateApi.post("api/Project", projectInfo),
  getProjectSlug: (slug) => apiConfig.privateApi.get(`api/Project/${slug}`),
  getMyProject: (params) =>
    apiConfig.privateApi.get("api/Me/Projects", { params }),
  getPendingProject: (params) =>
    apiConfig.privateApi.get("api/Project/pending", { params }),
  approveProject: (id) =>
    apiConfig.privateApi.post(`api/admin/projects/${id}/approve`),
  rejectProject: (id, note) =>
    apiConfig.privateApi.post(`api/admin/projects/${id}/reject`, note),
  submitProject: (id) => apiConfig.privateApi.post(`api/Project/${id}/submit`),
  getPledge: (id, params) =>
    apiConfig.privateApi.get(`api/Project/${id}/pledges`, { params }),
  addTierReward: (id, data) =>
    apiConfig.privateApi.post(`api/projects/${id}/tiers`, data),
  donateForWeb: (data) => apiConfig.privateApi.post("api/Donations", data),
  donateProject: (id, data) =>
    apiConfig.privateApi.post(`api/projects/${id}/pledges`, data),
  getWebDonator: (params) =>
    apiConfig.privateApi.get("api/admin/donations", { params }),
  addMedia: (id, data) =>
    apiConfig.privateApi.post(`api/Project/${id}/media`, data),
  getMedia: (id) => apiConfig.privateApi.get(`api/Project/${id}/media`),
  getUserCount: () => apiConfig.privateApi.get("api/Accounts/count"),
  getRevenue: () => apiConfig.privateApi.get("api/admin/donations/revenue"),
  getDetailProjectAdmin: (id) => apiConfig.privateApi.get(`api/Project/${id}`),
};

export default PrivateApi;
