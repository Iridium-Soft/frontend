import React, { useEffect, useState } from "react";
import { ModelPostulationDocsModal } from "../modals/ModelPostulationDocsModal";
import InboxDocumentsDataService from "../../services/inboxDocuments.service";
import InboxDocumentsData from "../../types/inboxDocuments.type";
import AuthService from "../../services/auth.service";
import "./AnnouncementsList.css";

type Props = {};

export const DocumentsPostulation = (props: Props) => {
  const [documentsReceived, setDocumentsReceived] = useState(
    null as InboxDocumentsData | null
  );
  const [currentDocumentReceived, setCurrentDocumentReceived] = useState({
    documento: {
      idDocumento: "",
      nombreDocumento: "",
      codDocumento: "",
      fechaRecepcion: "",
      documento: "",
    },
    docRequeridos: [] as Array<{ id: any; nombre: string }>,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    InboxDocumentsDataService.getAll(AuthService.getCurrentUser().id)
      .then((response) => {
        setDocumentsReceived(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const modalId = "modal-documents-postulation";

  return (
    <>
      <ModelPostulationDocsModal
        modalId={modalId}
        nameDocument={currentDocumentReceived.documento.nombreDocumento}
        typeDocument={currentDocumentReceived.documento.nombreDocumento}
        codeDocument={currentDocumentReceived.documento.codDocumento}
        receptionDate={currentDocumentReceived.documento.fechaRecepcion}
        nameDocumentReceived={currentDocumentReceived.documento.documento}
        listDocsForOrderChange={currentDocumentReceived.docRequeridos}
      />
      <div className="container p-3 position-relative">
        <div className="row">
          <div className="col-12">
            <h3>Bandeja de Entrada</h3>
          </div>
        </div>
        {documentsReceived?.documento &&
          documentsReceived.documento.map((document, index) => (
            <div className="row mx-0 mb-2" key={index}>
              <button
                className="btn btn-info col-12 btn-md announcement"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                onClick={() => {
                  setCurrentDocumentReceived({
                    documento: document,
                    docRequeridos:
                      document.nombreDocumento === "Orden de Cambio"
                        ? documentsReceived.docRequeridos
                        : [],
                  });
                }}
              >
                <div className="row">
                  <div className="col-4">{document.nombreDocumento}</div>
                  <div className="col-4">{document.codDocumento}</div>
                  <div className="col-4">{document.fechaRecepcion}</div>
                </div>
              </button>
            </div>
          ))}
        {documentsReceived?.documento.length === 0 && !loading &&
        <div className="container">
          <div
              className="row align-items-center text-info"
              style={{minHeight: "50vh"}}>
            <div className="col-12">
              <div>
                <h1>¡Vaya!</h1>
              </div>
              <div>
                <h5 className="text-secondary">Parece que no hay ningun elemento para mostrar</h5>
              </div>
            </div>
          </div>
        </div>}
        {loading && <div className="container">
          <div
              className="row align-items-center text-info"
              style={{minHeight: "60vh"}}>
            <div className="col-2 offset-2">
              <div className="spinner-border fs-1" style={{width: "4rem", height:"4rem"}} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </>
  );
};
