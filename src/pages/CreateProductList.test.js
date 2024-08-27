


import React from "react";
import {render, screen} from "@testing-library/react";
import CreateProductList from "./CreateProductList";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer'

//hacemos test para comprobar que el elemento h1  con texto "Crear tu Listas de ventas" existe 
it('render a message', ()=> {
    render(<BrowserRouter><CreateProductList message="Crear tu Listas de ventas"/></BrowserRouter>);
    const messageElement=screen.getByText(/Crear tu Listas de ventas/i);
    expect(messageElement).toBeInTheDocument();

});

//hacemos test para comprobar que el componente  CreateProductList.js no tiene comportamiento inesperada
it('render correctly',()=>{
    const component=renderer.create(<BrowserRouter><CreateProductList/></BrowserRouter>);
   const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
