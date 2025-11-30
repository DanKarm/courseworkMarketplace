import { createApi } from "./ApiFactory";

const MOCK_API_BASE_URL = "https://6927052a26e7e41498fc987f.mockapi.io";

const mockApi = createApi(MOCK_API_BASE_URL);

const getCities = async () => {
  try {
    const cities = await mockApi.get("/cities");
    return cities;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

const getGoods = async () => {
  try {
    const goods = await mockApi.get("/goods");
    return goods;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};

const getUnFavoriteCities = async () => {
  try {
    const cities = await mockApi.get("/cities", {
      params: { isFavorite: false },
    });
    return cities;
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    return [];
  }
};

const createCity = async (city) => {
  try {
    const createdCity = await mockApi.post("/cities", { body: city });
    console.log("Created city:", createdCity);
    return createdCity;
  } catch (error) {
    console.error("Error creating city:", error);
    return null;
  }
};

const updateCity = async (city) => {
  try {
    const updatedCity = await mockApi.put(`/cities/${city.id}`, { body: city });
    console.log("Updated city:", updatedCity);
    return updatedCity;
  } catch (error) {
    console.error("Error updating city:", error);
    return null;
  }
};

const deleteCity = async (id) => {
  try {
    const deletedCity = await mockApi.delete(`/cities/${id}`);
    console.log("Deleted city:", deletedCity);
    return deletedCity;
  } catch (error) {
    console.error("Error deleting city:", error);
    return null;
  }
};

const deleteAll = async (cityIds) => {
  try {
    for (const id of cityIds) {
      await deleteCity(id);
    }
  } catch (error) {
    console.error("Error deleting all cities:", error);
  }
};

export {
  getGoods,
};
