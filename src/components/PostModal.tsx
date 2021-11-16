import React, { MouseEventHandler, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

type Props = {
  modalTitle: string;
  functionPublicar: () => boolean;
  messageTrue: string;
  messageFalse: string;
  titleDoc: string;
  typeDoc: string;
  downloadHref: string;
  modalId: string;
};

export const PostModal = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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

  const handlePost = () => {
    if (props.functionPublicar()) {
      setMessage(props.messageTrue);
    } else {
      setMessage(props.messageFalse);
    }
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
        <div className="modal-dialog">
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
              <p>Nombre de la grupo-empresa: GRUPOEMPRESA</p>
              <p>Titulo: {props.titleDoc}</p>
              <button
                type="button"
                className="btn btn-primary"
              >{`Descargar ${props.typeDoc}`}</button>
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
