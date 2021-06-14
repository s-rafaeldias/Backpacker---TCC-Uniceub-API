import request from "supertest";
import app from "../app";
import firebase from "firebase";
import { UserModel } from "../models/user";
import { TravelModel } from "../models/travel";
import { User, Travel } from "../models";

describe("POST /travel/:id/user/new", () => {
  let user: UserModel;
  let user2: UserModel;
  let travel: TravelModel;
  let token: string;

  beforeEach(async () => {
    // @ts-ignore
    user = await User.findByPk(1, { include: ["travels"] });
    // @ts-ignore
    user2 = await User.findByPk(2, { include: ["travels"] });

    travel = await Travel.create({ nome_viagem: "Viagem de teste" });
    await user.addTravel(travel);

    // @ts-ignore
    await firebase.auth().signInWithEmailAndPassword(user.email, "12345678");
    token = await firebase.auth().currentUser!.getIdToken();
  });

  afterEach(async () => {
    await firebase.auth().signOut();
    await travel.destroy();
  });

  it("should fail if no token provided", async () => {
    expect.assertions(1);

    let result = await request(app)
      .post(`/travel/${travel.id_viagem}/user/new`);

    expect(result.status).toBe(401);
  });

  it("should add new valid user by email to travel", async () => {
    expect.assertions(2);

    let result = await request(app)
      .post(`/travel/${travel.id_viagem}/user/new`)
      .set("Authorization", token)
      .send({ email: user2.email });

    expect(result.status).toBe(201);
    // @ts-ignore
    expect(travel.hasUser(user2)).toBeTruthy();
  });

  it("should add new user only if already in travel", async () => {
    expect.assertions(1);

    let tmpTravel = await Travel.create({ nome_viagem: "temp" });
    user2.addTravel(tmpTravel);

    let result = await request(app)
      .post(`/travel/${tmpTravel.id_viagem}/user/new`)
      .set("Authorization", token)
      .send({ email: user2.email });

    expect(result.status).toBe(401);

    await tmpTravel.destroy();
  });

  it("should fail if email is not from a valid user", async () => {
    expect.assertions(1);

    let result = await request(app)
      .post(`/travel/${travel.id_viagem}/user/new`)
      .set("Authorization", token)
      .send({ email: "emailaleatorio@erro.com" });

    expect(result.status).toBe(400);
  });

});

describe("GET /travel/:id/user", () => {
  let user: UserModel;
  let user2: UserModel;
  let travel: TravelModel;
  let token: string;

  beforeEach(async () => {
    // @ts-ignore
    user = await User.findByPk(1);
    // @ts-ignore
    user2 = await User.findByPk(2);

    travel = await Travel.create({ nome_viagem: "Viagem de teste" });
    await user.addTravel(travel);
    await user2.addTravel(travel);

    // @ts-ignore
    await firebase.auth().signInWithEmailAndPassword(user.email, "12345678");
    token = await firebase.auth().currentUser!.getIdToken();
  });

  afterEach(async () => {
    await firebase.auth().signOut();
    await travel.destroy();
  });

  it("should fail if no token provided", async () => {
    expect.assertions(1);

    let result = await request(app)
      .get(`/travel/${travel.id_viagem}/user`);

    expect(result.status).toBe(401);
  });

  it("should get list of users on that travel", async () => {
    expect.assertions(4);

    let result = await request(app)
      .get(`/travel/${travel.id_viagem}/user`)
      .set("Authorization", token);

    expect(result.status).toBe(200);
    expect(result.body.length).toBe(2);
    expect(result.body[0].id_usuario).toBe(user.id_usuario);
    expect(result.body[1].id_usuario).toBe(user2.id_usuario);
  });

  it("should only get list if user is in the travel", async () => {
    expect.assertions(1);

    // @ts-ignore
    travel.removeUser(user);

    let result = await request(app)
      .get(`/travel/${travel.id_viagem}/user`)
      .set("Authorization", token);

    expect(result.status).toBe(401);
  });

});

describe("DELETE /travel/:id/user/:id_usuario", () => {
  let user: UserModel;
  let user2: UserModel;
  let travel: TravelModel;
  let token: string;

  beforeEach(async () => {
    // @ts-ignore
    user = await User.findByPk(1);
    // @ts-ignore
    user2 = await User.findByPk(2);

    travel = await Travel.create({ nome_viagem: "Viagem de teste" });
    // @ts-ignore
    await travel.addUser(user);
    // @ts-ignore
    await travel.addUser(user2);

    // @ts-ignore
    await firebase.auth().signInWithEmailAndPassword(user.email, "12345678");
    token = await firebase.auth().currentUser!.getIdToken();
  });

  afterEach(async () => {
    await firebase.auth().signOut();
    await travel.destroy();
  });

  it("should fail if no token provided", async () => {
    expect.assertions(1);

    let result = await request(app)
      .delete(`/travel/${travel.id_viagem}/user/${user2.id_usuario}`);

    expect(result.status).toBe(401);
  });

  it("should remove user from travel", async () => {
    expect.assertions(2);

    let result = await request(app)
      .delete(`/travel/${travel.id_viagem}/user/${user2.id_usuario}`)
      .set("Authorization", token);

    expect(result.status).toBe(200);

    await travel.reload();
    // @ts-ignore
    expect(await travel.hasUser(user2)).toBeFalsy();
  });

  it("should remove user only if user token is in travel", async () => {
    expect.assertions(1);

    // @ts-ignore
    travel.removeUser(user);

    let result = await request(app)
      .delete(`/travel/${travel.id_viagem}/user/${user2.id_usuario}`)
      .set("Authorization", token);

    expect(result.status).toBe(401);
  });
});
