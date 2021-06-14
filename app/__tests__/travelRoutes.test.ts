import request from "supertest";
import app from "../app";
import firebase from "firebase/app";
import "firebase/auth";
import moment from "moment";
import { Travel } from "../models";
import { TravelModel } from "../models/travel";

let testUser: firebase.User;
let token: string;

beforeAll(async () => {
  await firebase
    .auth()
    .signInWithEmailAndPassword("teste@teste.com", "12345678");
  testUser = firebase.auth().currentUser!;
  token = await testUser.getIdToken();
});

describe("POST /new", async () => {
  let idToDelete: number

  afterEach(async () =>{
    if (idToDelete) {
      await Travel.destroy({ where: { id_viagem: idToDelete  } })
    }
  });

  it("should create a travel with basic fields (not optinals)", async (done) => {
    let data = {
      nome_viagem: "Teste",
    }

    const result = await request(app)
      .post("/travel/new")
      .set("Authorization", token)
      .send(data);

    expect(result.status).toEqual(201);
    idToDelete = result.body.id_viagem;
    done();
  });

  it("should return 400 if start date is later than end date", async (done) =>{
    expect.assertions(1);

    const data = {
      nome_viagem: "Teste",
      dt_inicio: moment("2021-06-04").unix(),
      dt_fim: moment("2021-06-01").unix(),
    }

    const result = await request(app)
      .post("/travel/new")
      .set("Authorization", token)
      .send(data);

    expect(result.status).toEqual(400);
    done();
  });

});

describe("PUT /:id", async () => {
  let travel: TravelModel

  beforeEach(async () => {
    travel = await Travel.create({ nome_viagem: "Teste" })
  });

  it("should return 400 if start date is later than end date", async (done) =>{
    expect.assertions(1);

    const data = {
      dt_inicio: moment().unix(),
      dt_fim: 1,
    }

    const result = await request(app)
      .post("/travel/new")
      .set("Authorization", token)
      .send(data);

    expect(result.status).toEqual(400);
    done();
  });
});
