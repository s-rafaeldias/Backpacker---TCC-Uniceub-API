import request from "supertest";
import app from "../app";
import admin from "firebase-admin";
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
