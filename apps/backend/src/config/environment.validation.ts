import { plainToInstance, Transform } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  MinLength,
  validateSync,
} from 'class-validator';

enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(NodeEnvironment)
  NODE_ENV!: NodeEnvironment;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST!: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(65535)
  POSTGRES_PORT!: number;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(32)
  JWT_ACCESS_SECRET!: string;

  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(60)
  @Max(3600)
  JWT_ACCESS_TTL_SECONDS!: number;

  @IsString()
  @IsNotEmpty()
  JWT_ISSUER!: string;

  @IsString()
  @IsNotEmpty()
  JWT_AUDIENCE!: string;
}

export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config);

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    validationError: {
      target: false,
      value: false,
    },
  });

  const messages = errors.flatMap((error) =>
    Object.values(error.constraints || {}),
  );

  if (errors.length > 0) {
    throw new Error(messages.join(', '));
  }

  return validatedConfig;
}
