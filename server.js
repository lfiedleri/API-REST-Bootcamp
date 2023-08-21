const express = require('express');
const app = express();
require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const PORT = process.env.PORT;

const {
    createUser,
    findUserById,
    findAllUser,
    updateUserById,
    deleteUserById
} = require('./app/controllers/user.controller');

const {
    createBootcamp,
    addUserToBootcamp,
    findById,
    findAllBootcamp
} = require('./app/controllers/bootcamp.controller');

/*******************************USER***************************************/

// http://localhost:3000/user/create/firstname/Matias/lastname/Gonzalez/email/mgonzalez@gmail.com
app.get('/user/create/firstname/:firstname/lastname/:lastname/email/:email', async (req, res) => {
    const firstName = req.params.firstname;
    const lastName = req.params.lastname;
    const email = req.params.email;
    try {
        const usuarioRes = await createUser({
            firstName,
            lastName,
            email
        });
        res.status(StatusCodes.CREATED).json({
            message: `Usuario ${usuarioRes.firstName} ${usuarioRes.lastName} fue creado con éxito`,
            user: usuarioRes
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/findById/1
app.get('/user/findById/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const usuario = await findUserById(id);
        if (usuario) {
            res.status(StatusCodes.OK).json({
                message: `Usuario ${usuario.firstName} ${usuario.lastName} fue encontrado con éxito`,
                user: usuario
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `Usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user
app.get('/user', async (req, res) => {
    try {
        const usuarios = await findAllUser();
        res.status(StatusCodes.OK).json({
            message: `Se encontraron ${usuarios.length} usuarios`,
            users: usuarios
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});


// http://localhost:3000/user/update/id/1/firstname/Matias/lastname/Gonzalez/email/mgonzalez@gmail.com
app.get('/user/update/id/:id/firstname/:firstname/lastname/:lastname/email/:email', async (req, res) => {
    const id = Number(req.params.id);
    const firstName = req.params.firstname;
    const lastName = req.params.lastname;
    const email = req.params.email;

    try {
        const nroActualizados = await updateUserById({
            id,
            firstName,
            lastName,
            email
        });
        if (nroActualizados) {
            if (nroActualizados !== -1) {
                res.status(StatusCodes.CREATED).json({
                    message: `Usuario id ${id} fue actualizado con éxito`
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    message: `Usuario id ${id} no fue actualizado. No había nada que actualizar.`
                });
            }
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `Usuario id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/user/delete/id/1
app.get('/user/delete/id/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const nroBorrados = await deleteUserById(id);
        if (nroBorrados) {
            res.status(StatusCodes.CREATED).json({
                message: `Usuario id ${id} fue borrado con éxito`
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `Usuario id ${id} no fue encontrado`
            });
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

/*******************************BOOTCAMP***************************************/

// http://localhost:3000/bootcamp/create/title/Typescript/cue/10/description/Desarrollo%20con%20Typescript
app.get('/bootcamp/create/title/:title/cue/:cue/description/:description', async (req, res) => {
    const title = req.params.title;
    const cue = req.params.cue;
    const description = req.params.description;
    try {
        const bootcampRes = await createBootcamp({
            title,
            cue,
            description
        });
        res.status(StatusCodes.CREATED).json({
            message: `Bootcamp ${bootcampRes.title} fue creado con éxito`,
            bootcamp: bootcampRes
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/adduser/idBootcamp/1/idUser/1
app.get('/bootcamp/adduser/idBootcamp/:idBootcamp/idUser/:idUser', async (req, res) => {
    const idBootcamp = Number(req.params.idBootcamp);
    const idUser = Number(req.params.idUser);
    try {
        const objRes = await addUserToBootcamp(idBootcamp, idUser); 
        if (objRes.entidad !== "bootcamp" && objRes.entidad !== "usuario") {
            res.status(StatusCodes.CREATED).json({ 
                message: `Se agregó usuario id ${idUser} al bootcamp id ${idBootcamp}`,
                bootcamp: objRes 
            });
        } else{
            res.status(StatusCodes.BAD_REQUEST).json({
                message: `No se encontró ${objRes.entidad} con id ${objRes.id}`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp/findById/1
app.get('/bootcamp/findById/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const bootcampRes = await findById(id);
        if (bootcampRes) {
            res.status(StatusCodes.OK).json({
                message: `Bootcamp ${bootcampRes.title} fue encontrado con éxito`,
                bootcamp: bootcampRes
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                message: `Bootcamp id ${id} no fue encontrado`
            });
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

// http://localhost:3000/bootcamp
app.get('/bootcamp', async (req, res) => {
    try {
        const bootcamps = await findAllBootcamp();
        res.status(StatusCodes.OK).json({ 
            message: `Se encontraron ${bootcamps.length} bootcamps`,
            bootcamps: bootcamps 
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
});

app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));