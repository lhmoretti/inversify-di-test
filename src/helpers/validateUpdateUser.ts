import { User } from "../modules/user/user.entity";

export default async (user: User) => {
    if (await User.findByEmail(user.email)) throw new Error('El email ya se encuentra registrado');

    if (await User.findByUsername(user.username))
        throw new Error('El username ya se encuentra registrado');

    if (await User.findByTelefono(user.phone))
        throw new Error('El phone ya se encuentra registrado');
};
