import http from "../http-common";
import RegisteredConsultant from "../types/registeredConsultant.type";

class RegisteredConsultantDataService {
  getConsultants() {
    return http.get("/consultor");
  }
}

export default new RegisteredConsultantDataService();
