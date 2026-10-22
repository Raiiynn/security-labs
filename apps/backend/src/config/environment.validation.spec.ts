import { validateEnvironment } from './environment.validation.js';

const validEnvironment: Record<string, unknown> = {
  NODE_ENV: 'test',
  PORT: '3000',
  POSTGRES_HOST: '127.0.0.1',
  POSTGRES_PORT: '5432',
  POSTGRES_USER: 'securebank',
  POSTGRES_PASSWORD: 'securepassword',
  POSTGRES_DB: 'securedb_test',
  JWT_ACCESS_SECRET: 'test-jwt-secret-with-at-least-32-characters',
  JWT_ACCESS_TTL_SECONDS: '900',
  JWT_ISSUER: 'securebank-api',
  JWT_AUDIENCE: 'securebank-client',
};

describe('validateEnvironment', () => {
  it('should validate and transform configuration', () => {
    const result = validateEnvironment(validEnvironment);

    expect(result.PORT).toBe(3000);
    expect(result.POSTGRES_PORT).toBe(5432);
    expect(typeof result.PORT).toBe('number');
    expect(typeof result.POSTGRES_PORT).toBe('number');
    expect(result.JWT_ACCESS_TTL_SECONDS).toBe(900);
    expect(typeof result.JWT_ACCESS_TTL_SECONDS).toBe('number');
  });

  it('should reject a nonnumeric application port', () => {
    const config = {
      ...validEnvironment,
      PORT: 'not-a-number',
    };

    expect(() => validateEnvironment(config)).toThrow();
  });

  it('should not expose the database password in validation errors', () => {
    const secret = 'secret-that-must-not-appear';
    const config = {
      ...validEnvironment,
      PORT: 'invalid',
      POSTGRES_PASSWORD: secret,
    };

    try {
      validateEnvironment(config);
      expect.fail('Expected environment validation to fail');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);

      if (error instanceof Error) {
        expect(error.message).not.toContain(secret);
      }
    }
  });

  it('should reject a port below the valid range', () => {
    const config = {
      ...validEnvironment,
      PORT: '0',
    };

    expect(() => validateEnvironment(config)).toThrow();
  });

  it('should reject a port above the valid range', () => {
    const config = {
      ...validEnvironment,
      PORT: '65536',
    };

    expect(() => validateEnvironment(config)).toThrow();
  });

  it('should reject a short JWT secret without exposing it', () => {
    const secret = 'too-short';
    const config = {
      ...validEnvironment,
      JWT_ACCESS_SECRET: secret,
    };

    try {
      validateEnvironment(config);
      expect.fail('Expected environment validation to fail');
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error);

      if (error instanceof Error) {
        expect(error.message).not.toContain(secret);
      }
    }
  });

  it('should reject a nonnumeric JWT access TTL', () => {
    const config = {
      ...validEnvironment,
      JWT_ACCESS_TTL_SECONDS: 'not-a-number',
    };

    expect(() => validateEnvironment(config)).toThrow();
  });

  it('should reject a JWT access TTL below the valid range', () => {
    const config = {
      ...validEnvironment,
      JWT_ACCESS_TTL_SECONDS: '59',
    };

    expect(() => validateEnvironment(config)).toThrow();
  });

  it('should reject a JWT access TTL above the valid range', () => {
    const config = {
      ...validEnvironment,
      JWT_ACCESS_TTL_SECONDS: '3601',
    };

    expect(() => validateEnvironment(config)).toThrow();
  });
});
