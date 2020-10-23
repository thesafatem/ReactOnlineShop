import React, {ReactElement, useState} from 'react'
import {Product} from "../database/Product";
import styled from "styled-components";
import {useRouteMatch} from "react-router-dom";
import {products} from "../database/products";

interface Props {
    item: Product[]
}

const ProductImage = styled.img`
  width: 50%;
  height: 50%;
  object-fit: contain;
  object-position: center;
`;

export default function ProductDetails({}: Props): ReactElement {
    const match = useRouteMatch<{ id: string }>();
    const item = (products.find(product => product.id === parseInt(match.params.id)) || products[0]) ;
    console.log(parseInt(match.params.id))

    return (
        <section id="store" className="store py-5" style={{background: "transparent"}}>
            <div className="container" >
            <div>
                <div key={item.id} className='productFigure'>
                    <h1>{item.name}</h1>
                    <ProductImage src={item.image} />
                    <h5>Description: {item.description}</h5>
                    <h5>Price: {item.price}</h5>
                    <h5>Cook: {item.brand}</h5>

                </div>
            </div>
            </div>
        </section>
        );
}