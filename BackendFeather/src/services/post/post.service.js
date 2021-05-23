// Initializes the `post` service on path `/post`
const path = require('path');
const fs = require('fs');
const { Post } = require('./post.class');
// const { obtenerImagenPost } = require('../../controllers/post.controller');
const createModel = require('../../models/post.model');
const hooks = require('./post.hooks');


module.exports = function(app) {
    const options = {
        Model: createModel(app),
        // paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/post', new Post(options, app));

    // Imprimir imagenes

    // app.use('/img/:num/:id', app.service('post'));   
    app.get('/img/:num/:id', async (req, res) => {

        const { num, id } = req.params;       
    
        let image = [];
    
        const postService = app.service('post');
        const post = await postService.find({query: { id: id }});

        if (!post[0]) {
            return res.status(400).json({
                error: `No existe un post con el id ${ id }`
            });
        }
    
        image = post[0].image.split(',');

        console.log(image[num])
    
        if (image[num]) {
    
            const pathImagen = path.join(__dirname, '../../../uploads', image[num]);
            if (fs.existsSync(pathImagen)) {
               return res.sendFile(pathImagen)
            }
        }
        
        const pathImagen = path.join(__dirname, '../../../public/assets/no-image.jpg');
        res.sendFile(pathImagen);

    });

    // Get our initialized service so that we can register hooks
    const service = app.service('post');

    service.hooks(hooks);
};

