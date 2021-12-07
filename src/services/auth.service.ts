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
  }

  getCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    return token;
  }
}

export default new AuthService();
