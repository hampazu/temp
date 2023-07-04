const mongoose = require("mongoose");

(async () => {
  await mongoose.connect("mongodb://localhost:27017/boli");
})();

module.exports = {
  User: require("./User"),
  Recording: require("./Recording"),
  Library: require("./Library"),
  Activity: require("./Activity"),
  Category: require("./Category")
};
