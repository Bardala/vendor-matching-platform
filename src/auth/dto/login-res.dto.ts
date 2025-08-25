import { ApiProperty } from '@nestjs/swagger';
import { User, UserRole } from 'src/users/entities/user.entity';

// ?unused
export class LoginResDTO {
  constructor(id: number, email: string, role: UserRole, createdAt: Date) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt: Date;

  accessToken: string;

  public static fromEntity(user: User): LoginResDTO {
    return new LoginResDTO(user.id, user.email, user.role, user.createdAt);
  }
}
