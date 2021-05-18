const { addLeaveRepo, getAllLeaveRecords } = require("../repository/db");

const addLeave = async (leave) => {
  if (leave) {
    return await addLeaveRepo({ ...leave });
  }
  return { ok: true, status: "Leave Details Added Successfully" };
};

const getAllLeaves = async (data) => {
  return await getAllLeaveRecords(data);
};

module.exports = {
  addLeave,
  getAllLeaves,
};
