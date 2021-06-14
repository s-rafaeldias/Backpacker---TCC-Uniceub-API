if (process.env.DEBUG) {
  // Adiciona um timeout gigante para poder dar tempo de debugar;
  jest.setTimeout(999999999);
}
