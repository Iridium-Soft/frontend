import http from "../http-common";

type DocumentForChangeOrder = {
  documento_id: number;
  documento: any;
};

class InboxDocumentsDataService {
  getAll() {
    return http.get("/postulacion/bandejaentrada");
  }

  getDocumentFile(fileName: string) {
    return http.get("/documento/revision/" + fileName);
  }

  postDocumentForChangeOrder(newDocuments: DocumentForChangeOrder[]) {
    return http.post("/documento/revision", newDocuments);
  }
}

export default new InboxDocumentsDataService();
