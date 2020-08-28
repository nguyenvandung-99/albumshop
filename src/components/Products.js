import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import formatCurrency from "../util";
import { addToCart } from '../actions/cartActions';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  openModal = (product) => {
    this.setState({
      product,
    });
  }

  closeModal = () => {
    this.setState({
      product: null,
    });
  }

  render() {
    const product = this.state.product;
    return (
      <div>
        <Fade cascade>
          { 
            !this.props.products ? (
            <div>Loading...</div>) : (
            <ul className="products">
              {this.props.products.map(product => (
                <li key={product._id}>
                  <div className="product-basic">
                    <a
                    href={"#" + product._id}
                    onClick={() => this.openModal(product)}>
                      <img src={product.image} alt={product.title + " album cover"}></img>
                      <p>
                        {product.title} ({product.year})
                      </p>
                    </a>
                    <div className="product-price">
                      <div>
                        {formatCurrency(product.price)}
                      </div>
                      <button onClick={() => this.props.addToCart(product)} className="button primary">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            )
          }
        </Fade>

        {product && (
          <Modal isOpen={true} onRequestClose={() => this.closeModal()}>
            <Zoom>
              <button className="close-modal" onClick={() => this.closeModal()}>
                x
              </button>
              <div className="product-details">
                <img src={product.image} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>
                    {product.shortdes}
                  </p>
                  <p>
                    Duration: {product.duration} minutes
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button className="button primary" onClick={() => {
                      this.props.addToCart(product);
                      this.closeModal();
                    }}>
                      Add To Cart
                    </button>
                  </div>
                  <div className="preview">
                    <iframe
                    src={product.embed}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    )
  }
}

export default connect((state) => ({
  products: state.products.filteredItems,
}), {
  fetchProducts,
  addToCart,
})(Products);