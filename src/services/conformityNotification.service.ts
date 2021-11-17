import http from "../http-common";

class ConformityNotificationDataService {
  updatePostNotification(id: any) {
    return http.put(`/notificacion/${id}`);
  }

  getNotifyDownload(fileId: any) {
    return http.get(`/documento/notificacion/${fileId}`);
  }

  getNotifyName(id: any) {
    return http.get(`/planificacion/notificaciondeConformidad/${id}`);
  }
}

export default new ConformityNotificationDataService();
