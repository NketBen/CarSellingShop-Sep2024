

import React from "react";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer'

import MyForms from './MyForms';

//hacemos test para comprobar que el elemento h1  con texto "Formulario De Contacto" existe 

it('render a message', ()=> {
    render(<BrowserRouter><MyForms message="Formulario De Contacto"/></BrowserRouter>);
    const messageElement=screen.getByText(/Formulario De Contacto/i);
    expect(messageElement).toBeInTheDocument();

});

//hacemos test para comprobar que el componente  MyForm.js no tiene comportamiento inesperada.

it('render correctly',()=>{
    const component=renderer.create(<MyForms/>);
   const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});


