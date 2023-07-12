import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/useAuth";
import "../../styles/modal.css";
import { toast } from "react-hot-toast";
import { api } from "../../service/app";
import { AxiosError } from "axios";
interface Props {
  id: string;
  setCurrentPage: (number: number) => void;
  setShow: (isShow: boolean) => void;
  show: boolean;
}

function ModalDeleteProduct({ id, setCurrentPage, setShow, show }: Props) {
  const { signout, data } = useContext(AuthContext);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  function handleSignOut() {
    signout();
    navigate("/");
  }

  const handleDelete = async (productId: string) => {
    try {
      await api
        .delete(`/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        })
        .then(() => {
          toast("Produto deletado com sucesso", {
            icon: "👏",
          });
          setCurrentPage(1);
        });
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err instanceof AxiosError) {
          toast(err.response?.data.message, {
            icon: "❌",
          });
        }
      }
    }
  };
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

export default ModalDeleteProduct;
