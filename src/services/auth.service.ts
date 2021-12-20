import http from "../http-common";
import FormData from "form-data";

class AuthService {
  async login(data: any) {
    try {
      console.log(data);
      const res = await http.post("/auth/login", data);
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("geData", JSON.stringify(res.data.nombreGE));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  async logout() {
    localStorage.clear();
    window.location.assign("/");
    try {
      await http.post(
        "/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  getCurrentUser() {
    if (!localStorage.getItem("token")) {
      return null;
    } else {
      let jsonToParse: any = "";
      jsonToParse = localStorage.getItem("geData");
      const geData = JSON.parse(jsonToParse);
      return geData;
    }
  }
}

export default new AuthService();
