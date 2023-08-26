const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// ilk categories yazan yer db deki tablo adı
const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
