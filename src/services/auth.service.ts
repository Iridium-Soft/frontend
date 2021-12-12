import http from "../http-common";
import FormData from "form-data";

class AuthService {
  async login(data: any) {
    try {
      const res = await http.post("/signin", data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  async logout() {
    try {
      //await http.post("/logout", { token: localStorage.getItem("token") });
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("token", token ? token : "");
      await http.post("/logout", formData, {
        headers: formData.getHeaders(),
      });
      localStorage.removeItem("token");
      window.location.assign("/");
    } catch (err) {
      console.log(err);
    }
  }

  async getCurrentUser() {
    if (!localStorage.getItem("token")) {
      return null;
    } else {
      const res = await http.get("/user");
      return res.data;
    }
  }
}

export default new AuthService();
