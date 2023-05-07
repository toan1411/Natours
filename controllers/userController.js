/* eslint-disable no-unused-vars */
const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (rep, res) =>
  res.status(200).json({
    status: 'success',
    data: {
      users: users,
    },
  });

exports.createUser = (req, res) => {
  const newID = users[users.length - 1]._id + 1;
  const newUser = Object.assign({ newID }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (_err) =>
      res.status(201).json({
        status: 'success',
        data: {
          newUser,
        },
      })
  );
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  console.log(id);
  const user = users.find((el) => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found',
    });
  }

  return res.status(200).json({
    status: 'success',
    data: user,
  });
};

exports.updateUser = (req, res) => {
  const id = req.params._id;
  const user = users.find((el) => el.id === id);

  if (!user) {
    return res.status(400).json({
      status: 'success',
      data: user,
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);

  if (!user) {
    return res.status(400).json({
      status: 'success',
      data: user,
    });
  }

  return res.status(200).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
