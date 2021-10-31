import http from "../http-common";
import DocumentData from "../types/documents.type";

class DocumentsDataService {
  getAll() {
    return http.get("/documentos");
  }

  get(id: string) {
    return http.get(`/documento/convocatoria/${id}`);
  }

  getPEtis(id: string) {
    return http.get(`/documento/pliego/${id}`);
  }

  create(data: DocumentData) {
    return http.post("/documentos", data);
  }

  update(data: DocumentData, id: any) {
    return http.put(`/documentos/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/documentos/${id}`);
  }

  deleteAll() {
    return http.delete(`/documentos`);
  }

  findByTitle(title: string) {
    return http.get(`/documentos?title=${title}`);
  }
}

export default new DocumentsDataService();
