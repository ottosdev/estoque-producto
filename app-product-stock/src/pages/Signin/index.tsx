import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../../styles/signIn.css";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";
export default function SignIn() {
  const { signin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPasswoord] = useState("");

  function handleSignin(event: FormEvent) {
    event.preventDefault();
    signin({ username, password });
  }
  return (
    <Container fluid className="container-login">
      <Form className="w-50" onSubmit={handleSignin}>
        <h1>Bem vindo</h1>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Nome
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Senha
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPasswoord(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Col className="d-flex gap-2 flex-column">
          <Button type="submit" className="w-100" variant="primary">
            Entrar
          </Button>
        </Col>
      </Form>
    </Container>
  );
}
