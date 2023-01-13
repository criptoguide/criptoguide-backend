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


const getUserOwnBusiness = async (req, res)=> {

  const ownerUserId = res.locals.user._id;
  

  const ownerBusinesess = await businessService.getOwnBusiness(ownerUserId);
 
  return res.send(ownerBusinesess);

}

const createBusiness = async (req, res) => {
    const { id, formatted_address, geometry, name, place_id, types, url, photos} = req.body

    console.log(req.user);
    //const POC = req.user._id.toString();


    const POC = res.locals.user._id.toString();
console.log("POC", POC)
    try {
        //ADD MORE VALIDATIONS

        // !req.body.category || !req.body.address || !req.body.lat || !req.body.long || !req.body.poc || !req.body.description || id ??

        if (!name ) {
            throw new Error("missing data");
        };
       // ADD MORE VALIDATIONS

        if (name != " ") {
            await businessService.createBusiness({id, formatted_address, geometry, name, place_id, types, url, POC})
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
    getUserOwnBusiness,
    createBusiness,
    deleteBusiness
}