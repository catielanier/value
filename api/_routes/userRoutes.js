const express = require("express");
const router = express.Router();
const userService = require("../_services/userServices");
const tokenService = require("../_utils/tokenService");
const middleWare = require("../_middleware");
const { applyMiddleware } = require("../_utils");

applyMiddleware(middleWare, router);

router.route("/signup").post(async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body.data);
    res.status(201).json({
      data: [user],
    });
  } catch (e) {
    next(e);
  }
});

router.route("/login").post(async (req, res, next) => {
  try {
    const user = await userService.isUser(req.body.data);
    if (user) {
      const token = await tokenService.issueToken(user);
      res.status(200).json({
        data: {
          token,
          id: user._id,
          role: user.role,
        },
      });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
});

router.route("/:id").get(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    res.status(200).json({
      data: user,
    });
  } catch (e) {
    next(e);
  }
});

router.route("/").get(async (_, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      data: users,
    });
  } catch (e) {
    res.status(400).statusMessage(e);
  }
});

exports.router = router;
