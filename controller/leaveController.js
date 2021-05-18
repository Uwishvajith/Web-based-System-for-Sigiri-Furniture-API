const route = require("express").Router();

const { addLeave, getAllLeaves } = require("../service/leaveService");

route.post("/leave", async (req, res) => {
  const newLeave = req.body;
  if (newLeave) {
    const response = await addLeave(newLeave);
    if (response.ok) {
      return res
        .status(201)
        .send({ status: response.status ? response.status : "Success" });
    }
    return res.status(500).send({ status: "Internal Server Error" });
  }
  return res.status(400).send({ status: "Invalid Request" });
});

route.get("/leave", async (req, res) => {
  const { data } = req.query;
  const response = await getAllLeaves(data);
  if (response.ok) {
    console.log("done;");
    return res.status(200).send({ status: "Success", data: response.data });
  }
  return res.status(500).send({ status: "Internal Server Error" });
});

module.exports = route;
