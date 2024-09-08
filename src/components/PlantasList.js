// src/components/PlantList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PlantList = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/plantas")
      .then((response) => setPlants(response.data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  return (
    <div>
      <h2>Plant List</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {plants.map((plant) => (
            <tr key={plant._id}>
              <td>{plant._id}</td>
              <td>{plant.nombre}</td>
              <td>{plant.especie}</td>
              <td>
                <Link to={`/edit/${plant._id}`}>Edit</Link>
                <button onClick={() => handleDelete(plant._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add">Add New Plant</Link>
    </div>
  );

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/api/plantas/${id}`)
      .then(() => setPlants(plants.filter((plant) => plant._id !== id)))
      .catch((error) => console.error("Error deleting plant:", error));
  }
};

export default PlantList;
