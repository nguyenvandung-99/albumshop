import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('/api/products');
  console.log(res);
  const data = await res.json();
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
}

export const filterProducts = (products, hour) => (dispatch) => {
  dispatch ({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      hour: hour,
      items: hour == "" 
      ? products 
      : products.filter(x => Math.floor(x.duration / 60) == parseInt(hour)),
    }
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "year") {
    sortedProducts.sort((a,b) => (a.year < b.year ? 1 : -1));
  } else {
    sortedProducts.sort((a,b) => (
      sort === "lowest"
      ? a.price > b.price
      ? 1 : -1
      : sort === "highest"
      ? a.price < b.price
      ? 1 : -1
      : null
    ))
  }
  console.log(sortedProducts);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    }
  });
}
