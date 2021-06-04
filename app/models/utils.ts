import { User, Travel, UserTravel, Expense, Spot } from "./index";
import { UserCreationAttributes } from "./user";
import admin from "firebase-admin";

export async function seedDatabase() {
  // Deletando os usuarios do Firebase para
  // criar novos.
  // E feito isso para nao precisar reiniciar
  // o emulador do Firebase toda vez que alterar
  // o codigo
  try {
    let usersToDelete = await admin.auth().listUsers();
    usersToDelete.users.forEach((user) => {
      admin.auth().deleteUser(user.uid);
    });
  } catch (err) {
    console.log("Erro ao deletar usuario do firebase\n", err);
  }

  let users: UserCreationAttributes[] = [
    {
      nome_usuario: "Teste 1",
      email: "teste@teste.com",
      dt_nascimento: new Date(),
      email_verificado: true,
      id_firebase: "asdf",
    },
    {
      nome_usuario: "Teste 2",
      email: "teste2@teste.com",
      dt_nascimento: new Date(),
      email_verificado: true,
      id_firebase: "teste2",
    },
    {
      nome_usuario: "Teste 3",
      email: "teste3@teste.com",
      dt_nascimento: new Date(),
      email_verificado: true,
      id_firebase: "teste3",
    },
  ];

  // Add users to Firebase Emulator
  for (let user of users) {
    try {
      let userRecord = await admin.auth().createUser({
        email: user.email,
        displayName: user.nome_usuario,
        password: "12345678",
      });
      user.id_firebase = userRecord.uid;

      await User.create(user);
    } catch (err) {
      console.log(err);
    }
  }

  await Travel.bulkCreate([
    {
      nome_viagem: "Viagem 1",
      orcamento_viagem: 10_000,
      dt_inicio: new Date("2020-01-01"),
      dt_fim: new Date("2020-01-31"),
      descricao: "BBBB",
    },
    {
      nome_viagem: "Viagem 2",
      orcamento_viagem: 15_000,
      dt_inicio: new Date(),
      dt_fim: new Date(),
    },
    {
      nome_viagem: "Viagem 3",
      orcamento_viagem: 1_000,
      dt_inicio: new Date(),
      dt_fim: new Date(),
      descricao: "BBBB",
    },
  ]);

  await UserTravel.bulkCreate([
    { id_usuario: 1, id_viagem: 1 },
    { id_usuario: 1, id_viagem: 2 },
    { id_usuario: 2, id_viagem: 3 },
  ]);

  await Expense.bulkCreate([
    {
      nome_gasto: "Almoço",
      dt_gasto: new Date(),
      descricao_gasto: "Restaurante x",
      valor_gasto: 200,
      link_imagem_gasto: "https://kjshdkjasd",
      id_viagem: 1,
    },
    {
      nome_gasto: "Janta",
      dt_gasto: new Date(),
      descricao_gasto: "Restaurante Y",
      valor_gasto: 500,
      link_imagem_gasto: "https://kjshdkjaasdasdsd",
      id_viagem: 1,
    },
    {
      nome_gasto: "Entrada Museu",
      dt_gasto: new Date(),
      descricao_gasto: "Museu Nacional",
      valor_gasto: 60,
      link_imagem_gasto: "https://kjsd",
      id_viagem: 2,
    },
  ]);

  await Spot.bulkCreate([
    {
      nome_local: "Cidade A",
      descricao_local: "bla",
      dt_planejada: new Date(),
      visitado: true,
      id_viagem: 1
    },
    {
      nome_local: "Lugar B",
      descricao_local: "a".repeat(300),
      dt_planejada: new Date(),
      visitado: true,
      id_viagem: 1
    },
    {
      nome_local: "Cidade B",
      dt_planejada: new Date(),
      visitado: true,
      id_viagem: 2
    },
  ])
}
