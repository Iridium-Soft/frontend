import http from "../http-common";

class AddendumDataService {
  getAddendumDownload(fileId: any) {
    // return http.get(`/adenda/documento/${fileId}`);
    return http.get(`/documento/convocatoria/${fileId}`);
  }

  updatePostAddendum(id: any) {
    return http.put(`/adenda/${id}`);
  }
}

export default new AddendumDataService();
