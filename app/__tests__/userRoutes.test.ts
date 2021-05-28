import request from "supertest";
import app from "../app";
import { sequelize } from "../models/index";
import admin from "firebase-admin";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../config/firebase";
import { User } from "../models";
import { UserModel, UserCreationAttributes } from "../models/user";

describe("USER API", () => {
  let testUser;

  beforeEach(async () => {
    if (!admin.apps.length) {     
      admin.initializeApp({ projectId: "tcc-backpacker" });
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().useEmulator("http://localhost:9099/");
      console.log("Firebase is on!");
    }

    testUser = await firebase.auth().signInWithEmailAndPassword('teste2@teste.com','12345678');
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

    expect(result.status).toEqual(200);
    done();
  });

  it("should create test User", async (done) => {
    expect.assertions(1);

    const prep = await User.findOne({ where: { id_firebase: "testUser" } });
    if(prep){
      await User.destroy({ where: { id_firebase: "testUser" } });
    }
    
     const result = await request(app)
     .post("/user/new")
     .send({
        email: "testUser@myMail.com",
        nome: "testUser",
        dt_nascimento: 1,
        id_firebase: "testUser",
      })

      expect(result.status).toEqual(201);
      done();

  });

  it("should get testUser data", async (done) => {
    expect.assertions(3);

    const token = await firebase.auth().currentUser!.getIdToken();
    const uid = await firebase.auth().currentUser!.uid;

    const result = await request(app)
      .get(`/user/${uid}`)
      .set('Authorization', token);
 
    expect(result.status).toEqual(200);
    expect(result.body.id_firebase).toEqual(uid);
    expect(result.body.email).toEqual("teste2@teste.com");
    done();
  });

  it("should delete test User", async (done) => {
    expect.assertions(1);

    var userToDelete;

    const prep = await User.findOne({ where: { email: "testUserDelete@email.com" } });
    if(!prep){
        userToDelete = await admin.auth().createUser({
          email: "testUserDelete@email.com",
          displayName: "UsuarioParaDelete",
          password: "12345678",
        });     
      }
    else{
      userToDelete = await firebase.auth().signInWithEmailAndPassword('testUserDelete@email.com','12345678');
    }    
  
    const token = await firebase.auth().currentUser!.getIdToken();

    const result = await request(app)
      .delete(`/user/${userToDelete.uid}`)
      .set('Authorization', token)
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