import data from "../database .json";

export const getCars = () => {
  return data.cars;
};

export const getCarById = (id) => {
  return data.cars.find((car) => car.id === Number(id));
};