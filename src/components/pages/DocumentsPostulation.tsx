import React, { useEffect, useState } from "react";
import { ModelPostulationDocsModal } from "../modals/ModelPostulationDocsModal";
import InboxDocumentsDataService from "../../services/inboxDocuments.service";
import InboxDocumentsData from "../../types/inboxDocuments.type";
import "./AnnouncementsList.css";

type Props = {
  companyId: number;
};

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

  useEffect(() => {
    InboxDocumentsDataService.getAll(props.companyId)
      .then((response) => {
        setDocumentsReceived(response.data);
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
      </div>
    </>
  );
};
