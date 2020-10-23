import React, {Component} from 'react'
import {Link} from "react-router-dom";

interface Props {

}

interface State {

}

export default class Main extends Component<Props, State> {
    state = {}

    render() {
        return(
            <div className="container-fluid">
                <div className="row max-height justify-content-center align-items-center">
                    <div className="col-10 mx-auto banner text-center">
                        <h1 className="text-capitalize">welcome to <strong className="banner-title ">Успеть за 5 дней</strong>
                        </h1>
                        <Link to='/store' className="btn banner-link text-uppercase my-2">explore</Link>
                    </div>
                    <div id="cart" className="cart">

                        <div className="cart-total-container d-flex justify-content-around text-capitalize mt-5">
                            <h5>total</h5>
                            <h5> $ <strong id="cart-total" className="font-weight-bold">0.00</strong></h5>
                        </div>
                        <div className="cart-buttons-container mt-3 d-flex justify-content-between">
                            <a id="clear-cart" className="btn btn-outline-secondary btn-black text-uppercase">clear
                                cart</a>
                            <a className="btn btn-outline-secondary text-uppercase btn-pink disabled">checkout</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}