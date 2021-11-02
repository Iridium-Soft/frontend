import http from "../http-common";
import WorkCalendarData from "../types/workCalendar.type";

class WorkCalendarDataService {
    getAll() {
        return http.get("/calendario_de_trabajo")
    }

    get(id: string) {
        return http.get(`/calendario_de_trabajo/${id}`);
    }

    create(data: WorkCalendarData) {
        return http.post("/calendario_de_trabajo", data);
    }

    update(data: WorkCalendarData, id: any) {
        return http.put(`/calendario_de_trabajo/${id}`, data);
    }

    delete(id: any) {
        return http.delete(`/calendario_de_trabajo/${id}`);
    }

    deleteAll() {
        return http.delete(`/calendario_de_trabajo`);
    }

    findByTitle(title: string) {
        return http.get(`/calendario_de_trabajo?title=${title}`);
    }
}

export default new WorkCalendarDataService();
