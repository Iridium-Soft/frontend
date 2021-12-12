import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

type Props = {
  modalTitle: string;
  nameCompany: string;
  functionPublicar: any;
  titleDoc: string;
  typeDoc: string;
  downloadHref: string;
  modalId: string;
};

export const PostModal = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [visualizar, setVisualizar] = useState(false);

  const closeSnackbar = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const actionCloseSnackbar = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackbar}
    >
      <span aria-hidden="true">&times;</span>
    </IconButton>
  );

  const handlePost = async () => {
    const functionRes = await props.functionPublicar();
    setMessage(functionRes);
    setOpen(true);
  };

  return (
    <>
      <div
        className="modal fade"
        id={props.modalId}
        tabIndex={-1}
        aria-hidden={true}
      >
        <div className={`modal-dialog ${visualizar ? "modal-fullscreen" : ""}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.modalTitle}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!visualizar ? (
                <div className="container-fluid">
                  <p className="row">
                    Nombre de la grupo-empresa: {props.nameCompany}
                  </p>
                  <p className="row">Titulo: {props.titleDoc}</p>
                  <button
                    type="button"
                    className="row btn btn-primary"
                    onClick={() => {
                      setVisualizar(!visualizar);
                    }}
                  >
                    {visualizar
                      ? `Dejar de visualizar ${props.typeDoc}`
                      : `Visualizar ${props.typeDoc}`}
                  </button>
                </div>
              ) : (
                <div className="container-fluid">
                  <div className="row justify-content-center">
                    <div className="col-auto">
                      <div className="container-fluid">
                        <p className="row">
                          Nombre de la grupo-empresa: {props.nameCompany}
                        </p>
                        <p className="row">Titulo: {props.titleDoc}</p>
                        <button
                          type="button"
                          className="row btn btn-primary"
                          onClick={() => {
                            setVisualizar(!visualizar);
                          }}
                        >
                          {visualizar
                            ? `Dejar de visualizar ${props.typeDoc}`
                            : `Visualizar ${props.typeDoc}`}
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <iframe
                        title="no"
                        src={`data:application/pdf;base64,${props.downloadHref.slice(
                          props.downloadHref.indexOf(",") + 1
                        )}`}
                        style={{ width: "100%", height: "690px" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePost}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        action={actionCloseSnackbar}
      />
    </>
  );
};
