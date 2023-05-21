import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const getAllAccount = catchAsync(async (req, res) => {
    const account = await User.find()
    res.status(200).json({
      status: 'success',
      data: { account }
    })
  })

const banAccount = catchAsync(async (req, res) => {
    const getAccount = await User.findOne({_id: req.params.id});
    const tempStatus =  getAccount.active;
    const updateAccount = await User.updateOne(
      { _id: req.params.id },
      { active: !tempStatus }
    )
    const account = await User.find()
    res.status(200).json({
      status: 'success',
      data: { account }
    })
  });

  const deleteAccount = catchAsync(async (req, res) => {
    const getAccount = await User.deleteOne({_id: req.params.id});
    const account = await User.find()
    res.status(200).json({
      status: 'success',
      data: { account }
    })
  });

export {getAllAccount, banAccount, deleteAccount}
  