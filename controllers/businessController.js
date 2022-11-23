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

    try {
        //ADD MORE VALIDATIONS

        // !req.body.category || !req.body.address || !req.body.lat || !req.body.long || !req.body.poc || !req.body.description || id ??
        if (!req.body.name || !req.body.location) {
            throw new Error("missing data");
        };
        //ADD MORE VALIDATIONS
        if (req.body.name != " " || req.body.location != " ") {
            await businessService.createBusiness(req.body);
            res.send({ status: "OK" })
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


// delete a cause
// export function deleteCause(req, res) {
//     const id = req.params.causeId;
//     Cause.findByIdAndRemove(id)
//       .exec()
//       .then(()=> res.status(204).json({
//         success: true,
//       }))
//       .catch((err) => res.status(500).json({
//         success: false,
//       }));
//   }


module.exports = {
    getAllBusinesses,
    createBusiness,
    deleteBusiness
}