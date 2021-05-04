import request from "supertest";
import app from "../app";

describe("POST /new", () => {
  it("should create a new user", async () => {
    expect.assertions(1);

    const result = await request(app)
      .post("/user/new")
      .send({
        email: "teste4@gmail.com",
        nome: "Teste",
        dt_nascimento: 1,
        id_firebase: "ssaasasdsf",
      })

    expect(result.status).toEqual(201);
  });
});
