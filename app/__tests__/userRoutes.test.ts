import request from "supertest";
import app from "../app";
import { sequelize } from "../models/index";
import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebase";

describe("POST /new", () => {
  let user;

  beforeEach(async () => {
    if (!admin.apps.length) {     
      admin.initializeApp({ projectId: "tcc-backpacker" });
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().useEmulator("http://localhost:9099/");
      console.log("Firebase is on!");
    }

    user = await firebase.auth().signInWithEmailAndPassword('teste2@teste.com','12345678');
  });

    it("should update testUser", async (done) => {
    expect.assertions(1);

    const token = await firebase.auth().currentUser!.getIdToken();
    const uid = await firebase.auth().currentUser!.uid;

    const result = await request(app)
    .put(`/user/${uid}`)
    .set('Authorization', token)
    .send({
      sexo: "1",
      dt_nascimento: 1123,
    });

 
/*    const result = await request(app)
      .post("/user/new")
      .send({
        email: "testUser@myMail.com",
        nome: "testUser",
        dt_nascimento: 1,
        id_firebase: "testUser",
      });*/

    expect(result.status).toEqual(200);
    done();
  });
});




/*describe("Clear database for the test", () => {
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
});*/

afterAll(async () => {  
  await sequelize.close();
});