const { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } = require("../types");

export const productsReducer = (state = {}, action) => {
  switch (action.type){
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      }
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        hour: action.payload.hour,
        filteredItems: action.payload.items,
      };
    case FETCH_PRODUCTS:
      return {
        items: action.payload,
        filteredItems: action.payload,
      };
    default:
      return state;
  }
}