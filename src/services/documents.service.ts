import http from "../http-common";
import DocumentData from "../types/documents.type";

class DocumentsDataService {
  getAll() {
    return http.get("/documento");
  }

  get(id: string) {
    return http.get(`/documento/convocatoria/${id}`);
  }

  getPEtis(id: string) {
    return http.get(`/documento/pliegoespecificacion/${id}`);
  }

  getPliegoByConvocatoria(id: string) {
    return http.get(`/documento/pliegoespecificacion/convocatoria/${id}`);
  }

  getAnnouncement(id: string) {
    return http.get(`/documento/convocatoria/${id}`);
  }

  create(data: DocumentData) {
    return http.post("/postulacion/documentos/", data);
  }

  update(data: DocumentData, id: any) {
    return http.put(`/documento/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/documento/${id}`);
  }

  deleteAll() {
    return http.delete(`/documento`);
  }

  findByTitle(title: string) {
    return http.get(`/documento?title=${title}`);
  }
}

export default new DocumentsDataService();
