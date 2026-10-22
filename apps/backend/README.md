# SecureBank Security Lab

SecureBank Security Lab is a hands-on learning project for building a secure banking REST API. The project starts with a secure baseline and will gradually introduce isolated security exercises in later development phases.

## Learning Goals

The project supports practical learning in three areas:

- **Penetration Testing:** understand how application vulnerabilities are discovered, validated, and reported in an authorized lab environment.
- **Application Security:** practice secure design, threat-aware development, input validation, authentication, authorization, and vulnerability remediation.
- **Security Operations Center:** learn how application logs, security events, monitoring, detection, and incident investigation relate to a running system.

## Technology Stack

- Node.js
- NestJS
- TypeScript
- REST API
- Bun
- Vitest
- Supertest

PostgreSQL, TypeORM, JWT, Argon2id, Docker, and other security controls will be added in later milestones.

## Run the Backend

Use Node.js LTS as the application runtime. From `apps/backend`, install the dependencies with Bun:

```bash
bun install
```

Start the backend in development watch mode:

```bash
bun run start:dev
```

The API is available at `http://localhost:3000` by default.

Useful verification commands:

```bash
bun run build
bun run test
bun run test:e2e
```

## API Status Endpoint

Request:

```http
GET /
```

Successful response (`200 OK`):

```json
{
  "name": "SecureBank API",
  "status": "ok"
}
```

## Development Status

**Version:** v0.1  
**Phase:** Planning and Backend Foundation

The current focus is establishing a secure and testable backend foundation. Architecture and database documentation will be added in later milestones.
