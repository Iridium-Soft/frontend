import http from "../http-common";
import ApplicationReviewData from "../types/applicationReview.type";
class ApplicationReviewDataService {
    getAll() {
        return http.get("/postulacion/ordencambio");
    }

    get(id: string) {
        return http.get(`/postulacion/propias/${id}`);
    }

    create(data: ApplicationReviewData) {
        return http.post("/postulacion/ordencambio/", data);
    }

    update(data: ApplicationReviewData, id: any) {
        return http.put(`/ordencambio/${id}`, data);
    }

    getOrderDownload(fileId: any) {
        return http.get(`/documento/ordencambio/${fileId}`);
    }


    delete(id: any) {
        return http.delete(`/orden_de_cambio/${id}`);
    }

    deleteAll() {
        return http.delete(`/orden_de_cambio`);
    }
}

export default new ApplicationReviewDataService();