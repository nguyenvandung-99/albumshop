import React, { Component } from 'react'
import { sortProducts, filterProducts } from '../actions/productActions';
import { connect } from 'react-redux'

class Filter extends Component {
  render() {
    return (
      !this.props.filteredProducts
        ? (<div></div>) : (
          <div className="filter">
            <div className="filter-result">
              {this.props.filteredProducts.length} Products
            </div>
            <div className="filter-sort">
              Order:{" "}
              <select
              value={this.props.sort}
              onChange={(e) => this.props.sortProducts(this.props.products, e.target.value)}
              >
                <option value="">Select order</option>
                <option value="year">Most recent</option>
                <option value="lowest">Lowest price</option>
                <option value="highest">Highest price</option>
              </select>
            </div>
            <div className="filter-duration">
              Filter:{" "}
              <select
                value={this.props.duration}
                onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)}>
                <option value="">All</option>
                <option value="0">Less than 1 hour</option>
                <option value="1">1-2 hours</option>
                <option value="2">More than 2 hours</option>
              </select>
            </div>
          </div>
        ))
  }
}

export default connect((state) => ({
  duration: state.products.duration,
  sort: state.products.sort,
  products: state.products.items,
  filteredProducts: state.products.filteredItems,
}), {
  filterProducts,
  sortProducts,
})(Filter);
