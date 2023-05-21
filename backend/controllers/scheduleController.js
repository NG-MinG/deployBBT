import Schedule from "../models/scheduleModel.js"
import catchAsync from "../utils/catchAsync.js"
import AppError from "../utils/appError.js";

const getAll = catchAsync(async (req, res) => {
  const schedules = await Schedule.find()
  // console.log(schedules)
  res.status(200).json({
    status: 'success',
    data: { schedules }
  })
})

const getBySearch = catchAsync(async (req, res) => {
  const search = req.body.search.toLowerCase()
  const schedule_filter = []
  const schedules = await Schedule.find()
  for (let i of schedules) {
    if (i.departure_city.toLowerCase().includes(search) || i.arrival_city.toLowerCase().includes(search)) {
      schedule_filter.push(i)
    }
  }
  res.status(200).json({
    status: 'success',
    data: { schedule_filter }
  })
})

export { getAll, getBySearch }