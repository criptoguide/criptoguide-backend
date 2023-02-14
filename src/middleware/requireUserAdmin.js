import User from '../database/dbUsers/userModel';



const requireUserAdmin = async (req, res, next) => {


    const userAdmin = res.locals.user._id;


    let userIsAdminOrNot = await User.findById(userAdmin);

    if (userIsAdminOrNot.role !== "admin") {
        return res.sendStatus(403);
    }



    return next();
}

export default requireUserAdmin;