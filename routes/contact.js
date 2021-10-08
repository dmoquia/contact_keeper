const express = require("express");
const router = express.Router();
const authMid = require("../middleware/authMid");
const { check, validationResult } = require("express-validator");
const Contact = require("../model/Contacts");
const User = require("../model/User");

// @route   GET api/contacts
// @desc    get all users contacts
// @access  private

router.get("/", authMid, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   post api/contacts
// @desc    add new contact
// @access  private

router.post(
  "/",
  [authMid, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    // res.send("add contact");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route   PUT api/contact/:id
// @desc    update contact
// @access  private

router.put("/:id", authMid, async (req, res) => {
  // res.send("update contacts");
  const { name, email, phone, type } = req.body;
  // build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "contact not found" });
    //this will make sure user owns contact and he/she will allow to update
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields,
      },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route   delete api/contact/:id
// @desc    delete contact
// @access  private

router.delete("/:id", authMid, async (req, res) => {
  // res.send("update contacts");
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });
    //this will make sure user owns contact and he/she will allow to update
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "not authorized" });
    }

    // contact = await Contact.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: contactFields,
    //   },
    //   { new: true }
    // );
    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "contact deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
