import http from "../http-common";
import PetisData from "../types/petis.type";

class PetisDataService {
  getAll() {
    return http.get("/pliegoespecificacion");
  }

  get(id: string) {
    return http.get(`/pliegoespecificacion/${id}`);
  }

  create(data: PetisData) {
    return http.post("/pliegoespecificacion", data);
  }

  update(data: PetisData, id: any) {
    return http.put(`/pliegoespecificacion/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/pliegoespecificacion/${id}`);
  }

  deleteAll() {
    return http.delete(`/pliegoespecificacion`);
  }

  findByTitle(title: string) {
    return http.get(`/pliegoespecificacion?title=${title}`);
  }
}

export default new PetisDataService();
