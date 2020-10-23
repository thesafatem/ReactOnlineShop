import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Product } from "../database/Product";
import { recent } from "../database/recent";

interface Props {
  item: Product;
  addItem: (it: Product) => void;
}

interface State {
  item: Product;
}

const ProductImage = styled.img`
  width: 10%;
  height: 10%;
  object-fit: contain;
  object-position: center;
`;

export default class ProductItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  render() {
    let item: Product = {
      id: 0,
      name: this.state.item.name,
      price: this.state.item.price,
      image: this.state.item.image,
      description: this.state.item.description,
      brand: this.state.item.brand,
    };
    return (
      <>
        <div
          className="col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item"
          data-item="sweets"
        >
          <div id="001" className="card">
            <div className="img-container">
              <img
                src={this.state.item.image}
                className="card-img-top store-img"
              />
            </div>
            <div className="card-body">
              <div className="card-text d-flex justify-content-between text-capitalize">
                <Link
                  key={this.state.item.id}
                  to={"/items/" + this.state.item.id}
                  onClick={() => addItemToRecent(this.state.item)}
                >
                  <h5 id="store-item-name">{this.state.item.name}</h5>
                </Link>
                <h5 className="store-item-value">
                  ${" "}
                  <strong id="store-item-price" className="font-weight-bold">
                    {this.state.item.price}
                  </strong>
                </h5>
              </div>
              <div className="productDescriptionDiv">
                <button
                  className="addToCart"
                  onClick={() => this.props.addItem(item)}
                  style={{
                    border: "2px solid black",
                    borderRadius: "5px",
                    // border: "0",
                    backgroundColor: "#E9967A",
                    borderColor: "#E9967A",
                    color: "#696969",
                    // width: "40%",
                    // height: "10px",
                    padding: "14px 28px",
                    alignContent: "center",
                    // margin: "5px",
                    font: "9px",
                    cursor: "pointer",
                  }}
                >
                  To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );

    function addItemToRecent(item: Product) {
      item.id = recent.length + 1;
      const checker = recent.find((i) => i.name === item.name);
      if (checker) {
        return;
      }
      item.id = recent.length + 1;
      recent.push(item);
    }
  }
}
