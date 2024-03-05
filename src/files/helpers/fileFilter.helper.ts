export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    //  Cambiar aquí cualquier tipo de archivo que se quiera excluir.

    if (!file) return callback(new Error('El archivo esta vacio.'), false);
    // No aceptar arcihicos otros que no sean de imagen, video, audio y documentos.
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|mp3|mp4|avi|mov|flv|wmv|webm|mkv)$/)) {
        return callback(new Error('Solo se permiten archivos de imagen, video, audio y documentos.'), false);
    }
    callback(null, true);
};