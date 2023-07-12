import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../../hooks/useAuth";
import { productsApi } from "../../../service/app";
import { ProductPostOrPut, ProductRequest } from "../../../interface/IProduct";

export default function ProductUpdate() {
  const params = useParams();
  const { id } = params;
  const { data } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  async function getProduct() {
    await productsApi
      .get<ProductRequest>("" + id, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setPrice(String(res.data.price));
        setQuantity(String(res.data.stock?.quantity));
      });
  }

  useEffect(() => {
    getProduct();
  }, []);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    const numericPrice = price.replace("R$ ", "");
    const updateProduct: ProductPostOrPut = {
      name,
      price: Number(numericPrice),
      quantity: Number(quantity),
    };

    await productsApi
      .put("" + id, updateProduct, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      })
      .then(() => {
        setName("");
        setPrice("");
        setQuantity("");
        toast("Produto atualizado com sucesso", {
          icon: "✅",
        });
        navigate("/product-list");
      })
      .catch((err) => {
        toast(`${err.response.data.message}`, {
          icon: "❌",
        });
      });

    setValidated(true);
  };

  return (
    <Container className="w-50">
      <h2>Atualizar Produto</h2>
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
              Atualizar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
