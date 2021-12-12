import http from "../http-common";

class ContractDataService {
  getContractDownload(fileId: any) {
    return http.get(`/contrato/documento/${fileId}`);
  }

  updatePostContract(id: any) {
    return http.put(`/contrato/${id}`);
  }
}

export default new ContractDataService();
