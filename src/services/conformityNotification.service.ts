import http from "../http-common";

class ConformityNotificationDataService {
  updatePostNotification(id: any) {
    return http.put(`/notificacion/${id}`);
  }
}

export default new ConformityNotificationDataService();
