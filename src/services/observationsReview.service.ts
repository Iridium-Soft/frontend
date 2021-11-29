import http from "../http-common";
import ObservationsReviewData from "../types/observationsReview.type";
class ObservationsReviewDataService {
    get(id: string) {
        return http.get(`/ver/observaciones/${id}`);
    }

    saveObservations(data: Array<ObservationsReviewData>) {
        return http.post('/aniadir/observaciones/', data);
    }
}

export default new ObservationsReviewDataService();