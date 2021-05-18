const router = require("express").Router();
const {
  markAttendance,
  getAttendance,
  getAllAttendance,
} = require("../service/attendanceService");

router.post("/user/:id/attendance", async (req, res) => {
  const { id } = req.params;

  if (id) {
    const response = await markAttendance(id);
    if (response.ok) {
      return res
        .status(201)
        .send({ status: response.status ? response.status : "Success" });
    }
    return res.status(500).send({ status: "Internal Server Error" });
  }
  return res.status(400).send({ status: "Invalid Request" });
});

router.get("/user/:id/attendance", async (req, res) => {
  const { id } = req.params;
  const { days } = req.query;

  if (id) {
    const response = await getAttendance(id, days);
    if (response.ok) {
      return res.status(200).send({ status: "Success", data: response.data });
    }
    return res.status(500).send({ status: "Internal Server Error" });
  }
  return res.status(400).send({ status: "Invalid Request" });
});

router.get("/attendance", async (req, res) => {
  const { days } = req.query;
  const response = await getAllAttendance(days);
  if (response.ok) {
    return res.status(200).send({ status: "Success", data: response.data });
  }
  return res.status(500).send({ status: "Internal Server Error" });
});

module.exports = router;
