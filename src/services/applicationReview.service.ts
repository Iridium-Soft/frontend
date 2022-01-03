import http from "../http-common";
import ApplicationReviewData from "../types/applicationReview.type";
class ApplicationReviewDataService {
  getAll() {
    return http.get("/postulacion/ordencambio");
  }

  get(id: string) {
    return http.get(`/revision/postulacion/${id}`);
  }

  sendReview(id: number, data: any) {
    return http.put(`/terminarrevision/postulacion/${id}`, data);
  }

  registerObservation(data: any) {
    return http.post(`/revision/observaciones/`, data);
  }

  deleteObservation(id: string) {
    return http.put(`/eliminarObs/${id}`);
  }

  obtenerDocumento(name: string) {
    return http.get(`/revision/documentos/${name}`);
  }

  create(data: ApplicationReviewData) {
    return http.post("/postulacion/ordencambio/", data);
  }

  update(data: ApplicationReviewData, id: any) {
    return http.put(`/ordencambio/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/orden_de_cambio/${id}`);
  }

  deleteAll() {
    return http.delete(`/orden_de_cambio`);
  }
}

export default new ApplicationReviewDataService();
