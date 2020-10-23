import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Product } from '../database/Product';
import { User } from '../database/User';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { types } from 'util';
import { JsxExpression, ThisExpression } from 'typescript';
import logProps from '../shared/PropsLogger';
interface Props {
  user: User | null;
  removeItem: (index: number) => void;
}

export const ProductImage = styled.img`
  width: 10%;
  height: 10%;
  object-fit: contain;
  object-position: center;
`;

function Cart({ user, removeItem }: Props): ReactElement {
  //   const [items, setItems] = useState(props.items);
  //   const [cartTotal, setCartTotal] = useState(0);
  const totalRef = useRef(null);

  useEffect(() => {
    total();
  }, [user]);

  const total = () => {
    let totalVal = user
      ? user.basket.reduce((sum, it) => sum + it.price, 0)
      : 0;
    if (totalRef.current) {
      const ref = totalRef as any;
      ref.current.innerText = `Total Price: ${totalVal}`;
    }
    return totalVal;
  };

  //   const removeFromCart = (el: Product) => {
  //     let hardCopy = [...items];
  //     hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
  //     setItems(hardCopy);
  //   };

  const basket = user ? user.basket : [];

  return (
    <>
      <div>
        {basket.map((item, index) => (
          <div key={index}>
            <ProductImage src={item.image} />
            <Link to={'/items/' + item.id}>
              {' '}
              <div className="cartListItemName">{item.name}</div>
            </Link>
            <div className="cartListItemPrice">{item.price}</div>
            <button onClick={() => removeItem(index)}>Delete</button>
          </div>
        ))}
        {/*<div>Total: ${cartTotal}</div>*/}
        {basket.length > 0 && (
          <div className="cart-total">
            <h5 ref={totalRef}></h5>
            <button className="addToCart"> Order</button>
          </div>
        )}
      </div>
    </>
  );
}

export default logProps(Cart as React.FunctionComponent);