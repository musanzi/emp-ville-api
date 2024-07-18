import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  name: string;

  @IsNotEmpty({ message: 'La description est obligatoire' })
  description: string;
}
