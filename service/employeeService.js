const {
  addEmployeeRepo,
  getEmployeeRepo,
  getAllEmployeeRecords,
  updateEmployeeRecord,
  deleteEmployeeRecord,
} = require("../repository/db");
const { v4: uuidv4 } = require("uuid");

const addEmployee = async (employee) => {
  if (employee) {
    const userId = uuidv4();
    return await addEmployeeRepo({ userId, ...employee });
  }
  return { ok: true, status: "Added Successfully" };
};

const getEmployee = async (employeeId) => {
  if (employeeId) {
    return await getEmployeeRepo(employeeId);
  }
  return { ok: true, status: "Retrieved Successfully" };
};

const getAllEmployees = async (data) => {
  return await getAllEmployeeRecords(data);
};

const updateEmployee = async (userId, data) => {
  return await updateEmployeeRecord(userId, data);
};

const deleteEmployee = async (userId) => {
  return await deleteEmployeeRecord(userId);
};

module.exports = {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
