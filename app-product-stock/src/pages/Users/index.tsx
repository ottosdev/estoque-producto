import { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { usersApi } from "../../service/app";
import { AuthContext } from "../../hooks/useAuth";
import { AxiosError } from "axios";

export default function UserCreate() {
  const { data } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    const newUser = {
      username,
      password,
    };

    usersApi
      .post("", newUser, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      })
      .then(() => {
        setUsername("");
        setPassword("");

        toast("Usuario cadastrado", {
          icon: "✅",
        });
        navigate("/users");

        setValidated(true);
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          toast(err.response?.data.message, {
            icon: "❌",
          });
        }
      });
  };

  return (
    <Container className="w-50">
      <h2>Cadastro de usuario</h2>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInput"
              label="Nome usuario"
              className="mb-3 text-secondary"
            >
              <Form.Control
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
                type="text"
                placeholder="Nome usuario"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm>
            {" "}
            <FloatingLabel
              controlId="floatingInput"
              label="Senha"
              className="mb-3 text-secondary"
            >
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Senha"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <Link to="/product-list">
              <Button className="w-100 btn btn-secondary">Volta</Button>
            </Link>
          </Col>
          <Col sm>
            <Button type="submit" className="w-100 btn btn-success">
              Cadastrar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
