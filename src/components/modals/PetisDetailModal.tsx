import React, { useState } from "react";
import DocumentsDataService from "../../services/documents.service";
import PetisData from "../../types/petis.type";

type Props = {
  petis: PetisData;
  modalId: string;
  announcement: string;
};

export default function PetisDetailModal(props: Props): JSX.Element {
  const [documento, setDocumento] = useState("");
  const retrievepetisDoc = () => {
    DocumentsDataService.getPEtis(props.petis.documento)
      .then((response) => {
        console.log(response.data);
        setDocumento(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  retrievepetisDoc();

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
                {props.petis.titulo}
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
                  <h6>{props.petis.codigo}</h6>
                </div>
              </div>
              <div className="row mt-3">
                <h5 className="col-12">Convocatoria asociada</h5>
                <p>{props.announcement}</p>
              </div>
              <div className="row mt-3">
                <div className="d-grid gap-2 col-6 mx-auto">
                  <a
                    download={`${props.petis.titulo}.pdf`}
                    className="btn btn-primary"
                    type="button"
                    href={documento}
                    onClick={async () => {
                      await retrievepetisDoc();
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
