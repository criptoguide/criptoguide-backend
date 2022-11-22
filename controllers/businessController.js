const businessService = require("../services/businessService")


const getAllBusinesses = (req, res) => {


    const { location,  country, lang } = req.query;

    try {

        const allBusinesses = businessService.getAllBusinesses({ location, country, lang});
        res.send({ status: "OK", data: allBusinesses });
    }

    catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });

    }

}



module.exports = {
    getAllBusinesses,
}