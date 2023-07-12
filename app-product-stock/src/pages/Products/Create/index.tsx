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
import { NumericFormat } from "react-number-format";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../../hooks/useAuth";
import { api, productsApi } from "../../../service/app";

export default function ProductAdd() {
  const [validated, setValidated] = useState(false);
  const { data } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    const numericPrice = price.replace("R$ ", "");
    const newProduct = {
      name,
      price: Number(numericPrice),
      stock: {
        quantity: Number(quantity),
      },
    };

    productsApi
      .post("", newProduct, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      })
      .then(() => {
        setName("");
        setPrice("");
        setQuantity("");

        toast("Produto cadastrado", {
          icon: "✅",
        });
        navigate("/product-list");
        setValidated(true);
      })
      .catch((err) => {
        toast(err.response?.data.message, {
          icon: "❌",
        });
      });
  };

  return (
    <Container className="w-50">
      <h2>Cadastrar Produto</h2>
      <Form validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <FloatingLabel
              controlId="floatingInput"
              label="Nome produto"
              className="mb-3 text-secondary"
            >
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                type="text"
                placeholder="Nome produto"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm>
            {" "}
            <FloatingLabel
              controlId="floatingInput"
              label="Preço"
              className="mb-3 text-secondary"
            >
              <Form.Control
                as={NumericFormat}
                thousandSeparator="."
                decimalSeparator=","
                prefix="R$ "
                allowNegative={false}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Preço"
              />
            </FloatingLabel>
          </Col>
          <Col sm>
            <FloatingLabel
              controlId="floatingInput"
              label="Quantidade"
              className="mb-3 text-secondary"
            >
              <Form.Control
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                required
                type="number"
                min={0}
                placeholder="Quantidade"
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
