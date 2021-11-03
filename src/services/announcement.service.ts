import http from "../http-common";
import AnnouncementData from "../types/announcement.type";

class AnnouncementDataService {
  getAll() {
    return http.get("/convocatoria");
  }

  get(id: string) {
    return http.get(`/convocatoria/${id}`);
  }

  getAnnouncementsPub() {
    return http.get(`/api/convocatoria/publica`);
  }

  create(data: AnnouncementData) {
    return http.post("/convocatoria", data);
  }

  update(data: AnnouncementData, id: any) {
    return http.put(`/convocatoria/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/convocatoria/${id}`);
  }

  deleteAll() {
    return http.delete(`/convocatoria`);
  }

  findByTitle(title: string) {
    return http.get(`/convocatoria?title=${title}`);
  }
}

export default new AnnouncementDataService();
