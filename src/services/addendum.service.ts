import http from "../http-common";

class AddendumDataService {
  updatePostAddendum(id: any) {
    return http.put(`/adenda/${id}`);
  }
}

export default new AddendumDataService();
