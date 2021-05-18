const {
  createAttendance,
  getAttendanceRecords,
  isAttendanceFoundForDate,
  getAllAttendanceRecords,
} = require("../repository/db.js");


const time = require("time-stamp");

const markAttendance = async (id) => {
  const attendanceRecords = await isAttendanceFoundForDate(id, time());
  if (attendanceRecords.ok && attendanceRecords.data.length === 0) {
    return await createAttendance(id, Date.now(), time());
  }
  return { ok: true, status: "Updated Successfully" };
};

const getAttendance = async (id, days = 30) => {
  const dayMilliSeconds = days * 3600 * 24 * 1000;
  const fromEpochTime = Date.now() - dayMilliSeconds;
  return await getAttendanceRecords(id, fromEpochTime);
};

const getAllAttendance = async (id, days = 30) => {
  const dayMilliSeconds = days * 3600 * 24 * 1000;
  const fromEpochTime = Date.now() - dayMilliSeconds;
  return await getAllAttendanceRecords(fromEpochTime);
};

module.exports = { markAttendance, getAttendance, getAllAttendance };
