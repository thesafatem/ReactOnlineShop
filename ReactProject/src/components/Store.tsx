  
import React, {Component} from 'react';
import styled from "styled-components";
import {Product} from "../database/Product";
import ProductItem from "./ProductItem";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import {recent} from "../database/recent";

interface Props {
    item: Product[]
    addItem: (it: Product) => void;

}

interface State {
    item: Product[]
}

export default class Store extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            item: this.props.item,
        };
    }

    render() {
        return (
            <>
                <section id="store" className="store py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-10 mx-auto col-sm-6 text-center">
                                <h1 className="text-capitalize">our <strong className="banner-title ">store</strong>
                                </h1>
                            </div>
                        </div>
                        <div className="row store-items" id="store-items">
                            { this.state.item.map( (item) => {
                                return <ProductItem key={item.id} item={item} addItem={this.props.addItem}/>;
                            }) }
                        </div>
                        <RecentlyViewedProducts items={recent}/>
                    </div>
                </section>
            </>
        );
    }
}