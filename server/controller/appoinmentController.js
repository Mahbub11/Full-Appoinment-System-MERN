const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const availablityModel = require("../model/availablity");
const joi = require("joi");
var moment = require("moment");

exports.getAppoinments = catchAsyncError(async (req, res, next) => {
  try {
    await availablityModel
      .find({
        day: moment(req.params.date).format("ddd"),
        bookDate: req.params.date,
      })

      .then((response) => {
        res.status(201).json({
          success: true,
          message: `Appoinment Fetched Successfully`,
          slots: response,
        });
      })
      .catch((error) => {
        res.status(401).json({
          success: true,
          message: `Appoinment Fetched Error: ${error.message}`,
        });
      });
  } catch (error) {}
});
