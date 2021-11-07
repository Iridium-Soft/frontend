import http from "../http-common";
import WorkCalendarData from "../types/workCalendar.type";

class WorkCalendarDataService {
  getAll() {
    return http.get("/Hitoplanificacion");
  }

  get(id: string) {
    return http.get(`/Hitoplanificacion/${id}`);
  }

  create(data: WorkCalendarData) {
    return http.post("/Hitoplanificacion", data);
  }

  update(data: WorkCalendarData, id: any) {
    return http.put(`/Hitoplanificacion/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/Hitoplanificacion/${id}`);
  }

  deleteAll() {
    return http.delete(`/Hitoplanificacion`);
  }

  findByTitle(title: string) {
    return http.get(`/Hitoplanificacion?title=${title}`);
  }
}

export default new WorkCalendarDataService();
