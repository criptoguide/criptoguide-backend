const Business = require("../database/dbBusiness/businessModel");
const businessService = require("../services/businessService")



const getAllBusinesses = async (req, res) => {

    const { location, country, lang, category } = req.query;

    try {
        const allBusinesses = await businessService.getAllBusinesses({ location, country, lang, category });
        res.send({ status: "OK", data: allBusinesses });
    }

    catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });

    }

}

const createBusiness = async (req, res) => {
    const { name, location, category, lat, long, poc, description } = req.body; // add

    const POC = req.user._id.toString();
    try {
        //ADD MORE VALIDATIONS

        // !req.body.category || !req.body.address || !req.body.lat || !req.body.long || !req.body.poc || !req.body.description || id ??

        if (!name || !location) {
            throw new Error("missing data");
        };
        // ADD MORE VALIDATIONS

        if (name != " " || location != " ") {
           await businessService.createBusiness({name, location, category, lat, long, description, POC})
            res.status(200).send({ status: "OK"})
        }

    } catch (error) {

        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }

}


const deleteBusiness = async (req, res) => {
    try {
        const id = req.params.id;

        await businessService.deleteBusiness(id);

        res.status(200).send({ status: "OK" });

    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })

    }

}



module.exports = {
    getAllBusinesses,
    createBusiness,
    deleteBusiness
}