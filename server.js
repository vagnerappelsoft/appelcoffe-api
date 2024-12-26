const app = require('./src/app.js');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Para rodar a API, acesse: http://localhost:${PORT}`);
  // eslint-disable-next-line linebreak-style
});
