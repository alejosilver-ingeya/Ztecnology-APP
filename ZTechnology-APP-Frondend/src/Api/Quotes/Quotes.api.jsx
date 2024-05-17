export const getQuote = async () => {
  try {
    const quotes = await fetch(
      "http://localhost:5500/api/cotizaciones/consultar-cotizaciones"
    );
    return await quotes.json();
  } catch (error) {
    console.error("Error al obtener la lista de Cotizaciones:", error);
    throw error;
  }
};

export const getQuotetById = async (quoteId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/cotizaciones/consultar-cotizaciones/${quoteId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos de la cotización por ID:", error);
    throw error;
  }
};

export const saveQuote = async (quoteData) => {
  try {
    console.log("Datos de la cotizacion a enviar:", quoteData);

    const response = await fetch(
      "http://localhost:5500/api/cotizaciones/guardar-cotizacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error al guardar la cotizacion:", error);
    throw error;
  }
};

export const updateQuote = async (quoteData) => {
  try {
    const {
      id,
      idCustomer,
      idProduct,
      stock,
      total,
      priceTotal,
      idUser,
      discount,
      percentageDiscount,
      idStateQuote,
    } = quoteData;
    const updatedQuoteData = {
      id,
      idCustomer,
      idProduct,
      stock,
      total,
      priceTotal,
      idUser,
      discount,
      percentageDiscount,
      idStateQuote,
    };

    const response = await fetch(
      `http://localhost:5500/api/cotizaciones/editar-cotizacion`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedQuoteData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar la cotizacion:", error);
    throw error;
  }
};

export const deleteQuote = async (quoteId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/cotizaciones/eliminar-cliente/${quoteId}`,
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
