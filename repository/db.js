const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://sigiriuser:sigiri123@sigirifurniture.4iws3.mongodb.net/sigiriDB?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/*attendance marking part*/
const createAttendance = async (id, epochTime, date) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("attendance");

    const response = await collection.insertOne({
      userId: id,
      epochTime: epochTime,
      date: date,
      isMarked: true,
    });

    return { ok: response.result.ok === 1 };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

const getAttendanceRecords = async (id, fromTime = 0) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("attendance");

    const response = await collection
      .find({
        userId: id,
        epochTime: { $gt: fromTime },
      })
      .toArray();

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

const getAllAttendanceRecords = async (fromTime = 0) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("attendance");

    const response = await collection
      .find({
        epochTime: { $gt: fromTime },
      })
      .toArray();

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

const isAttendanceFoundForDate = async (id, date) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("attendance");

    const response = await collection
      .find({
        userId: id,
        date: date,
      })
      .toArray();

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

/*employee handling part*/

const addEmployeeRepo = async ({
  fName,
  lName,
  email,
  nic,
  DOB,
  age,
  gender,
  maritalStat,
  currAdd,
  permAdd,
  mobileNo,
  landLine,
  emgContact,
  designation,
  department,
  joinedDate,
  workedCompany,
  yearsOfEx,
  empPic,
  cv,
  userId,
}) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("employees");

    const response = await collection.insertOne({
      FirstName: fName,
      LastName: lName,
      eMail: email,
      NIC: nic,
      DOB: DOB,
      Age: age,
      Gender: gender,
      MaritalStatus: maritalStat,
      CurrentAddress: currAdd,
      PermanentAddress: permAdd,
      MobileNumber: mobileNo,
      LandLineNumber: landLine,
      EmergencyContact: emgContact,
      Designation: designation,
      Department: department,
      JoinedDate: joinedDate,
      PreviouslyWorkedCompany: workedCompany,
      YearsOfExperiance: yearsOfEx,
      EmployeePicture: empPic,
      CV: cv,
      userId,
    });

    return { ok: response.result.ok === 1 };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

const getEmployeeRepo = async (id) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("employees");

    const response = await collection.findOne({
      userId: id,
    });

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

const getAllEmployeeRecords = async () => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("employees");

    const response = await collection.find().toArray();

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

const updateEmployeeRecord = async (userId, payload) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("employees");

    const response = await collection.updateOne(
      { userId: userId },
      {
        $set: {
          FirstName: payload.fName,
          LastName: payload.lName,
          eMail: payload.email,
          NIC: payload.nic,
          MaritalStatus: payload.maritalStat,
          CurrentAddress: payload.currAdd,
          PermanentAddress: payload.permAdd,
          MobileNumber: payload.mobileNo,
          LandLineNumber: payload.landLine,
          EmergencyContact: payload.emgContact,
          Designation: payload.designation,
          Department: payload.department,
          /*EmployeePicture: empPic,
          CV: cv,*/
        },
      }
    );

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB", error);
    return { ok: false };
  }
};

const deleteEmployeeRecord = async (userId) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("employees");

    const response = await collection.deleteOne({ userId: userId });

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB", error);
    return { ok: false };
  }
};

//leave management part
const addLeaveRepo = async ({ fName, lName, from, to, days, reason }) => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("leaves");

    const response = await collection.insertOne({
      FirstName: fName,
      LastName: lName,
      from: from,
      to: to,
      days: days,
      reason: reason,
    });

    return { ok: response.result.ok === 1 };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

const getAllLeaveRecords = async () => {
  try {
    await client.connect();
    const collection = client.db("sigiriDB").collection("leaves");

    const response = await collection.find().toArray();

    return { ok: true, data: response };
  } catch (error) {
    console.log("Something went wrong while connecting to DB");
    return { ok: false };
  }
};

module.exports = {
  createAttendance,
  getAttendanceRecords,
  isAttendanceFoundForDate,
  getAllAttendanceRecords,
  addEmployeeRepo,
  getEmployeeRepo,
  getAllEmployeeRecords,
  updateEmployeeRecord,
  deleteEmployeeRecord,
  addLeaveRepo,
  getAllLeaveRecords,
};
