// src/components/PlantForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PlantForm = () => {
  const [plant, setPlant] = useState({
    nombre: "",
    especie: "",
    descripcion: "",
    fechaAdquisicion: "",
    estadoSalud: "",
    ubicacion: "",
    riego: "",
    luz: "",
    fertilizacion: "",
    ultimaPoda: "",
    observaciones: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/plantas/${id}`)
        .then((response) => {
          const plantData = response.data;
          // Formateando los campos de fecha
          plantData.fechaAdquisicion = plantData.fechaAdquisicion.split("T")[0];
          plantData.ultimaPoda = plantData.ultimaPoda.split("T")[0];
          setPlant(response.data);
        })
        .catch((error) => console.error("Error fetching plant:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant({ ...plant, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`http://localhost:3000/api/plantas/${id}`, plant)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error updating plant:", error));
    } else {
      axios
        .post("http://localhost:3000/api/plantas", plant)
        .then(() => navigate("/"))
        .catch((error) => console.error("Error adding plant:", error));
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Plant" : "Add New Plant"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={plant.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="especie"
          value={plant.especie}
          onChange={handleChange}
          placeholder="Especie"
          required
        />
        <textarea
          name="descripcion"
          value={plant.descripcion}
          onChange={handleChange}
          placeholder="Descripcion"
          required
        />
        <input
          type="date"
          name="fechaAdquisicion"
          value={plant.fechaAdquisicion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="estadoSalud"
          value={plant.estadoSalud}
          onChange={handleChange}
          placeholder="Estado de Salud"
          required
        />
        <input
          type="text"
          name="ubicacion"
          value={plant.ubicacion}
          onChange={handleChange}
          placeholder="Ubicacion"
          required
        />
        <input
          type="text"
          name="riego"
          value={plant.riego}
          onChange={handleChange}
          placeholder="Riego"
          required
        />
        <input
          type="text"
          name="luz"
          value={plant.luz}
          onChange={handleChange}
          placeholder="Luz"
          required
        />
        <input
          type="text"
          name="fertilizacion"
          value={plant.fertilizacion}
          onChange={handleChange}
          placeholder="Fertilizacion"
          required
        />
        <input
          type="date"
          name="ultimaPoda"
          value={plant.ultimaPoda}
          onChange={handleChange}
          required
        />
        <textarea
          name="observaciones"
          value={plant.observaciones}
          onChange={handleChange}
          placeholder="Observaciones"
          required
        />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default PlantForm;
