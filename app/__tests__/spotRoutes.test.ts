import request from "supertest";
import app from "../app";
import firebase from "firebase/app";
import "firebase/auth";
import moment from "moment";
import { Spot } from "../models";
import { SpotModel } from "../models/spot";

let testUser: firebase.User;
let token: string;

// Executa antes de cada `describe`. Se for definido dentro de um
// `describe`, roda somente no escopo daquele `describe`
beforeEach(async () => {
  await firebase
    .auth()
    .signInWithEmailAndPassword("teste@teste.com", "12345678");
  testUser = firebase.auth().currentUser!;
  token = await testUser.getIdToken();
});

describe("POST /new", async () => {
  let idToDelete: number;

  // Garante que vai deletar qualquer spot criado nos testes
  afterEach(async () => {
    await Spot.destroy({ where: { id_local: idToDelete } });
  });

  it("should create new spot with all fields", async (done) => {
    expect.assertions(1);

    const data = {
      nome_local: "Teste",
      dt_planejada: moment().unix(),
      id_viagem: 1,
      descricao_local: "blablabla",
    };

    const result = await request(app)
      .post("/spot/new")
      .set("Authorization", token)
      .send(data);

    expect(result.status).toEqual(201);
    idToDelete = result.body.id_local;
    done();
  });

  it("should create new spot with only required fields", async (done) => {
    expect.assertions(1);

    const data = {
      nome_local: "Teste",
      id_viagem: 1,
    };

    const result = await request(app)
      .post("/spot/new")
      .set("Authorization", token)
      .send(data);

    expect(result.status).toEqual(201);
    idToDelete = result.body.id_local;
    done();
  });

  it("should raise error if date format is not unix", async (done) => {
    expect.assertions(1);

    const data = {
      nome_local: "Teste",
      dt_planejada: new Date(),
      id_viagem: 1,
    };

    const result = await request(app)
      .post("/spot/new")
      .set("Authorization", token)
      .send(data);

    expect(result.status).toEqual(400);
    done();
  });
});

describe("GET /:id", async () => {
  let spot: SpotModel;

  beforeEach(async () => {
    spot = await Spot.create({ nome_local: "teste do GET /:id", id_viagem: 1 });
  });

  afterEach(async () => {
    await Spot.destroy({ where: { id_local: spot.id_local } });
  });

  it("should return a spot", async (done) => {
    expect.assertions(2);

    const result = await request(app)
      .get(`/spot/${spot.id_local}`)
      .set("Authorization", token);

    expect(result.status).toBe(200);
    expect(result.body.id_local).toBe(spot.id_local);
    done();
  });

  it("should return a 404 if id is not in db", async (done) => {
    expect.assertions(2);

    const result = await request(app)
      .get("/spot/100")
      .set("Authorization", token);

    expect(result.status).toBe(404);
    expect(result.body.message).toBe("Not Found");
    done();
  });

  it("should return a error if no token is provided", async (done) => {
    expect.assertions(1);

    const result = await request(app).get("/spot/1");

    expect(result.status).toBe(401);
    done();
  });
});

describe("GET /", async () => {
  it("should return a list of all spot of a travel", async (done) => {
    expect.assertions(2);

    const result = await request(app)
      .get("/spot")
      .query({ id_viagem: 2 })
      .set("Authorization", token);

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(1);
    done();
  });

  it("should return a error if no token is provided", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .get("/spot")
      .query({ id_viagem: 2 });

    expect(result.status).toBe(401);
    done();
  });
});

describe("PUT /:id", async () => {
  let spot: SpotModel;

  beforeEach(async () => {
    spot = await Spot.create({
      nome_local: "Teste do GG",
      id_viagem: 3,
    });
  });

  afterEach(async () => {
    Spot.destroy({ where: { id_local: spot.id_local } });
  });

  it("should edit a existing spot", async (done) => {
    expect.assertions(2);

    const result = await request(app)
      .put(`/spot/${spot.id_local}`)
      .set("Authorization", token)
      .send({ nome_local: "novo nome" });

    expect(result.status).toBe(200);

    await spot.reload();
    expect(spot.nome_local).toBe("novo nome");
    done();
  });

  it("should return a error if no token is provided", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .put(`/spot/${spot.id_local}`)
      .send({ nome_local: "novo nome" });

    expect(result.status).toBe(401);
    done();
  });
});

describe("DELETE /:id", async () => {
  let spot: SpotModel;
  let id: number;

  beforeEach(async () => {
    spot = await Spot.create({
      nome_local: "Teste do GG",
      id_viagem: 1,
    });
    id = spot.id_local;
  });

  it("should delete spot", async (done) => {
    expect.assertions(2);

    const result = await request(app)
      .delete(`/spot/${spot.id_local}`)
      .set("Authorization", token);

    expect(result.status).toBe(200);
    let newSpot = await Spot.findByPk(id);
    expect(newSpot).toBeNull();
    done();
  });

  it("should return a error if no token is provided", async (done) => {
    expect.assertions(1);

    const result = await request(app).delete(`/spot/${spot.id_local}`);

    expect(result.status).toBe(401);
    done();
  });
});
