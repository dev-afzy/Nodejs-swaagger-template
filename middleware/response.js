const Constant = require('../utilities/constant');

const ResponseMiddleWare = {
  saveResponse: async (req, res) => {
    if (res.data) {
      // eslint-disable-next-line no-underscore-dangle
      return res.status(201).json({ success: true, id: res.data._id });
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
      .json({ success: true, message: Constant.labelList.invalidInput });
  },
  getAllResponse: async (req, res) => {
    if (res.data) {
      return res
        .status(200)
        .json({ success: true, count: res.data.count, data: res.data.data });
    }
    return res
      .status(500)
      .json({ success: false, error: Constant.labelList.serverError });
  },
  updateResponse: async (req, res) => {
    if (res.data) {
      return res
        .status(200)
        .json({ success: true, modifiedCount: res.data.nModified });
    }
    return res
      .status(500)
      .json({ success: false, error: Constant.labelList.serverError });
  },
  deleteResponse: async (req, res) => {
    if (res.data) {
      return res
        .status(200)
        .json({ success: true, deltedCount: res.data.deletedCount });
    }
    return res
      .status(500)
      .json({ success: false, error: Constant.labelList.serverError });
  },
};
module.exports = ResponseMiddleWare;
