import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/useAuth";
import "../../styles/modal.css";
interface Props {
  show: boolean;
  setShow: (isShow: boolean) => void;
}

function SignOutModal({ show, setShow }: Props) {
  const { signout, data } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  function handleSignOut() {
    signout();
    navigate("/");
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Tem certeza que deseja sair, {data.user.username} ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="danger" onClick={handleSignOut}>
            Tem certeza?
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignOutModal;
