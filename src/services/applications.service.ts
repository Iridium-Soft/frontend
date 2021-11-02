import http from "../http-common";
import ApplicationsData from "../types/applications.type";

class ApplicationsDataService {
    getAll() {
        return http.get("/postulaciones");
    }

    get(id: string) {
        return http.get(`/postulaciones/${id}`);
    }

    create(data: ApplicationsData) {
        return http.post("/postulaciones", data);
    }

    update(data: ApplicationsData, id: any) {
        return http.put(`/postulaciones/${id}`, data);
    }

    delete(id: any) {
        return http.delete(`/postulaciones/${id}`);
    }

    deleteAll() {
        return http.delete(`/postulaciones`);
    }

    findByTitle(title: string) {
        return http.get(`/postulaciones?title=${title}`);
    }
}

export default new ApplicationsDataService();
