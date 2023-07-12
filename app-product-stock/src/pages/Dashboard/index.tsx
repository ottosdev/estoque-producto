import { Button, Col, Container, Nav, NavDropdown, Row } from "react-bootstrap";
import "../../styles/dashboard.css";
import { Link, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/useAuth";
import SignOutModal from "../../components/ModalSignOut";
import { Toaster } from "react-hot-toast";

export default function DashBoard() {
  const { data } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  function handleShowModal() {
    setShow(!show);
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={3} className="sidebar-container">
          <div className="sidebar-content">
            <div>
              <h2>Ola, {data.user.username}</h2>
              <div className="divider" />
            </div>

            <Nav className="d-flex flex-column align-items-center justify-content-center">
              <NavDropdown
                title="Usuarios"
                id="nav-dropdown"
                className="mt-4 border w-100 text-center rounded custom-dropdown"
              >
                <NavDropdown.Item as={Link} to="/users">
                  Criar
                </NavDropdown.Item>

                <NavDropdown.Item href="#">Listar</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="Produtos"
                id="nav-dropdown"
                className="mt-2 border w-100 text-center rounded  custom-dropdown"
              >
                <NavDropdown.Item as={Link} to="/product-add">
                  Criar
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/product-list">
                  Listar
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
          <div>
            <Button
              className="w-100"
              variant="danger"
              onClick={handleShowModal}
            >
              Sair
            </Button>
          </div>
        </Col>
        <Col sm={9} className="p-5 m-auto">
          <Outlet />
        </Col>
      </Row>
      <SignOutModal show={show} setShow={setShow} />
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
}
