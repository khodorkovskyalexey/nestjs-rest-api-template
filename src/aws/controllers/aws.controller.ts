import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocaleAuthGuard } from 'src/auth/decorators';
import { IAM } from 'src/common/decorators';
import { User } from 'src/users/enitities';
import { GetSignedUrlDto, S3Service } from '../s3';

@ApiTags('Aws')
@ApiBearerAuth()
@LocaleAuthGuard()
@Controller('aws')
export class AwsController {
  constructor(private readonly s3Service: S3Service) {}

  @Get('signed-url')
  @ApiOperation({
    summary: 'Get signed url for aws-s3',
  })
  @ApiOkResponse({
    type: String,
  })
  public async getSignedUrl(@Query() getSignedUrlDto: GetSignedUrlDto, @IAM() user: User): Promise<string> {
    return this.s3Service.getSignedUrl(user.id, getSignedUrlDto);
  }
}
