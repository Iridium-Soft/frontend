import http from "../http-common";
import ComplianceNotificationData from "../types/complianceNotification.type";
class ComplianceNotificationDataService {
    getAll() {
        return http.get("/postulacion/ordencambio");
    }

    get(id: string) {
        return http.get(`/postulacion/propias/${id}`);
    }

    getInfo(id: string) {
        return http.get(`/notificacionconformidad/autollenado/${id}`);
    }

    generar(id: string) {
        return http.get(`/generar/notificacionconformidad/${id}`);
    }

    create(data: ComplianceNotificationData) {
        return http.post("/postulacion/notificacionconformidad/", data);
    }

    update(data: ComplianceNotificationData, id: any) {
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

export default new ComplianceNotificationDataService();
