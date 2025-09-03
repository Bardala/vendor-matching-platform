import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class UploadResearchDto {
  @ApiProperty({ example: 101, description: 'ID of the associated project' })
  @IsInt()
  projectId: number;

  @ApiProperty({
    example: 'AI in Healthcare',
    description: 'Title of the research entry',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Exploring the impact of AI...',
    description: 'Main content of the research',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: ['AI', 'Healthcare'],
    description: 'Tags for categorization',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
