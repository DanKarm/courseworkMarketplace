import { Storage } from "../services/storage.js";
import Store from "../lib/Store.js";
import { STORAGE_KEY } from "../constans.js";
// ACTIONS
const GET_SITIES = "GET_SITIES";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
const DELETE_CITY = "DELETE_CITY";
const ADD_CITY = "ADD_CITY";
const REFRESH_CITY = "REFRESH_CITY";
const DELETE_ALL_CITIES = "DELETE_ALL_CITIES";

const ADD_TO_CART = "ADD_TO_CART";

// Action creators
export function getCitiesAction(payload) {
  return {
    type: GET_SITIES,
    payload, // [cities]
  };
}
export function addToCart(id) {
  return {
    type: ADD_TO_CART,
    payload: id,
  };
}

export function toogleFavorite(payload) {
  return {
    type: TOGGLE_FAVORITE,
    payload, // id
  };
}

export function deleteCity(payload) {
  return {
    type: DELETE_CITY,
    payload, // id
  };
}

export function addCity(payload) {
  return {
    type: ADD_CITY,
    payload: {
      ...payload,
    },
  };
}

export function refreshCity(payload) {
  return {
    type: REFRESH_CITY,
    payload: {
      id: Date.now(),
      tempUnit: "°C",
      ...payload,
    },
  };
}

export function deleteAllCities() {
  return {
    type: DELETE_ALL_CITIES,
    payload: "all",
  };
}

const citiesReducer = (state, action) => {
  switch (action.type) {
    case GET_SITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case ADD_CITY:
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case TOGGLE_FAVORITE:
      return {
        ...state,
        cities: state.cities.map((city) => {
          if (String(city.id) === String(action.payload)) {
            return {
              ...city,
              isFavorite: !city.isFavorite,
            };
          }
          return city;
        }),
      };
    case DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter(
          (city) => String(city.id) !== String(action.payload)
        ),
      };
    case DELETE_ALL_CITIES:
      return {
        ...state,
        cities: [],
      };
    case REFRESH_CITY:
      return {
        ...state,
        cities: state.cities.map((city) => {
          if (String(city.id) === String(action.payload.id)) {
            return {
              ...city,
              ...action.payload,
            };
          }
          return city;
        }),
      };
    case ADD_TO_CART:
      // Обработка добавления в корзину
      const id = action.payload;
      let cart = { ...state.cart || {} };
      
      if (!cart[id]) {
        cart[id] = { id, count: 1 };
      } else {
        cart[id] = {
          ...cart[id],
          count: cart[id].count + 1,
        };
      }
      
      // Сохраняем в localStorage отдельно для корзины
      localStorage.setItem("cart", JSON.stringify(cart));
      
      return {
        ...state,
        cart,
      };

    default:
      return state;
  }
};

const LocalCitiesStorage = new Storage(STORAGE_KEY);

const initialCities = {
  cities: [],
};

const citiesStore = new Store(citiesReducer, initialCities);

// middleware для сохранения в localStorage
const originalDispatch = citiesStore.dispatch.bind(citiesStore);

citiesStore.dispatch = (action) => {
  // Вызываем оригинальный dispatch, который обновит state и вызовет listeners
  originalDispatch(action);
  // Сохраняем в localStorage после обновления
  // LocalCitiesStorage.save(citiesStore.getState());
};

export const getCart = () => citiesStore.getState().cart;
export const getCartItem = (id) => citiesStore.getState().cart?.[id] || null;
export const getCartItems = () => Object.values(citiesStore.getState().cart || {});
export const getCartItemCount = (id) => citiesStore.getState().cart?.[id]?.count || 0;
export const getTotalCartItems = () => {
  const cart = citiesStore.getState().cart || {};
  return Object.values(cart).reduce((total, item) => total + item.count, 0);
};

export const getCities = () => citiesStore.getState().cities;

export const getCitiesIds = () =>
  citiesStore.getState().cities.map((city) => city.id);

export const getFavoriteCities = () =>
  citiesStore.getState().cities.filter((city) => city.isFavorite);

export { citiesStore };
