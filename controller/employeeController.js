const router = require("express").Router();
const {
  addEmployee,
  getEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../service/employeeService");

router.post("/employee", async (req, res) => {
  const newEmployee = req.body;
  if (newEmployee) {
    const response = await addEmployee(newEmployee);
    if (response.ok) {
      return res
        .status(201)
        .send({ status: response.status ? response.status : "Success" });
    }
    return res.status(500).send({ status: "Internal Server Error" });
  }
  return res.status(400).send({ status: "Invalid Request" });
});

router.get("/employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  if (employeeId) {
    const response = await getEmployee(employeeId);
    if (response.ok) {
      return res.status(200).send({
        status: response.status ? response.status : "Success",
        data: response,
      });
    }
    return res.status(500).send({ status: "Internal Server Error" });
  }
  return res.status(400).send({ status: "Invalid Request" });
});

router.put("/employee/:employeeId", async (req, res) => {
  const employee = req.body;
  const { employeeId } = req.params;

  if (employee && employeeId) {
    const response = await updateEmployee(employeeId, employee);
    if (response.ok) {
      return res.status(200).send({
        status: response.status ? response.status : "Success",
      });
    }
    return res.status(500).send({ status: "Internal Server Error" });
  }
  return res.status(400).send({ status: "Invalid Request" });
});

router.delete("/employee/:employeeId", async (req, res) => {
  const { employeeId } = req.params;

  if (employeeId) {
    const response = await deleteEmployee(employeeId);
    if (response.ok) {
      return res.status(200).send({
        status: response.status ? response.status : "Success",
      });
    }
    return res.status(500).send({ status: "Internal Server Error" });
  }
  return res.status(400).send({ status: "Invalid Request" });
});

router.get("/employee", async (req, res) => {
  const { data } = req.query;
  const response = await getAllEmployees(data);
  if (response.ok) {
    console.log("done;");
    return res.status(200).send({ status: "Success", data: response.data });
  }
  return res.status(500).send({ status: "Internal Server Error" });
});

module.exports = router;
