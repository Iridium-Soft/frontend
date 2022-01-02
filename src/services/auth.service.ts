import http from "../http-common";
import FormData from "form-data";

class AuthService {
  async login(data: any) {
    try {
      // console.log(data);
      const res = await http.post("/auth/login", data);
      // console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("geData", JSON.stringify(res.data.nombreGE));
        localStorage.setItem("id", res.data.id);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  async logout() {
    const user_id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    localStorage.clear();
    try {
      await http.post(
        "/auth/logout",
        {
          user_id: user_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
    window.location.assign("/");
  }

  registerGE(data: any) {
    return http.post("/auth/register", data);
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
