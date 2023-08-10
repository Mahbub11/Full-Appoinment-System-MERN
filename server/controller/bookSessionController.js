const catchAsyncError = require("../middleware/catchAsyncErrors");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");
const availablityModel = require("../model/availablity");
const joi = require("joi");

exports.bookSession = catchAsyncError(async (req, res, next) => {

    try {

        await availablityModel.findOneAndUpdate({_id: req.body.selectedTimeId}, 
        {bookDate: req.body.day,},
         {useFindAndModify: true})
        .then((response)=>{
            if(response==null){
                res.status(401).json({
                    success: false,
                    message: `Session Booked error: ${error}`,
                  });
            }
            res.status(201).json({
                success: true,
                message: `Session Booked successfully`,
              });

        }).catch((error)=>{
            res.status(401).json({
                success: false,
                message: `Session Booked error: ${error}`,
              });
        })
        
    } catch (error) {
        
    }
})