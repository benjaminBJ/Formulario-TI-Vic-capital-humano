import React, { useState, useEffect } from 'react';
import GlobalStyles from './styledComponents';
import Lista from './listaFormulario';
import Formulario from './Formulario';
import Navbar from './NavBar';
import styled from 'styled-components'
//import './App.css'

const AppWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
 
`;
const App = () => {
  const [data, setData] = useState([]);
  const [viewOption, setViewOption] = useState('formulario');

  //Función para el manejo del click sobre formulario
  const handleFormClick = () => {
    setViewOption('formulario');
  };
  //Función para el manejo del click sobre la lista
  const handleListClick = () => {
    setViewOption('lista');
  };
  //Función para el manejo del borrado en la lista
  const handleRemoveItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem('rent-a-car-data', JSON.stringify(updatedData));
  };
  useEffect(() => {
    const storedData = localStorage.getItem('rent-a-car-data');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <AppWrapper>
        <GlobalStyles />
        <Navbar onFormClick={handleFormClick} onListClick={handleListClick} /> 
          {viewOption === 'formulario' ? <Formulario /> : <Lista data={data} onRemove={handleRemoveItem} />}
      </AppWrapper>
    </>
  );
};

export default App