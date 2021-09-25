const express = require("express");
const router = express.Router();

// @route   GET api/contacts
// @desc    get all users contacts
// @access  private

router.get("/", (req, res) => {
  res.send("get all contacts");
});

// @route   post api/contacts
// @desc    add new contact
// @access  private

router.post("/", (req, res) => {
  res.send("add contact");
});

// @route   PUT api/contact/:id
// @desc    update contact
// @access  private

router.put("/:id", (req, res) => {
  res.send("update contacts");
});

// @route   delete api/contact/:id
// @desc    delete contact
// @access  private

router.delete("/:id", (req, res) => {
  res.send("update contacts");
});

module.exports = router;
