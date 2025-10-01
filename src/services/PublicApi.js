import { apiConfig } from "./ApiConfig";

const PublicApi = {
    getProjectList: () => apiConfig.publicApi.get()
}

export default PublicApi