const router = require("express").Router();
const User = require("../models/user");

// get all users = *
router.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  if (allUsers.length <= 0) {
    res.status(404).json({ msg: `No users found` });
  } else {
    res.status(200).json({ msg: "All users", data: allUsers });
  }
});

// create a user = *
router.post("/", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    passwordHash: req.body.password,
  });
  res.status(201).json({ msg: "New user added", data: user });
});

// Get single user = *
router.get("/:id", async (req, res) => {
  const singleUser = await User.findOne({ where: { id: req.params.id } });
  if (!singleUser) {
    res.status(404).json({ msg: `User: ${req.params.id} not found` });
  } else {
    res.status(200).json({ msg: "Single user", data: singleUser });
  }
});

// delete all users = *
router.delete("/", async (req, res) => {
  const truncateUsers = await User.truncate();
  res.status(200).json({ msg: "All users have been removed" });
});

// update a single user = *
router.put("/:id", async (req, res) => {
  await User.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((results) => {
    if (results[0] > 0) {
      res.status(200).json({ msg: "User updated", data: req.body });
    } else {
      res.status(404).json({ msg: `User: ${req.params.id} not found` });
    }
  });
});

// delete a single user = *
router.delete("/:id", async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  }).then((results) => {
    if (results > 0) {
      res.status(200).json({ msg: `User: ${req.params.id} has been removed` });
    } else {
      res.status(404).json({ msg: `User: ${req.params.id} not found` });
    }
  });
});

module.exports = router;
