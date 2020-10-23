  
import React, {ReactElement, useEffect, useState} from 'react'
import {Product} from "../database/Product";
import ProductItem from "./ProductItem";
import {recent} from "../database/recent";
import {Link} from "react-router-dom";
import styled from "styled-components";

interface Props {
    items: Product[]
}

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

export default function RecentlyViewedProducts(props: Props): ReactElement {
    const [items, setItems] = useState(props.items)

    useEffect(() => {
        document.title = "Saved in recent";
    });

    return (

        <div className='container' >
            <h1> You recently interested products</h1>
            { items.map( (item) => {
                return(
                    <div style={{display: "inline-block", width: "200px", height: "200px", margin: "20px"}}>
                        <ProductImage src={item.image} />
                        <Link to={'/items/' + item.id}>  <div className='cartListItemName'>{item.name}</div></Link>
                        <div className='cartListItemPrice'>$ {item.price}</div>
                    </div>
                )
            }) }
        </div>
    )
}