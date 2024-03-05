import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    // Importar aqui la logica para renombrar archivos antes de subirlos a la nube. 'fileNamer'.
  }))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {

    if (!file) new BadRequestException('El archivo esta vacio.');

    // Aquí necesitamos agregar un servicio como Cloudinary para subir archivos a la nube.
    return {
      filename: file.originalname,
    };
  }
}
