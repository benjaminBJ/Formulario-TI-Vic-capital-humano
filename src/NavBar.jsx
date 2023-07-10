import React from 'react';
import styled from 'styled-components';
import logo from './assets/icono_entel.png';

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 4px solid #c9c9c9;
  
  
`;
const Icon = styled.img`

  height: 30px;
  margin-right: 10px;
  padding: 5px 5px;
  justify-content: flex-start;
`;

const NavbarItemWrapper = styled.div`
  margin-left: auto;
  padding: 10px 10px;
`;


const NavbarItem = styled.a`
  border-radius: 20px;
  margin-left: 0px;
  margin-right: 50px;
  text-decoration: none;
  color: blue;
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c9dfe6;
  }

`;

const Navbar = ({ onFormClick, onListClick }) => {
  return (
    <NavbarWrapper>
      <Icon src={logo} alt="icono_entel"/>
      <NavbarItemWrapper>
        <NavbarItem onClick={onFormClick}>Formulario</NavbarItem>
        <NavbarItem onClick={onListClick}>Lista formulario</NavbarItem>
      </NavbarItemWrapper>
    </NavbarWrapper>
  );
};

export default Navbar