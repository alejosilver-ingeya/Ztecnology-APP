export const getProduct = async () => {
  try {
    const products = await fetch(
      "http://localhost:5500/api/productos/consultar-productos"
    );
    return await products.json();
  } catch (error) {
    console.error("Error al obtener la lista de Productos:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/productos/consultar-producto/${productId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos del Producto por ID:", error);
    throw error;
  }
};

export const saveProduct = async (productData) => {
  try {
    console.log("Datos del producto a enviar:", productData);

    const response = await fetch(
      "http://localhost:5500/api/productos/guardar-producto",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error al guardar el Producto:", error);
    throw error;
  }
};

export const updateProduct = async (productData) => {
  try {
    const { id, name, description, priceUnit, photo, state } = productData;
    const updatedProductData = {
      id,
      name,
      description,
      priceUnit,
      photo,
      state,
    };

    const response = await fetch(
      `http://localhost:5500/api/productos/editar-producto`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el Producto:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/productos/eliminar-producto/${productId}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el Producto:", error);
    throw error;
  }
};
