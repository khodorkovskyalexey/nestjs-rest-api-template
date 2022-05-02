import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileActions, S3FileCategory } from '../s3.enums';

export class GetSignedUrlDto {
  @ApiProperty({ example: 'file1', description: 'Filename', type: String })
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty({ description: 'File category', enum: S3FileCategory, default: S3FileCategory.FILE })
  @IsNotEmpty()
  @IsEnum(S3FileCategory)
  fileCategory: S3FileCategory;

  @ApiProperty({ description: 'Action type', enum: FileActions, default: FileActions.putObject })
  @IsNotEmpty()
  @IsEnum(FileActions)
  action: FileActions;

  @ApiProperty({ description: 'ContentType', type: String, nullable: true, required: false })
  @IsOptional()
  @IsString()
  contentType?: string;
}
