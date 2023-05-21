import Station from "../models/stationModel.js"
import catchAsync from "../utils/catchAsync.js"

const getAll = catchAsync(async (req, res) => {
  const stations = await Station.find()
  res.status(200).json({
    status: 'success',
    data: { stations }
  })
})

const getBySearch = catchAsync(async (req, res) => {
  const search = req.body.search.toLowerCase()
  const stations_filter = []
  const stations = await Station.find()
  for (let i of stations) {
    if (i.location.toLowerCase().includes(search)) {
      stations_filter.push(i)
      continue
    }
    for (let j of i.stations) {
      if (j.address.toLowerCase().includes(search) || j.phone.toLowerCase().includes(search)) stations_filter.push(i)
    }
  }
  res.status(200).json({
    status: 'success',
    data: { stations_filter }
  })
})

export { getAll, getBySearch }