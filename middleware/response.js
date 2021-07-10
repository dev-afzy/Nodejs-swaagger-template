const Constant = require('../utilities/constant');

const ResponseMiddleWare = {
  saveResponse: async (req, res) => {
    if (res.data) {
      // eslint-disable-next-line no-underscore-dangle
      return res.status(201).json({ status: true, id: res.data._id });
    }
    return res
      .status(500)
      .json({ status: false, error: Constant.labelList.serverError });
  },
  getByIdResponse: async (req, res) => {
    if (res.data) {
      return res.status(200).json(res.data);
    }
    return res
      .status(404)
      .json({ status: true, message: Constant.labelList.invalidInput });
  },
  getAllResponse: async (req, res) => {
    if (res.data) {
      return res.status(200).json(res.data);
    }
    return res
      .status(500)
      .json({ status: false, error: Constant.labelList.serverError });
  },
};
module.exports = ResponseMiddleWare;
