import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort_by: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { filtered_products, sort_by } = state;
    let tempProducts = [...filtered_products];

    if (sort_by === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sort_by === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort_by === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort_by === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return {
      ...state,
      filtered_products: tempProducts,
    };
  }

  if(action.type === UPDATE_FILTERS){
    const { name,value } = action.payload;
    return {
      ...state,
      filters:{...state.filters, [name]:value }
      // setting [name] property dynamically
    }
  }

  if(action.type === FILTER_PRODUCTS){
    const { all_products } = state;
    const { text,category,company,color,price,shipping } = state.filters;
    // before filtering, start with all_products first---
    let tempProducts = [...all_products];

    // filtering begins---
    if(text){
      tempProducts = tempProducts.filter((product) => {
        return product.name.toLowerCase().startsWith(text)
      });
    }
    if(category !== 'all'){
      tempProducts = tempProducts.filter((product) => {
        return product.category === category;
      })
    }
    if(company !== 'all'){
      tempProducts = tempProducts.filter((product) => {
        return product.company === company;
      })
    }
    if(color !== 'all'){
      // product is also an array, so apply callback two times---
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color)
      })
    }
    // price---
    tempProducts = tempProducts.filter((product) => {
      return product.price <= price;
    })
    if(shipping){
      tempProducts = tempProducts.filter((product) => {
        return product.shipping === true;
      })
    }
    return {...state, filtered_products: tempProducts}
  }

  if(action.type === CLEAR_FILTERS){
    return {
      ...state,
      filters:{
        ...state.filters,
        text:'',
        category:'all',
        company:'all',
        color:'all',
        price:state.filters.max_price,
        shipping:false
      }
    }
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
