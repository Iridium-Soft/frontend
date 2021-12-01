export default interface InboxDocumentsData {
  documento: Array<{
    idDocumento: any;
    nombreDocumento: string;
    codDocumento: string;
    fechaRecepcion: string;
    documento: string;
  }>;
  docRequeridos: Array<{
    id: any;
    nombre: string;
  }>;
}
