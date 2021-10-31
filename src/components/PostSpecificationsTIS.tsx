import React, { useState } from "react";
import PetisDataService from "../services/petis.service";
import PetisData from "../types/petis.type";

type Props = {
  petis: PetisData;
  modalId: string;
  tituloConv: string;
};

export default function PostSpecificationsTIS(props: Props): JSX.Element {
  const [state, setState] = useState("");
  const publishPetis = () => {
    const {
      id,
      titulo,
      codigoPliego,
      codigoConvocatoria,
      documentoPliego,
      publica,
    } = props.petis;
    PetisDataService.update(
      {
        titulo: titulo,
        codigoPliego: codigoPliego,
        codigoConvocatoria: codigoConvocatoria,
        documentoPliego: documentoPliego,
        publica: publica,
      },
      id
    );
  };

  const retrievePetisDoc = () => {
    PetisDataService.get(props.petis.documentoPliego)
      .then((response) => {
        setState(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
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
              Publicar Pliego de Especificación
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
              <h6 className="col-12">{`${props.tituloConv}`}</h6>
            </div>
            <div className="row mt-3">
              <h6 className="col-12">{`${props.petis.titulo}`}</h6>
            </div>
            <div className="row mt-3">
              <h6 className="col-12">{`${props.petis.codigoPliego}`}</h6>
            </div>
            <div className="row mt-3">
              <div className="d-grid gap-2 col-6">
                <a
                  download={`${props.petis.titulo}.pdf`}
                  className="btn btn-primary"
                  type="button"
                  href={state}
                  onClick={() => {
                    retrievePetisDoc();
                  }}
                >
                  Descargar Pliego de Especificación
                </a>
              </div>
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
              onClick={publishPetis}
            >
              Publicar pliego
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
