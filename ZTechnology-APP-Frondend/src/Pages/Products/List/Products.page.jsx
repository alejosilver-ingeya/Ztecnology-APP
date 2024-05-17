import { useState, useEffect } from "react";
import { ProductCard } from "../../../Components/Card/Product.card";
import { NewProductCard } from "../../../Components/Card/NewProduct.card";
import { getProduct } from "../../../Api/Products/Product.api";

export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProduct()
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error al obtener los Productos:", error);
      });
  }, [isModalOpen]);

  return (
    <div className="product-list" style={{ display: "flex", flexWrap: "wrap" }}>
      {products.length > 0 ? (
        <>
          <NewProductCard setIsModalOpen={setIsModalOpen} />
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              priceUnit={product.priceUnit || ""}
              photo={product.photo || ""}
              state={parseFloat(product.state) || 0}
              style={{ marginLeft: index === 0 ? "10px" : "0" }}
            />
          ))}
        </>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};
