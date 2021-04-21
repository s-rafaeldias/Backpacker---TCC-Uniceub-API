import { createUser } from '../app/services/user';
import { UserCreationAttributes } from "../app/models/user";

test('create user', async () => {
  expect.assertions(1);

  let user: UserCreationAttributes = {
    nome_usuario: "Teste",
    email: "tasdeste@gmalasdil.com",
    id_firebase: "asdasdf",
    dt_nascimento: 1,
  }

  let u = await createUser(user);
  expect(u).toBeDefined();
});
