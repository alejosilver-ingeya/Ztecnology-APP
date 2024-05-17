export const getUsers = async () => {
  try {
    const users = await fetch(
      "http://localhost:5500/api/usuarios/consultar-usuarios"
    );
    return await users.json();
  } catch (error) {
    console.error("Error al obtener la lista de Usuarios:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/usuarios/consultar-usuario/${userId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los datos del Usuario", error);
    throw error;
  }
};

export const saveUser = async (userData) => {
  try {
    const response = await fetch(
      "http://localhost:5500/api/usuarios/crear-usuario",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al guardar el Usuario:", error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    const { id, names, email, password, phone, area } = userData;
    const updatedUserData = {
      id,
      names,
      email,
      password,
      phone,
      area,
    };

    const response = await fetch(
      `http://localhost:5500/api/usuarios/editar-usuario`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al actualizar el Usuario:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:5500/api/usuarios/eliminar-usuario/${userId}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error al eliminar el Usuario:", error);
    throw error;
  }
};
