const connection = require("./db/connection");

(async () => {
  await connection.connectDB();
})();
