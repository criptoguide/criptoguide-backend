import { createUser } from "../services/user.service";


export async function createUserHandler( req,res) {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e) {
    console.log(e)
       return res.status(409).send(e.message);
  }
}

export async function getCurrentUser(req, res) {
  return res.send(res.locals.user);
}