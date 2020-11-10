const { db } = require('./db');
const app = require('./index');
const PORT = 3000;

const init = async () => {
  await db.sync();
  app.listen(PORT, () =>
    console.log(`
      listening on port: ${PORT}
      `)
  );
};

init();
