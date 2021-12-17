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
        //localStorage.setItem("user", JSON.stringify(res.data.user));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }

  async logout() {
    try {
      await http.post(
        "/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
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
