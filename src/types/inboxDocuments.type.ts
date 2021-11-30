export default interface InboxDocumentsData {
  idDocumento: any;
  nombreDocumento: string;
  codDocumento: string;
  fechaRecepcion: string;
  documento: string;
  docRequeridos: Array<{
    id: any;
    nombre: string;
  }>;
}
