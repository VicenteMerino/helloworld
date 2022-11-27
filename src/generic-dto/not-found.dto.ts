import { ApiProperty } from '@nestjs/swagger';

export class NotFoundDto {
  @ApiProperty({ example: 'Not found' })
  message: string;
}
