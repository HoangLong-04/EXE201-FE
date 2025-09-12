import { apiConfig } from "./ApiConfig";

const PublicApi = {
    getFilmList: () => apiConfig.publictApi.get()
}

export default PublicApi