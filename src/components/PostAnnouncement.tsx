import React from "react";
import AnnouncementData from "../types/announcement.type";

type Props = {
    announcement: AnnouncementData,
    modalId: string,
    isPublished: boolean
};

export default function PostAnnouncement(props: Props): JSX.Element {
    const confirmApplication = () => {
        const option = window.confirm(
            `Usted como grupo-empresa GRUPO-EMPRESA desea postular a la convocatoria "${props.announcement.titulo}"`
        );
        if (option) {
            console.log("Aplicar");
        } else {
            console.log("No aplicar");
        }
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
                            <p className={`${props.isPublished ? "text-success" : "text-danger"}`}>
                                Estado: {props.isPublished ? "Publicada" : "No publicada"}
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
                            onClick={() => confirmApplication()}
                        >
                            Publicar convocatoria
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}