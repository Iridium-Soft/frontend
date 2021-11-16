import http from "../http-common";
import ChangeOrderData from "../types/changeOrder.type";
class ChangeOrderDataService {
    getAll() {
        return http.get("/postulacion/ordencambio");
    }

    get(id: string) {
        return http.get(`/postulacion/ordencambio/${id}`);
    }

    create(data: ChangeOrderData) {
        return http.post("/postulacion/ordencambio/", data);
    }

    update(data: ChangeOrderData, id: any) {
        return http.put(`/ordencambio/${id}`, data);
    }

    delete(id: any) {
        return http.delete(`/orden_de_cambio/${id}`);
    }

    deleteAll() {
        return http.delete(`/orden_de_cambio`);
    }

    findByTitle(title: string) {
        return http.get(`/orden_de_cambio?title=${title}`);
    }
}

export default new ChangeOrderDataService();
