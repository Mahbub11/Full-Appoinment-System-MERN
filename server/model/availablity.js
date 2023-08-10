const mongoose = require("mongoose");

const availablitySchema = new mongoose.Schema(
  {
    day:{
        type: String,
        required: true
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    bookDate:{
      type: String,
      default: null,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availablity", availablitySchema);
