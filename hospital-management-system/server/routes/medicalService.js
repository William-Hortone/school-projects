const express = require("express");
const MedicalServicesModel = require("../models/MedicalServices");

const router = express.Router();

// Create a medical service
router.post("/medicalServices", (req, res) => {
  MedicalServicesModel.create(req.body)
    .then((service) => res.json(service))
    .catch((err) => res.json(err));
});

// Get all medical services
router.get("/getHospitalServices", (req, res) => {
  MedicalServicesModel.find({ isDisplayed: true })
    .then((medicalsSer) => res.json(medicalsSer))
    .catch((err) => res.json(err));
});

// Delete a medical service
router.put("/deleteService/:serviceId", (req, res) => {
  const id = req.params.serviceId;
  MedicalServicesModel.findOneAndUpdate(
    { serviceID: id },
    { $set: { isDisplayed: false } },
    { new: true }
  )
    .then((service) => {
      if (!service) {
        return res.json("not found");
      } else {
        if (service.isDisplayed === false) {
          return res.json("not found");
        }
        res.json("success");
      }
    })
    .catch((err) => res.status(500).json(err));
});

// Update a medical service
router.put("/editService/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;
  const updatedData = req.body;
  MedicalServicesModel.findOneAndUpdate(
    { serviceID: serviceId },
    {
      $set: updatedData,
    },
    { new: true }
  )
    .then((service) => {
      if (!service) {
        return res.json("notfound");
      }
      return res.json("success");
    })
    .catch((err) => res.json(err));
});

module.exports = router;
