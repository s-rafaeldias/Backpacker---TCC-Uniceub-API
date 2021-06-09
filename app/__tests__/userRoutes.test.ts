import request from "supertest";
import app from "../app";
import admin from "firebase-admin";
import { User } from "../models";
import moment from "moment";
import { sequelize } from "../models";
import { UserModel } from "../models/user";
import firebase from "firebase";
import { createUser } from "../services/user";

jest.useFakeTimers();

afterAll(() => {
  sequelize.close();
});

describe("POST /new", () => {
  let postData = {
    email: "testedogg@teste.com",
    nome_usuario: "teste",
    senha: "12345678",
  };

  afterEach(async () => {
    await User.destroy({ where: { email: postData.email } });
    let user = await admin.auth().getUserByEmail(postData.email);
    if (user) {
      await admin.auth().deleteUser(user.uid);
    }
  });

  it("should create a user with only required fields", async () => {
    expect.assertions(2);

    const result = await request(app)
      .post("/user/new")
      .send(postData);

    expect(result.status).toBe(201);
    expect(result.body.id_usuario).toBeTruthy();
  });

  it("should create a user with with valid unix date on body", async () => {
    expect.assertions(2);

    const result = await request(app)
      .post("/user/new")
      .send({ ...postData, dt_nascimento: moment("1995-09-09").unix() });

    expect(result.status).toBe(201);
    expect(result.body.id_usuario).toBeTruthy();
  });

  it("should return a error if the date is not in unix format", async () => {
    expect.assertions(1);

    const result = await request(app)
      .post("/user/new")
      .send({ ...postData, dt_nascimento: moment("1995-09-09") });

    expect(result.status).toBe(400);
  });

  it("should create user on firebase", async () => {
    expect.assertions(2);

    const result = await request(app)
      .post("/user/new")
      .send(postData);

    expect(result.status).toBe(201);

    let firebaseUser = await admin.auth().getUserByEmail(postData.email);
    expect(firebaseUser).toBeDefined();
  });

  it("should return error if email already exists", async () => {
    expect.assertions(1);

    await request(app)
      .post("/user/new")
      .send(postData);

    const result = await request(app)
      .post("/user/new")
      .send(postData);

    expect(result.status).toBe(400);
  });
});

describe("PUT /:id", async () => {
  let user: UserModel;
  let fbUser: firebase.User;
  let token: string;

  beforeEach(async () => {
    // @ts-ignore
    user = await User.findByPk(3);
    await firebase.auth().signInWithEmailAndPassword(user.email, "12345678");
    token = await firebase.auth().currentUser!.getIdToken();
  });

  afterEach(async () => {
    await firebase.auth().signOut();
  });

  it("should fail if token not provided", async () => {
    expect.assertions(1);

    const result = await request(app).put(`/user/${user.id_firebase}`);

    expect(result.status).toBe(401);
  });

  it("should update on db and firebase", async () => {
    expect.assertions(2);

    const result = await request(app)
      .put(`/user/${user.id_firebase}`)
      .set("Authorization", token)
      .send({ email: "novoemail@mail.com" });

    expect(result.status).toBe(200);

    // @ts-ignore
    await firebase.auth().currentUser.reload();
    // @ts-ignore
    expect(firebase.auth().currentUser.email).toBe("novoemail@mail.com");
  });

  it("should update only if the token is for that user", async () => {
    expect.assertions(1);

    let differentUser = await firebase
      .auth()
      .signInWithEmailAndPassword("teste@teste.com", "12345678");
    let differentUserToken = await differentUser.user!.getIdToken();

    const result = await request(app)
      .put(`/user/${user.id_firebase}`)
      .set("Authorization", differentUserToken)
      .send({ email: "novoemail@mail.com" });

    expect(result.status).toBe(401);
  });
});

describe("GET /:id", async () => {
  let user: UserModel;
  let fbUser: firebase.User;
  let token: string;

  beforeEach(async () => {
    // @ts-ignore
    user = await User.findByPk(3);
    await firebase.auth().signInWithEmailAndPassword(user.email, "12345678");
    token = await firebase.auth().currentUser!.getIdToken();
  });

  afterEach(async () => {
    await firebase.auth().signOut();
  });

  it("should fail if token not provided", async () => {
    expect.assertions(1);

    const result = await request(app).get(`/user/${user.id_firebase}`);

    expect(result.status).toBe(401);
  });

  it("should get only if the token is for that user", async () => {
    expect.assertions(1);

    let differentUser = await firebase
      .auth()
      .signInWithEmailAndPassword("teste@teste.com", "12345678");
    let differentUserToken = await differentUser.user!.getIdToken();

    const result = await request(app)
      .get(`/user/${user.id_firebase}`)
      .set("Authorization", differentUserToken);

    expect(result.status).toBe(401);
  });

  it("should get user", async () => {
    expect.assertions(2);

    const result = await request(app)
      .get(`/user/${user.id_firebase}`)
      .set("Authorization", token);

    expect(result.status).toBe(200);
    expect(result.body.id_usuario).toBe(user.id_usuario);
  });
});

describe("DELETE /:id", async () => {
  let user: UserModel;
  let fbUser: firebase.User;
  let token: string;

  beforeEach(async () => {
    // @ts-ignore
    user = await createUser({
      nome_usuario: "Teste do deletar",
      email: "asdf@teste.com",
      senha: "12345678",
    });
    await firebase.auth().signInWithEmailAndPassword(user.email, "12345678");
    token = await firebase.auth().currentUser!.getIdToken();
  });

  afterEach(async () => {
    try {
      await User.destroy({where: { id_usuario: user.id_usuario }});
      await firebase.auth().signOut();
      await admin.auth().deleteUser(user.id_firebase);
    } catch (err) {}
  });

  it("should fail if token not provided", async () => {
    expect.assertions(1);

    const result = await request(app)
      .delete(`/user/${user.id_firebase}`);

    expect(result.status).toBe(401);
  });

  it("should delete only if user is the same from the token", async () => {
    expect.assertions(1);

    let differentUser = await firebase
      .auth()
      .signInWithEmailAndPassword("teste@teste.com", "12345678");
    let differentUserToken = await differentUser.user!.getIdToken();

    let result = await request(app)
      .delete(`/user/${user.id_firebase}`)
      .set("Authorization", differentUserToken);

    expect(result.status).toBe(401);
  });

  it("should delete if soft_delete is false", async () => {
    expect.assertions(3);

    const result = await request(app)
      .delete(`/user/${user.id_firebase}`)
      .set("Authorization", token)
      .send({ soft_delete: false });

    expect(result.status).toBe(200);
    expect(await User.findByPk(user.id_usuario)).toBeFalsy();
    await expect(admin.auth().getUser(user.id_firebase)).rejects.toThrow();
  });

  it("should keep user if soft_delete is true", async () => {
    expect.assertions(3);

    const result = await request(app)
      .delete(`/user/${user.id_firebase}`)
      .set("Authorization", token)
      .send({ soft_delete: true });

    expect(result.status).toBe(200);
    await user.reload();
    expect(user.conta_ativa).toBeFalsy();
    expect(await admin.auth().getUser(user.id_firebase)).toBeDefined();
  });
});
