import request from "supertest";
import app from "../app";
import firebase from "firebase/app";
import "firebase/auth";
import { Expense } from "../models";

describe("Expense API", () => {
  let testUser: firebase.User;
  let token: string;

  beforeAll(async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword("teste@teste.com", "12345678");
    testUser = firebase.auth().currentUser!;
    token = await testUser.getIdToken();
  });

  it("should update expense 1", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .put("/expense/1")
      .set("Authorization", token)
      .send({
        nome_gasto: "gasto teste",
        descricao_gasto: "teste de gasto",
        valor_gasto: 1234,
      });

    expect(result.status).toEqual(200);
    done();
  });

  it("should create test expense", async (done) => {
    expect.assertions(1);

    const prep = await Expense.findOne({
      where: { nome_gasto: "Teste Create gasto" },
    });
    if (prep) {
      await Expense.destroy({ where: { nome_gasto: "Teste Create gasto" } });
    }

    const result = await request(app)
      .post("/expense/new")
      .set("Authorization", token)
      .send({
        nome_gasto: "Teste Create gasto",
        dt_gasto: 12345,
        descricao_gasto: "Gasto gerado no teste do jest",
        valor_gasto: 1234,
        link_imagem_gasto: ".\teste de caminho ou link",
        id_viagem: 1,
      });

    expect(result.status).toEqual(201);
    done();
  });

  it("should get expense 2 data", async (done) => {
    expect.assertions(3);

    const result = await request(app)
      .get("/expense/2")
      .set("Authorization", token);

    expect(result.status).toEqual(200);
    expect(result.body.nome_gasto).toEqual("Janta");
    expect(result.body.valor_gasto).toEqual(500);
    done();
  });

  it("should get all expenses from travel 1", async (done) => {
    expect.assertions(1);

    const result = await request(app)
      .get("/expense")
      .query({ id_viagem: 1 })
      .set("Authorization", token)

    expect(result.status).toEqual(200);
    done();
  });

  // it.skip("should delete test Expense", async (done) => {
  // expect.assertions(1);

  // var expenseToDelete;

  // const token = await firebase.auth().currentUser!.getIdToken();
  // const uid = await firebase.auth().currentUser!.uid;

  // const prep = await Expense.findOne({
  // where: { nome_gasto: "gastoToDelete" },
  // });
  // if (!prep) {
  // userToDelete = await admin.auth().createUser({
  // email: "testUserDelete@email.com",
  // displayName: "UsuarioParaDelete",
  // password: "12345678",
  // });
  // }

  // const token = await firebase.auth().currentUser!.getIdToken();

  // const result = await request(app)
  // .delete(`/user/${userToDelete.uid}`)
  // .set("Authorization", token)
  // .send({
  // softDelete: "false",
  // });

  // expect(result.status).toEqual(200);
  // done();
  // });
});
