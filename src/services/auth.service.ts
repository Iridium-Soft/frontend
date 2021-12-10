import http from "../http-common";

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

  logout() {
    localStorage.removeItem("token");
    window.location.reload();
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
