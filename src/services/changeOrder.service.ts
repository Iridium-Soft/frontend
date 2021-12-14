import http from "../http-common";
import ChangeOrderData from "../types/changeOrder.type";
class ChangeOrderDataService {
  getAll() {
    return http.get("/postulacion/ordencambio");
  }

  get(id: string) {
    return http.get(`/postulacion/propias/${id}`);
  }

  generar(id: string) {
    return http.get(`/ordendecambio/autollenado/${id}`);
  }

  createChangeOrder(data: any, id: any) {
    return http.post(`/ordendecambio/terminar/${id}`, data);
  }

  createComplianceNotification(data: any, id: any) {
    return http.post(`/notificacionconformidad/terminar/${id}`, data);
  }

  update(data: ChangeOrderData, id: any) {
    return http.put(`/ordencambio/${id}`, data);
  }

  getOrderDownload(fileId: any) {
    return http.get(`/documento/ordencambio/${fileId}`);
  }

  getOrderName(id: any) {
    return http.get(`/planificacion/ordendeCambio/${id}`);
  }

  updatePostOrder(id: any) {
    return http.put(`/ordencambio/${id}`);
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
