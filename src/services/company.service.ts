import http from "../http-common";
import CompanyDate from "../types/company.type";

class CompanyDataService {
  getAll() {
    return http.get("/grupoempresa");
  }

  get(id: string) {
    return http.get(`/grupoempresa/${id}`);
  }

  create(data: CompanyDate) {
    return http.post("/grupoempresa", data);
  }

  update(data: CompanyDate, id: any) {
    return http.put(`/grupoempresa/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/grupoempresa/${id}`);
  }

  deleteAll() {
    return http.delete(`/grupoempresa`);
  }
}

export default new CompanyDataService();
