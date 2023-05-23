import { Servicio, allServices, allRecommendations, Recomendation } from "../models";
import {
  getServices,
  uploadService,
  deleteServices,
  servicesLen,
  getRecomendations,
  findRecomendation,
  deleteRecomendations,
  getRecomendationsLength,
} from "..";
import { context, Context, logging } from "near-sdk-as";

const servicio = "Nombre del servicio";
const descripcion =
  "descripcion";
const imagen =
  "imagen";
const direccion = "servicio Publisher";
const costo = "12.0";
const recomendationUser = "Edwin";

let newServicio = new Servicio(
  servicio,
  descripcion,
  imagen,
  direccion,
  costo
);

const allServicesIndex = allServices.length;
const allRecommendationsIndex = allRecommendations.length;

const contsData = new Array<Recomendation>(allRecommendationsIndex);
for (let x = 0; x < allRecommendationsIndex; x++) {
  contsData[x] = allRecommendations[x];
}

const data = new Array<Servicio>(allServicesIndex);
for (let i = 0; i < allServicesIndex; i++) {
  data[i] = allServices[i];
}

describe("uploadService", () => {
  it("should return the new service", () => {
    expect(
      uploadService(
        servicio,
        descripcion,
        imagen,
        direccion,
        costo
      )
    ).toStrictEqual(newServicio);
  });
});

describe("getServices", () => {
  it("should return all services", () => {
    expect(getServices()).toStrictEqual(data);
  });
});

describe("getRecomendations", () => {
  it("should return all recommendations", () => {
    expect(getRecomendations()).toStrictEqual(contsData);
  });
});



describe("deleteRecomendations", () => {
  it("should delete all the recommendations", () => {
    deleteRecomendations();
    expect(getRecomendationsLength()).toBe(0);
  });
});

describe("deleteServices", () => {
  it("should delete all services", () => {
    deleteServices();
    expect(servicesLen()).toBe(0);
  });
});
