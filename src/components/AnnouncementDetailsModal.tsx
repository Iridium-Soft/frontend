import React, { useState } from "react";
import AnnouncementData from "../types/announcement.type";
import DocumentsDataService from "../services/documents.service";

type Props = {
  announcement: AnnouncementData;
  modalId: string;
};

export default function AnnouncementDetails(props: Props): JSX.Element {
  const [documento, setDocumento] = useState("");
  const retrieveAnnouncementDoc = () => {
    DocumentsDataService.getAnnouncement(props.announcement.documento)
      .then((response) => {
        console.log(response.data);
        setDocumento(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div
        className="modal fade"
        id={props.modalId}
        tabIndex={-1}
        aria-labelledby={`label${props.modalId}`}
        role="dialog"
        aria-hidden={true}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`label${props.modalId}`}>
                {props.announcement.titulo}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <h6>{props.announcement.codigo}</h6>
                </div>
              </div>
              <div className="row mt-3">
                <h5 className="col-12">Descripción</h5>
                <p>{props.announcement.descripcion}</p>
              </div>
              <div className="row">
                <h5 className="col-md-8">Fecha limite de recepción: </h5>
                <p className="col-4">{props.announcement.fechaLimRec}</p>
              </div>
              <h5>Fechas de duración del contrato</h5>
              <div className="row">
                <h5 className="col-md-2">Inicio: </h5>
                <p className="col-md-3">{props.announcement.fechaIniDur}</p>
                <h5 className="offset-md-1 col-md-2">Fin: </h5>
                <p className="col-md-3">{props.announcement.fechaFinDur}</p>
              </div>
              <div className="row mt-3">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <a
                    download={`${props.announcement.titulo}.pdf`}
                    className="btn btn-primary"
                    type="button"
                    href={props.announcement.documento}
                    onClick={async () => {
                      await retrieveAnnouncementDoc();
                    }}
                  >
                    Descargar archivo adjunto
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
