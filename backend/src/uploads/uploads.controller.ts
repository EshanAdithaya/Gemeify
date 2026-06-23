import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const UPLOAD_DIR = './uploads';
const ALLOWED = /\.(jpe?g|png|webp|gif)$/i;
const MAX_SIZE = 8 * 1024 * 1024; // 8MB

const storage = diskStorage({
  destination: UPLOAD_DIR,
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
  },
});

function imageFilter(_req: any, file: any, cb: any) {
  if (!ALLOWED.test(file.originalname)) {
    return cb(new BadRequestException('Only image files are allowed'), false);
  }
  cb(null, true);
}

@ApiTags('Uploads')
@Controller('uploads')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadsController {
  @Post('image')
  @ApiOperation({ summary: 'Upload a single image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      fileFilter: imageFilter,
      limits: { fileSize: MAX_SIZE },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    return {
      message: 'Image uploaded successfully',
      data: { url: `/uploads/${file.filename}`, filename: file.filename },
    };
  }

  @Post('images')
  @ApiOperation({ summary: 'Upload up to 10 images' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage,
      fileFilter: imageFilter,
      limits: { fileSize: MAX_SIZE },
    }),
  )
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files?.length) throw new BadRequestException('No files uploaded');
    return {
      message: 'Images uploaded successfully',
      data: files.map((f) => ({ url: `/uploads/${f.filename}`, filename: f.filename })),
    };
  }
}
