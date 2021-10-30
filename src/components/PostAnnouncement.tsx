import React from "react";
import AnnouncementData from "../types/announcement.type";
import AnnouncementDataService from "../services/announcement.service";

type Props = {
  announcement: AnnouncementData;
  modalId: string;
};

export default function PostAnnouncement(props: Props): JSX.Element {
  const publishAnnouncement = () => {
    const {
      id,
      titulo,
      consultorEnc,
      codigo,
      descripcion,
      fechaLimRec,
      fechaIniDur,
      fechaFinDur,
      documento,
    } = props.announcement;
    AnnouncementDataService.update(
      {
        id: id,
        titulo: titulo,
        consultorEnc: consultorEnc,
        codigo: codigo,
        descripcion: descripcion,
        fechaLimRec: fechaLimRec,
        fechaIniDur: fechaIniDur,
        fechaFinDur: fechaFinDur,
        documento: documento,
        publica: true,
        pliego: "",
      },
      id
    );
  };

  return (
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
              Publicar convocatoria
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mt-3">
              <h6 className="col-12">Convocatoria registrada:</h6>
            </div>
            <div className="row mt-3">
              <div className="d-grid gap-2 col-6">
                <a className="btn btn-info text-white" type="button" href="#">
                  {props.announcement.titulo}.pdf
                </a>
              </div>
            </div>
            <div className="row mt-2">
              <p
                className={`${
                  props.announcement.publica ? "text-success" : "text-danger"
                }`}
              >
                Estado:{" "}
                {props.announcement.publica ? "Publicada" : "No publicada"}
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary text-white"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-info text-white"
              onClick={publishAnnouncement}
            >
              Publicar convocatoria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
