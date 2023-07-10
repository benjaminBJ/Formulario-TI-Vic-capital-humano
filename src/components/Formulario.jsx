import React, { useState } from 'react';
import styled from 'styled-components';

import imagen from '../assets/img_formulario_prueba.png';

/////////////////styles/////////////////////////////
const FormWrapper = styled.div`
  
  margin: 0 auto;
  padding: 10px;
  position: center;
`;

const FormContainer= styled.div`
  border-top: 2px solid #c9c9c9;
  border-bottom: 2px solid #c9c9c9;
  margin: 0 auto;
  padding: 0px;
  position: center;
  display:flex;
  
`;
const FormColumn = styled.div`
  display:flex;
  float: left;
  width: 50%;
  
`;

const FormTitle = styled.div`
  color: #0000ff;
  font-size: 32px;
  margin: auto auto;
  padding: 20px;
  vertical-align: middle;
  
`
const Icon = styled.img`
  height: 200px;
  margin: auto auto;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: flex ;
  flex-direction:column;
  width: 100%;
  margin-bottom: 5px;
  padding: 0px;

`;

const FormInput = styled.input`
  display: flex ;
  flex-direction:column;
 
  padding: 5px;
  margin-bottom: 10px;

  border: 2px solid #0000ff;
  border-radius: 4px;
  
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;

  border: 2px solid #0000ff;
  border-radius: 4px;
`;

const FormOption = styled.option``;

const FormButton = styled.button`
  margin-left: auto;
  padding: 10px 20px;
  background-color: #0000ff;
  color: #fff;
  border-radius: 30px;
  width: 100px;

  cursor: pointer;
  
`;
/////////////////code/////////////////////////////
const marcas = ['Nissan', 'Citroen', 'Peugeot', 'Kia', 'Susuki'];
const modelosPorMarca = {
  'Nissan': ['NP300', 'Versa'],
  'Citroen': ['C3', 'Aircross'],
  'Peugeot': ['2008', '3008'],
  'Kia': ['Cerato', 'Morning'],
  'Susuki': ['Spresso', 'Alto'],
};
const Formulario = () => {
  const [id, setId] = useState('');
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [patente, setPatente] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha,setFecha] = useState('');
  const [error, setError] = useState('');

  //Manejo de datos en localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    //id y timestamp para la solicitud
    const id = uuidv4();
    const fecha = new Date().toISOString();



    // Validación de datos, completos
    if (!nombre || !rut || !patente || !marca || !modelo || !precio) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const rutRegex = /^\d{7,8}-[0-9kK]{1}$/;
    if (!rutRegex.test(rut)) {
      setError('El rut debe tener el formato correcto (Ejemplo: 12345678-9).');
      return;
    }

    const nombreApellidoRegex = /^[\p{L}\s]{2,}$/u;
    if (!nombreApellidoRegex.test(nombre)) {
      setError('El Nombre completo deben contener al menos dos palabras.');
      return;
    }

    const patenteRegex = /^[A-Za-z]{4}\d{2}$/;
    if (!patenteRegex.test(patente)) {
      setError('La patente debe tener el formato chileno (Ejemplo: ABCD12).');
      return;
    }

    if (isNaN(precio) || precio <= 0) {
      setError('El precio debe ser un número válido.');
      return;
    }

    setError('');
    //Envío de información
    const newData = {
      id,
      rut,
      nombre,
      patente,
      marca,
      modelo,
      precio,
      fecha
    };

    const existingData = localStorage.getItem('rent-a-car-data');
    const existingDataArray = existingData ? JSON.parse(existingData) : [];
    const updatedData = [...existingDataArray, newData];

    localStorage.setItem('rent-a-car-data', JSON.stringify(updatedData));

    // Restablecer los valores del formulario
    setRut('');
    setNombre('');
    setPatente('');
    setMarca('');
    setModelo('');
    setPrecio('');
  };

  return (
    <FormWrapper>
      <FormContainer>
        <FormColumn>
          <FormTitle>
            Formulario <b>de Prueba</b>
            
          </FormTitle>
        </FormColumn>
        <FormColumn>
          <Icon src={imagen} alt="imagen"/>
        </FormColumn>
      </FormContainer>
      <FormContainer>
      <form onSubmit={handleSubmit}>
          <FormLabel>
            <h3>Nuevo formulario</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, </p>
              
          </FormLabel>
          <FormLabel>
            <h4>Datos del vendedor: </h4>
          </FormLabel>
          <FormLabel>
            Nombre completo
            <FormInput type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </FormLabel>
          <FormLabel>
            RUT vendedor
            <FormInput type="text" value={rut} onChange={(e) => setRut(e.target.value)} />
          </FormLabel>
          <FormLabel>
            <h4>Datos del vehículo: </h4>
          </FormLabel>
          <FormLabel>
            Patente del vehículo
            <FormInput type="text" value={patente} onChange={(e) => setPatente(e.target.value)} />
          </FormLabel>
          <FormLabel>
            Marca del vehículo
            <FormSelect value={marca} onChange={(e) => setMarca(e.target.value)}>
              <FormOption value=""></FormOption>
              {marcas.map((marca) => (
                <FormOption key={marca} value={marca}>
                  {marca}
                </FormOption>
              ))}
            </FormSelect>
          </FormLabel>
          <FormLabel>
            Modelo del vehículo
            <FormSelect value={modelo} onChange={(e) => setModelo(e.target.value)}>
              <FormOption value=""></FormOption>
              {marca !== '' &&
                modelosPorMarca[marca].map((modelo) => (
                  <FormOption key={modelo} value={modelo}>
                    {modelo}
                  </FormOption>
                ))}
            </FormSelect>
          </FormLabel>
          <FormLabel>
            Precio del vehículo
            <FormInput type="text" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </FormLabel>
          {error && <p><b>*{error}*</b></p>}
          <FormButton type="submit">Enviar</FormButton>
        </form>
      </FormContainer>
    </FormWrapper>
  );
};

export default Formulario;