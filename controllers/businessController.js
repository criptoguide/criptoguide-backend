const businessService = require("../services/businessService")


const getAllBusinesses = (req, res) => {


    const { location, country, lang } = req.query;

    try {

        const allBusinesses = businessService.getAllBusinesses({ location, country, lang });
        res.send({ status: "OK", data: allBusinesses });
    }

    catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });

    }

}

const createBusiness = async (req, res) => {

    try {
        //ADD MORE VALIDATIONS
        //  !req.body.address || !req.body.lat || !req.body.long || !req.body.poc || !req.body.description || id ??
        if (!req.body.name) {
            throw new Error("missing data");
        };
        //ADD MORE VALIDATIONS
        if (req.body.name != " ") {
            await businessService.createBusiness(req.body);
            res.send({ status: "OK" })
        }
    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }

}



module.exports = {
    getAllBusinesses,
    createBusiness
}