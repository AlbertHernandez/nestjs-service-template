export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    //  Implementar aquí la logica para renommbrar archivos antes de subirlos a la nube.
    // Despues en cada servicio de subida de archivos a la nube, se especifica la

    if (!file) return callback(new Error('El archivo esta vacio.'), false);

    const fileExtension = file.mimetype.split('/')[1];

    callback(null, true);
};