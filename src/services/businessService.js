const Business = require("../database/dbBusiness/businessModel");
const BusinessDB = require("../database/business.js");

const findBusinessById = async (id) => {
  try {
    const businessExist = await Business.find({ id: id });
    if (businessExist.length > 0) {
      throw new Error("Business already created, please try another one");
    }
  } catch (e) {
    res.status(500).send({ status: "FAILED", error: e });
  }
};


const getAllBusinesses = async (filterParams) => {
    try {
      const allBusinesses = await Business.find({}).select('id formatted_address formatted_phone_number rating geometry name place_id types url photos  website published payment_methods');
      //sending all bs but not sending reports/reviews
      return allBusinesses;
    } catch (error) {
      throw error;
    }
  };

const getOwnBusiness = async (id) => {
  try {
    let ownerBusinesess = Business.find({ poc: id });

    return ownerBusinesess;
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createBusiness = (business) => {
  try {
    return BusinessDB.createBusiness(business);
  } catch (error) {
    throw error;
  }
};

const deleteBusiness = (params) => {
  try {
    BusinessDB.deleteBusiness(params);
  } catch (error) {
    throw error;
  }
};

const updateBusiness = (params) => {
    try {
      BusinessDB.updateBusiness(params);
    } catch (error) {
      throw error;
    }
  };
  
  const reportBusiness = (params) => {
    try {
      BusinessDB.reportBusiness(params);
    } catch (error) {
      throw error;
    }
  };
  


module.exports = {
  findBusinessById,
  getAllBusinesses,
  getOwnBusiness,
  createBusiness,
  deleteBusiness,
  updateBusiness,
  reportBusiness,
};
