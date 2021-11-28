import React, { useEffect, useState } from "react";
import { ModelPostulationDocsModal } from "../modals/ModelPostulationDocsModal";
import InboxDocumentsDataService from "../../services/inboxDocuments.service";
import InboxDocumentsData from "../../types/inboxDocuments.type";
import "./AnnouncementsList.css";

export const DocumentsPostulation = () => {
  const [documentsReceived, setDocumentsReceived] = useState(
    [] as InboxDocumentsData[]
  );
  const [currentDocumentReceived, setCurrentDocumentReceived] = useState({
    idDocumento: "",
    nombreDocumento: "",
    codDocumento: "",
    fechaRecepcion: "",
    documento: "",
    docRequeridos: [] as Array<{ id: any; nombre: string }>,
  });

  useEffect(() => {
    /*InboxDocumentsDataService.getAll()
      .then((response) => {
        setDocumentsReceived(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });*/
    setDocumentsReceived([
      {
        idDocumento: "1",
        nombreDocumento: "Nombre1",
        codDocumento: "Cod1",
        fechaRecepcion: "En el futuro",
        documento: "ppp",
        docRequeridos: [
          { id: "1", nombre: "Tipo1" },
          { id: "2", nombre: "Tipo2" },
        ],
      },
      {
        idDocumento: "2",
        nombreDocumento: "Nombre2",
        codDocumento: "Cod2",
        fechaRecepcion: "En el pasado",
        documento: "njvskd",
        docRequeridos: [],
      },
    ]);
  }, []);

  const modalId = "modal-documents-postulation";

  return (
    <>
      <ModelPostulationDocsModal
        modalId={modalId}
        nameDocument={currentDocumentReceived.nombreDocumento}
        typeDocument={currentDocumentReceived.nombreDocumento}
        codeDocument={currentDocumentReceived.codDocumento}
        receptionDate={currentDocumentReceived.fechaRecepcion}
        nameDocumentReceived={currentDocumentReceived.documento}
        listDocsForOrderChange={currentDocumentReceived.docRequeridos}
      />
      <div className="container p-3 position-relative">
        <div className="row">
          <div className="col-12">
            <h3>Bandeja de Entrada</h3>
          </div>
        </div>
        {documentsReceived &&
          documentsReceived.map((document) => (
            <div className="row mx-0 mb-2">
              <button
                className="btn btn-info col-12 btn-md announcement"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                onClick={() => {
                  setCurrentDocumentReceived(document);
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
