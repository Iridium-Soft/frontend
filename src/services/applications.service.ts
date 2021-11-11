import http from "../http-common";
import ApplicationsData from "../types/applications.type";

class ApplicationsDataService {
  getAll() {
    return http.get("/postulacion");
  }

  get(id: string) {
    return http.get(`/postulacion/${id}`);
  }

  create(data: ApplicationsData) {
    return http.post("/postulacion", data);
  }

  update(data: ApplicationsData, id: any) {
    return http.put(`/postulacion/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/postulacion/${id}`);
  }

  deleteAll() {
    return http.delete(`/postulacion`);
  }

  findByTitle(title: string) {
    return http.get(`/postulacion?title=${title}`);
  }
}

export default new ApplicationsDataService();