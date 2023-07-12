import { useContext, useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PiEraserFill, PiNotePencilLight } from "react-icons/pi";
import { Toaster, toast } from "react-hot-toast";
import { api, productsApi } from "../../../service/app";
import { AuthContext } from "../../../hooks/useAuth";
import { AxiosError } from "axios";
interface ProductProps {
  id: string;
  name: string;
  price: number;
  stock?: {
    id: string;
    quantity: string;
  };
}
export default function ProductList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const { data } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    productsApi
      .get("", {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        toast(err.response?.data.message, {
          icon: "❌",
        });
      });
  });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
          handlePageChange(1);
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

  if (currentItems?.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <p className="text-secondary" style={{ fontSize: 24 }}>
          Nenhum produto cadastrado
        </p>
        <Link to="/product-add">
          <Button variant="success">Cadastre um produto</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h1>Seu Estoque</h1>
        <div>
          <Link to="/product-add">
            <Button variant="success">Cadastrar</Button>
          </Link>
        </div>
      </div>

      <Table striped bordered className="table-dark">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Opcoes</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems?.length > 0 &&
            currentItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {new Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.price)}
                </td>
                <td>{item.stock?.quantity}</td>
                <td className="d-flex gap-2 align-items-center justify-content-center">
                  <Link to={`/product-updated/${item.id}`}>
                    <Button variant="warning">
                      <PiNotePencilLight />
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <PiEraserFill />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}
