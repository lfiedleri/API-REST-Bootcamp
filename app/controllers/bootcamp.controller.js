const { User, Bootcamp } = require('../models');

const createBootcamp = async (bootcampObj) => {
    try {
        const bootcamp = await Bootcamp.create({
            title: bootcampObj.title,
            cue: bootcampObj.cue,
            description: bootcampObj.description
        });
        console.log(`Se ha creado el bootcamp ${JSON.stringify(bootcamp, null, 4)}`);
        return bootcamp;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const addUserToBootcamp = async (bootcampId, userId) => {
    try {
        const bootcamp = await Bootcamp.findByPk(bootcampId);
        if (!bootcamp) {
            console.log(`No se encontró bootcamp con id ${bootcampId}`);
            return {
                entidad: "bootcamp", 
                id: bootcampId
            };
        }
        const usuario = await User.findByPk(userId);
        if (!usuario) {
            console.log(`No se encontró usuario con id ${userId}`);
            return {
                entidad: "usuario", 
                id: userId
            };
        }
        await bootcamp.addUser(usuario);
        console.log(`Agregado el usuario id ${usuario.id} al bootcamp con id ${bootcamp.id}`);
        return bootcamp;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findById = async (id) => {
    try {
        const bootcampRes = await Bootcamp.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName' , 'lastName' , 'email'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (bootcampRes){
            console.log(`Se ha encontrado el bootcamp ${JSON.stringify(bootcampRes, null, 4)}`);
        }
        return bootcampRes;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const findAllBootcamp = async () => {
    try {
        const bootcamps = await Bootcamp.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'firstName' , 'lastName' , 'email'],
                    through: {
                        attributes: []
                    }
                }
            ]
        });
        if (bootcamps){
            console.log(`Se han encontrado los proyectos ${JSON.stringify(bootcamps, null, 4)}`);
        }
        return bootcamps;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createBootcamp,
    addUserToBootcamp,
    findById,
    findAllBootcamp
}