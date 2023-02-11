const Business = require("../database/dbBusiness/businessModel");
const businessService = require("../services/businessService")
var parser = require('accept-language-parser');




const findBusinessById = async (req, res) => {
 try {

     let id = req.body.id;

     let bs =  businessService.findBusinessById(id);

     if(bs){
        return true;
     }

     

 }catch(e){
    res.status(200).send(false)
 }







}


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


const getUserOwnBusiness = async (req, res) => {

    const ownerUserId = res.locals.user._id;


    const ownerBusinesess = await businessService.getOwnBusiness(ownerUserId);

    return res.send(ownerBusinesess);

}

const createBusiness = async (req, res) => {
    const { id, formatted_address, formatted_phone_number, reviews, rating, geometry, name, place_id, types, url, photos, website, published } = req.body

    console.log(req.user);
    //const POC = req.user._id.toString();

    const POC = res.locals.user._id.toString();

    try {
        //ADD MORE VALIDATIONS

        // !req.body.category || !req.body.address || !req.body.lat || !req.body.long || !req.body.poc || !req.body.description || id ??


        // const businessExist = await Business.findById(place_id)
        // if (businessExist){
        //     console.log("ERROR ALREADY CREATED")
        //     throw new Error("Business already created, please try another one")
        // }
        

        if (!name) {
            throw new Error("Business name not found");
        };
        // ADD MORE VALIDATIONS



        if (name != " ") {
            await businessService.createBusiness({ id, name, formatted_address, geometry,website,  formatted_phone_number, reviews, rating, place_id, types, url,published,website,  POC, photos })
            res.status(200).send({ status: "OK" })
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

        await businessService.deleteBusiness({ id, POC });

        //res.status(200).send({ status: "OK" });



    } catch (error) {
        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })

    }

}



module.exports = {
    findBusinessById,
    getAllBusinesses,
    getUserOwnBusiness,
    createBusiness,
    deleteBusiness
}