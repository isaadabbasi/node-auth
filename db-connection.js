const mongoose = require('mongoose');

const estDBConnection = function estDBConnection() {
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const url = process.env.DB_URL.replace('<dbuser>', dbUsername).replace(
    '<dbpassword>',
    dbPassword
  );

  if (!url || !dbPassword || !dbUsername)
    throw new Error('Invalid database configuration');

  mongoose
    .connect(url, {
      reconnectTries: 3,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
    })
    .then(() => void console.log('⛓  - Database/MLab connection established'))
    .catch(err => void console.error(`Error connecting to mLab: `, err));
};

process.on('SIGINT', () => {
  mongoose.connection.close();
  process.exit(0);
});

module.exports = {
  estDBConnection
};
