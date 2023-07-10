import React from 'react';
import styled from 'styled-components';


const ListContainer= styled.div`
  border-top: 2px solid #c9c9c9;
  border-bottom: 2px solid #c9c9c9;
  margin: auto auto;
  padding: 20px;
`;

const ListWrapper = styled.div`
  margin: auto auto;
  padding: 20px;
  display: box;
`;

const ListHeader = styled.th`
  padding: 10px;
  background-color: #ffffff;
  text-align: center;
  max-width: 1300px;
  border-bottom: 3px solid #c9c9c9;
`;



const ListData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #c9c9c9;
  text-align: center;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #2952d8;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const Lista = ({ data, onRemove }) => {
  const recentData = data.slice(-10);
  return (
    <ListContainer>
      <h3>Lista Formulario</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
    
      <ListWrapper>
        
        <thead>
          <tr>
            <ListHeader>Nombre</ListHeader>
            <ListHeader>RUT vendedor</ListHeader>
            <ListHeader>Patente vehículo</ListHeader>
            <ListHeader>Marca vehículo</ListHeader>
            <ListHeader>Modelo vehículo</ListHeader>
            <ListHeader>Precio vehículo</ListHeader>
            <ListHeader>Eliminar</ListHeader>
          </tr>
        </thead>
        <tbody>
          {recentData.map((item) => (
            <tr key={item.id}>
              <ListData>{item.nombre}</ListData>
              <ListData>{item.rut}</ListData>
              <ListData>{item.patente}</ListData>
              <ListData>{item.marca}</ListData>
              <ListData>{item.modelo}</ListData>
              <ListData>{item.precio}</ListData>
              <ListData>
                <DeleteButton onClick={() => onRemove(item.id)}>Eliminar</DeleteButton>
              </ListData>
            </tr>
          ))}
        </tbody>
      </ListWrapper>
      <p>
        Mostrando {recentData.length} de {data.length} registros
      </p>
    </ListContainer>
  );
};


export default Lista;