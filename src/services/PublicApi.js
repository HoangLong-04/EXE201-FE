import { apiConfig } from "./ApiConfig";

const PublicApi = {
  getProjectList: (params) => apiConfig.publicApi.get("api/Project", {params}),
  getCategory: () => apiConfig.publicApi.get('api/Categories'),
  login: (loginInfo) => apiConfig.publicApi.post("api/Auth/login", loginInfo),
  register: (registerInfo) =>
    apiConfig.publicApi.post("api/Auth/register", registerInfo),
};

export default PublicApi;
