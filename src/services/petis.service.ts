import http from "../http-common";
import PetisData from "../types/petis.type";

class PetisDataService {
  getAll() {
    return http.get("/pliegos");
  }

  get(id: string) {
    return http.get(`/pliegos/${id}`);
  }

  create(data: PetisData) {
    return http.post("/pliegos", data);
  }

  update(data: PetisData, id: any) {
    return http.put(`/pliegos/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/pliegos/${id}`);
  }

  deleteAll() {
    return http.delete(`/pliegos`);
  }

  findByTitle(title: string) {
    return http.get(`/pliegos?title=${title}`);
  }
}

export default new PetisDataService();
