import request from "supertest";
import app from "../app";
import { sequelize } from "../models/index";

describe("Clear database for the test", () => {
  it("should delete test User", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .delete("/user/testUser")
      .send({
        softDelete: "false"
      });

      expect(result.status).toEqual(200);
      done();

  });
});

describe("POST /new", () => {
  it("should create testUser", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .post("/user/new")
      .send({
        email: "testUser@myMail.com",
        nome: "testUser",
        dt_nascimento: 1,
        id_firebase: "testUser",
      });

    expect(result.status).toEqual(201);
    done();
  });
});

describe("PUT /", () => {
  it("should update testUser user", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .put("/user/testUser")
      .send({
        nome_usuario: "testUserUpdated",
        sexo: "1",
        dt_nascimento: 1123,
      });

    expect(result.status).toEqual(200);
    done();
  });
});

describe("GET /", () => {
  it("should get testUser data", async (done) => {
    expect.assertions(3);

    const result = await request(app)
      .get("/user/testUser");

    expect(result.status).toEqual(200);
    expect(result.body.id_firebase).toEqual("testUser");
    expect(result.body.nome_usuario).toEqual("testUserUpdated");
    done();
  });
});

describe("DELETE /", () => {
  it("should delete test User", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .delete("/user/testUser")
      .send({
        softDelete: "false"
      });

      expect(result.status).toEqual(200);
      done();
  });
});

afterAll(async () => {  
  await sequelize.close();
});