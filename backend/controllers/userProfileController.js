import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js";
import TicketHistory from "../models/ticketHistoryModel.js";
import Ticket from "../models/ticketModel.js";


const userProfile = catchAsync(async (req, res) => {
  // let users
  // const user = await User.findOne({ _id: res.locals.authUser._id })
  const user = await User.findById(req.user.id)

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const updateProfile = catchAsync(async (req, res, next) => {
  const filterBody = filterObj(req.body, 'fullname', 'email', 'phone', 'address', 'gender', 'dob', 'photo');
  if (
    !req.body.fullname || req.body.fullname === '' ||
    !req.body.email || req.body.email === '' ||
    !req.body.phone || req.body.phone === '' ||
    !req.body.address || req.body.address === '' ||
    !req.body.gender || req.body.gender === '' ||
    !req.body.dob || req.body.dob === ''
  ) {
    return next(new AppError('Thông tin bạn nhập không hợp lệ!', 400));
  }

  // check valid name
  const regex = /^([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]|[a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ])*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/g;
  if (!regex.exec(req.body.fullname)) return next(new AppError('Họ và tên không hợp lệ', 400));

  // check birthday
  const regex_b =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;
  if (!regex_b.exec(req.body.dob)) return next(new AppError('Ngày sinh không hợp lệ', 400));

  // check phone number
  const regex_p = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (!regex_p.exec(req.body.phone)) return next(new AppError('Số điện thoại không hợp lệ', 400));

  // check name & address length
  if (req.body.fullname.length >= 50 || req.body.address.length >= 50)
    return next(new AppError('Thông tin user quá dài. Vui lòng nhập ít hơn 50 kí tự.'));

  // check gender
  const gender = ['Nam', 'Nữ', 'Khác'];
  if (!gender.includes(req.body.gender)) return next(new AppError('Giới tính không tồn tại'));
  // 3) Update user account
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, { new: true, runValidators: true });
  // console.log(updatedUser)
  res.status(200).json({ status: 'success', data: { user: updatedUser } });
})

const changePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')
  // 1) Get user from collection
  // const user = await User.findById(res.locals.authUser._id).select('+password');
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(new AppError('Mật khẩu hiện tại không đúng'), 401);
  }

  if (req.body.newPassword.length < 8) {
    return next(new AppError('Mật khẩu mới quá ngắn'), 401);
  }

  // 3) If so, update password
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new AppError('Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp'), 401);
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(200).json({ status: 'success' });
})

const getMyTicket = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id)
  const myTicket = []

  // console.log(user)

  for (let i of user.myTicket) {
    const ticket = await TicketHistory.findById(i)
    // if (ticket && ticket.stage === "Đã đặt") 
    myTicket.push(ticket)
    // else user.myTicket.splice(user.myTicket.indexOf(i), 1)
  }


  res.status(200).json({
    status: 'success',
    data: myTicket
  })
})


export { userProfile, updateProfile, changePassword, getMyTicket }