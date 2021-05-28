import request from "supertest";
import app from "../app";
import { sequelize } from "../models/index";
import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";
import { User } from "../models";

describe("USER API", () => {
  let testUser: firebase.User;

  beforeEach(async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword("teste@teste.com", "12345678");
    testUser = firebase.auth().currentUser!;
  });

  it("should update testUser", async (done) => {
    expect.assertions(1);

    const token = await testUser.getIdToken();

    const result = await request(app)
      .put(`/user/${testUser.uid}`)
      .set("Authorization", token)
      .send({
        sexo: "1",
        dt_nascimento: 1123,
      });

    expect(result.status).toEqual(200);
    done();
  });

  it("should create test User", async (done) => {
    expect.assertions(1);

    const prep = await User.findOne({ where: { id_firebase: "testUser" } });
    if (prep) {
      await User.destroy({ where: { id_firebase: "testUser" } });
    }

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

  it("should get testUser data", async (done) => {
    expect.assertions(3);

    const token = await testUser.getIdToken();

    const result = await request(app)
      .get(`/user/${testUser.uid}`)
      .set("Authorization", token);

    expect(result.status).toEqual(200);
    expect(result.body.id_firebase).toEqual(testUser.uid);
    expect(result.body.email).toEqual("teste@teste.com");
    done();
  });

  it("should delete test User", async (done) => {
    expect.assertions(1);

    const prep = await User.findOne({
      where: { email: "testUserDelete@email.com" },
    });
    if (!prep) {
      User.create({
        nome_usuario: "TesteDoDelete",
        email: "testUserDelete@email.com",
        id_firebase: "teste",
        dt_nascimento: new Date()
      });
    }

    const token = await testUser.getIdToken();

    const result = await request(app)
      .delete(`/user/teste`)
      .set("Authorization", token)
      .send({
        softDelete: "false",
      });

    expect(result.status).toEqual(200);
    done();
  });
});
