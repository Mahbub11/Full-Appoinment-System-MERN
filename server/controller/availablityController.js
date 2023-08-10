const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const availablityModel = require("../model/availablity");
const joi = require("joi");
var moment = require('moment');  

exports.addAvailablity = catchAsyncError(async (req, res, next) => {
  try {
    
    req.body.forEach(async(data, index) => {
      day = data.day;
      startTime = data.startTime;
      endTime = data.endTime;
     await saveAvilableData(day, startTime, endTime).then((data) => {
        if (data) {
          res.status(201).json({
            success: true,
            message: `Availablity data saved successfully`,
          });
        }else{
          res.status(400).json({
            success: false,
            message: `Same Day & Times already Added`,
          });

        }      });
    });

    // if (savingRes) {
    //   console.log(response);
    //   res.status(201).json({
    //     success: true,
    //     message: `Availablity data saved successfully`,
    //   });
    // } else {
    //   res.status(400).json({
    //     success: false,
    //     message: `Same Day Same Times already Added`,
    //   });
    // }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const saveAvilableData = async (day, startTime, endTime) => {
  const availablitySchema = joi.object({
    day: joi.string().required(),
    startTime: joi.string().required(),
    endTime: joi.string().required(),
  });
  await availablitySchema.validateAsync({
    day: day,
    startTime: startTime,
    endTime: endTime,
  });
  const findDualData = await availablityModel.find({
    day: day,
    startTime: startTime,
    endTime: endTime,
  });

  if (findDualData.length > 0) {
    return false;
  } else {
    const availablityData = await availablityModel.create({
      day: day,
      startTime: startTime,
      endTime: endTime,
    });
    await availablityData.save();
    return true;
  }
};

exports.getAvailablity = catchAsyncError(async (req, res, next) => {

  try {
    const getavailablityData =await availablityModel.find()

    res.status(201).json({
      success: true,
      message: `Availablity data fetched`,
      availablityData:getavailablityData
    });
    
  } catch (error) {
    res.status(401).json({
      success: true,
      message: `Availableablity fetch error: ${error.message}`,
    });
  }
})


exports.deleteAvailablity = catchAsyncError(async (req, res, next) => {

  try {
   await availablityModel.findOneAndDelete(req.params.id)
    .then((response)=>{
      res.status(201).json({
        success: true,
        message: `Availablity data deleted successfully`,
      });
    }).catch((error) => {
      res.status(401).json({
        success: true,
        message: `Availablity delete error: ${error.message}`,
      });
    })
    
  } catch (error) {
    
  }
})

exports.getTimeSlotsInday = catchAsyncError(async (req, res, next) => {

  try {

    await availablityModel.find({
      day:moment(req.params.day).format('ddd'),
      bookDate:{$ne:req.params.day}
    })
   
    .then((response)=>{
      res.status(201).json({
        success: true,
        message: `Slots Fetched Successfully`,
        slots:response
      });
    }).catch((error) => {
      res.status(401).json({
        success: true,
        message: `Slots Fetched Error: ${error.message}`,
      });
    })
    
  } catch (error) {
    
  }


})