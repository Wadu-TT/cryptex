const checkTime = (req, res, next) => {
  const currentDate = new Date();
  const startTime = new Date("2025-04-05T23:00:00+05:30");
  const endTime = new Date("2025-04-06T11:00:00+05:30");

  if (currentDate.getTime() < startTime.getTime()) {
    const error = new Error("Hunt has not started yet!");
    error.statusCode = 403;
    next(error);
  }

  if (currentDate.getTime() > endTime.getTime()) {
    const error = new Error("Hunt has ended!");
    error.statusCode = 403;
    next(error);
  }

  next();
};

module.exports = checkTime;
