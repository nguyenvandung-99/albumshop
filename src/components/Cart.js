import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder} from '../actions/orderActions'
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom'

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      showCheckout: false,
    };
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createOrder = (e) => {
    e.preventDefault(); // prevent refresh
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a,b) => a + b.price * b.count,0),
    };
    this.props.createOrder(order);
  }

  closeModal = () => {
    this.props.clearOrder();
  }

  render() {
    const {cartItems, order} = this.props;
    return (
      <div>
        {cartItems.length === 0 ?
        <div className="cart cart-header">
          Cart is empty
        </div> :
        <div className="cart cart-header">
          You have {cartItems.length} in the cart.
        </div>
        }
        {
          order && (
          <Modal
          isOpen={true}
          onRequestClose={this.closeModal}
          >
            <Zoom>
              <div className="order-details">
                <h3 className="success-message"> Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>{order.cartItems.map(x => (
                      <div>{x.count} * {x.title}</div>
                    ))}</div>
                  </li>
                </ul>
              </div>
              <button className="close-modal-order" onClick={this.closeModal}>Finish</button>
            </Zoom>
          </Modal>
          )}
        <div>
          <Fade right cascade={true}>
            <div className="cart">
              <ul className="cart-items">
                {cartItems.map(item =>(
                  <li key={item._id}>
                    <div>
                      <img src={item.image} alt={item.title}></img>
                    </div>
                    <div>
                      {item.title}
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count} {" "} 
                        <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
          {cartItems.length !== 0 && (
            <div>
            <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a,b) => (a+ b.price*b.count),0)
                )}
              </div>
              <button 
              onClick={() => {this.setState({
                showCheckout: true
              })}}
              className="button primary">
                Proceed
              </button>
            </div>
          </div>
          {this.state.showCheckout && (
            <div className="cart">
              <Fade bottom cascade>
                <form onSubmit={this.createOrder}>
                  <ul className="form-container">
                    <li>
                      <label>Email</label>
                      <input
                      name="email"
                      type="email"
                      required
                      onChange={this.handleInput}></input>
                    </li>
                    <li>
                      <label>Name</label>
                      <input
                      name="name"
                      type="name"
                      required
                      onChange={this.handleInput}></input>
                    </li>
                    <li>
                      <label>Address</label>
                      <input
                      name="address"
                      type="text"
                      required
                      onChange={this.handleInput}></input>
                    </li>
                    <li>
                      <button
                      className="button primary"
                      type="submit">
                        Checkout
                      </button>
                    </li>
                  </ul>
                </form>
              </Fade>
            </div>
          )}
          </div>
          )}
        </div>   
      </div>
       )
  }
}

export default connect((state) => ({
  order: state.order.order,
  cartItems:state.cart.cartItems,
  }),
  {
    removeFromCart,
    createOrder,
    clearOrder,
  },
)(Cart);