const { User, Bootcamp } = require('../models');

const createUser = async (user) => {
    try {
        const usuario = await User.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
        console.log(`Se ha creado el usuario ${JSON.stringify(usuario, null, 4)}`);
        return usuario;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findUserById = async (userId) => {
    try {
        const usuarioRes = await User.findByPk(userId, {
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['title', 'cue', 'description'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (usuarioRes){
            console.log(`Se ha encontrado el usuario ${JSON.stringify(usuarioRes, null, 4)}`);
        }
        return usuarioRes;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAllUser = async () => {
    try {
        const usuariosRes = User.findAll({
            include: [
                {
                    model: Bootcamp,
                    as: 'bootcamp',
                    attributes: ['title', 'cue', 'description'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (usuariosRes){
            console.log(`Se han encontrado los usuarios ${JSON.stringify(usuariosRes, null, 4)}`);
        }
        return usuariosRes;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const updateUserById = async (user) => {
    try {
        const usuario = await User.findByPk(user.id);
        let nroActualizados = [];
        if (usuario) {
            if ((usuario.firstName !== user.firstName) || (usuario.lastName !== user.lastName) || (usuario.email !== user.email)) {
                nroActualizados = await User.update({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }, {
                    where: { id: user.id }
                });
                console.log(`Actualizados: ${nroActualizados}`);
                console.log(`Se ha actualizado el usuario con id ${user.id}`);
            } else {
                nroActualizados[0] = -1;
            }
        } else {
            nroActualizados[0] = 0;
        }
        return nroActualizados[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteUserById = async (id) => {
    try {
        const nroBorrados = await User.destroy({ 
            where: { id }
        });
        console.log(`Borrados: ${nroBorrados}`);
        return nroBorrados;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    createUser,
    findUserById,
    findAllUser,
    updateUserById,
    deleteUserById
}