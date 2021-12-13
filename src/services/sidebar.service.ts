import http from "../http-common";

class SidebarDataService {
    get(id: string) {
        return http.get(`/enviar/permisos/${id}`);
    }
}

export default new SidebarDataService();
