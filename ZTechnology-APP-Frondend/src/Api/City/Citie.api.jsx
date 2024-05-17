export const getCitie = async () => {
  try {
    const cities = await fetch(
      "http://localhost:5500/api/ciudades/consultar-ciudades"
    );
    return await cities.json();
  } catch (error) {
    console.error("Error al obtener la lista de Ciudades:", error);
    throw error;
  }
};
