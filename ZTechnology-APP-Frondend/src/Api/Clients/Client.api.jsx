export const getClient = async () => {
  try {
    const clients = await fetch(
      "http://localhost:5500/api/clientes/consultar-clientes"
    );
    return await clients.json();
  } catch (error) {
    console.error("Error al obtener la lista de clientes:", error);
    throw error;
  }
};

export const getClientById = async (clientId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/clientes/consultar-cliente/${clientId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos del cliente:", error);
    throw error;
  }
};

export const saveClient = async (clientData) => {
  try {
    const response = await fetch(
      "http://localhost:5500/api/clientes/guardar-cliente",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al guardar el cliente:", error);
    throw error;
  }
};

export const updateClient = async (clientData) => {
  try {
    const { id, document, name, email, phone, address, idCitie } = clientData;
    const updatedClientData = {
      id,
      document,
      name,
      email,
      phone,
      address,
      idCitie,
    };

    const response = await fetch(
      `http://localhost:5500/api/clientes/editar-cliente`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedClientData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);
    throw error;
  }
};

export const deleteClient = async (clientId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/clientes/eliminar-cliente/${clientId}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    throw error;
  }
};
