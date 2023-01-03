const Business = require("../database/dbBusiness/businessModel");
const businessService = require("../services/businessService")
var parser = require('accept-language-parser');


const getAllBusinesses = async (req, res) => {

    const { location, country, category } = req.query;

const acceptedLanguage = req.headers["accept-language"];
const lang = parser.parse(acceptedLanguage);



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
    const { name, location, category, lat, long,translation, poc, description } = req.body; // add

    const POC = req.user._id.toString();
    try {
        //ADD MORE VALIDATIONS

        // !req.body.category || !req.body.address || !req.body.lat || !req.body.long || !req.body.poc || !req.body.description || id ??

        if (!name || !location) {
            throw new Error("missing data");
        };
        // ADD MORE VALIDATIONS

        if (name != " " || location != " ") {
           await businessService.createBusiness({name, location, category, lat,translation,  long, description, POC})
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
        const POC = req.user._id.toString();

    await  businessService.deleteBusiness({ id, POC });

       //res.status(200).send({ status: "OK" });
 
     

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