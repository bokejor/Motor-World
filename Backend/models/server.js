const express = require('express');
const fileUpload = require('express-fileupload');
const bearerToken = require('express-bearer-token');
const cors = require('cors');

const { dbConnection } = require('../modules/database');
const firebase = require('firebase');
const config = require('../modules/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8083;

        this.paths = {
            routeAuth: '/auth',
            routeUsers: '/users',
            routePost: '/post',
            routeMotos: '/motos',
            routeBrand: '/brand',
            routeAnounces: '/publish',
            routeFavorites: '/favorites',
            routeConfig: '/config',

        }

        // Inicializar firebase
        this.firebaseInicialize();

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    firebaseInicialize() {
        firebase.initializeApp(config.firebaseConfig);
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // Bearer Token
        this.app.use(bearerToken())

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {

        this.app.use(this.paths.routeAuth, require('../routes/auth'));
        this.app.use(this.paths.routeUsers, require('../routes/users'));
        this.app.use(this.paths.routePost, require('../routes/post'));
        this.app.use(this.paths.routeMotos, require('../routes/motos'));
        this.app.use(this.paths.routeBrand, require('../routes/brand'));
        this.app.use(this.paths.routeAnounces, require('../routes/anounces'));
        this.app.use(this.paths.routeFavorites, require('../routes/favorites'));
        this.app.use(this.paths.routeConfig, require('../routes/configuration'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;