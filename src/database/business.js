
const Business = require("../database/dbBusiness/businessModel");
const mongoose = require("mongoose");






const getAllBusinesses = async (filterParams) => {

    try {

        let business = await Business.find();

        if (!business) {
            throw new Error;
        }


        if (filterParams.location) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.location))
        }
        if (filterParams.country) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.country))
        }

        if (filterParams.category) {
            return business.filter((bs) => bs.location.toLowerCase().includes(filterParams.category))
        }

        return business;

    } catch (error) {

        res.status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }

}


const createBusiness = (business) => {

    try {
        console.log('Creating new business...');
        const newBusiness = new Business({
            id: business.id,
            name: business.name,
            formatted_address: business.formatted_address,            
            formatted_phone_number: business.formatted_phone_number,
            published: business.published,
            geometry: business.geometry,
            place_id: business.place_id,
            poc: business.POC,
            types: business.types,
            url: business.url,
            reviews: business.reviews,
            rating:business.rating,
            website:business.website,
            photos: business.photos,
            payment_methods: business.payment_methods,


        });

        return newBusiness.save().then(() => console.log("sucess!!"));
    } catch (error) {
        return error;
    }


}

const deleteBusiness = async (params) => {
    try {

        Business.findById({ _id: params.id }, async function (error, bs) {
            if (error) {
                console.log(error)
            } else if (bs.poc === params.POC) {
                console.log('deleting...');
                Business.findByIdAndDelete(params.id).exec().catch((err) => console.log(err));
                // return console.log("successfuly  deleted");
            } else {
                return;
            }
        })


    } catch (error) {
        throw Error;
    }
}

module.exports = { getAllBusinesses, createBusiness, deleteBusiness }