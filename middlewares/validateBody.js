// const validateBody = (shema) => {
//   const func = (req, res, next) => {
//     const { error } = shema.validate(req.body);
//     if (error) {
//       res.status(400).json({ message: error.message });
//       return;
//     }
//     next();
//   };

//   return func;
// };

const validateBody = shema => (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    next();
};

module.exports = validateBody;
