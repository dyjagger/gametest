# Security Guidelines - [PROJECT_NAME]

> **Source**: Adapted from [Project CodeGuard](https://github.com/project-codeguard/rules) - AI model-agnostic security framework

This document defines security practices that AI assistants and developers must follow. These are guidelines, not rigid rules—but deviations should be conscious and documented.

---

## Core Principles

1. **Secure by Default**: Build security in from the start, not as an afterthought
2. **Least Privilege**: Request only the permissions you need
3. **Defense in Depth**: Don't rely on a single security control
4. **Fail Securely**: Errors should not expose sensitive information

---

## Secrets Management

### ❌ Never Do
- Hardcode secrets, API keys, passwords, or tokens in source code
- Commit `.env` files with real credentials
- Log sensitive information
- Include secrets in error messages

### ✅ Always Do
- Use environment variables for secrets
- Add secret files to `.gitignore`
- Use secret management services in production (Vault, AWS Secrets Manager, etc.)
- Rotate secrets regularly

### Example `.gitignore` entries
```gitignore
# Secrets - NEVER commit these
.env
.env.local
.env.*.local
*.pem
*.key
secrets/
credentials.json
```

### Example Environment Variable Pattern
```
# .env.example (commit this - no real values)
DATABASE_URL=postgresql://user:password@localhost/db
API_KEY=your-api-key-here
SECRET_KEY=generate-a-secure-random-key

# .env (do NOT commit - real values)
DATABASE_URL=postgresql://prod_user:real_password@prod-host/prod_db
API_KEY=sk-live-xxxxxxxxxxxxx
SECRET_KEY=a1b2c3d4e5f6...
```

---

## Input Validation

### ❌ Never Do
- Trust user input without validation
- Use string concatenation for SQL queries
- Directly embed user input in shell commands
- Render user input as HTML without escaping

### ✅ Always Do
- Validate input type, length, format, and range
- Use parameterized queries for databases
- Sanitize input before use in commands
- Escape output based on context (HTML, URL, SQL, etc.)

### SQL Injection Prevention
```
# BAD - vulnerable to SQL injection
query = f"SELECT * FROM users WHERE id = {user_id}"

# GOOD - parameterized query
query = "SELECT * FROM users WHERE id = ?"
cursor.execute(query, (user_id,))
```

### Command Injection Prevention
```
# BAD - vulnerable to command injection
os.system(f"process_file {filename}")

# GOOD - use safe APIs
subprocess.run(["process_file", filename], check=True)
```

---

## Authentication & Authorization

### Authentication Guidelines
- [ ] Use established authentication libraries (don't roll your own)
- [ ] Enforce strong password policies
- [ ] Implement account lockout after failed attempts
- [ ] Use secure session management
- [ ] Support MFA where appropriate

### Authorization Guidelines
- [ ] Check permissions on every request
- [ ] Use role-based (RBAC) or attribute-based (ABAC) access control
- [ ] Validate user owns resources they're accessing (prevent IDOR)
- [ ] Log access to sensitive resources

### Session Security
- Use secure, HttpOnly, SameSite cookies
- Generate cryptographically random session IDs
- Invalidate sessions on logout
- Implement session timeout

---

## Cryptography

### ❌ Never Do
- Implement your own cryptographic algorithms
- Use deprecated algorithms (MD5, SHA1 for security, DES, RC4)
- Use ECB mode for encryption
- Hardcode encryption keys

### ✅ Always Do
- Use well-vetted cryptographic libraries
- Use strong algorithms (AES-256, SHA-256+, RSA-2048+)
- Use authenticated encryption (GCM mode)
- Properly manage key lifecycle

### Recommended Algorithms
| Purpose | Recommended | Avoid |
|---------|-------------|-------|
| Hashing (passwords) | bcrypt, Argon2, scrypt | MD5, SHA1, plain SHA256 |
| Hashing (data integrity) | SHA-256, SHA-3 | MD5, SHA1 |
| Symmetric encryption | AES-256-GCM | DES, 3DES, RC4, AES-ECB |
| Asymmetric encryption | RSA-2048+, ECDSA | RSA-1024 |

---

## Data Protection

### Sensitive Data Handling
- Encrypt sensitive data at rest
- Use TLS for data in transit
- Minimize data collection (collect only what's needed)
- Implement data retention policies
- Mask sensitive data in logs and UI

### PII (Personally Identifiable Information)
- [ ] Identify what PII the application handles
- [ ] Document where PII is stored
- [ ] Encrypt PII at rest
- [ ] Implement access controls for PII
- [ ] Support data deletion requests

---

## Dependency Security

### ❌ Never Do
- Use dependencies with known critical vulnerabilities
- Pin to exact versions without security update strategy
- Import dependencies from untrusted sources

### ✅ Always Do
- Regularly audit dependencies for vulnerabilities
- Keep dependencies updated (especially security patches)
- Use lockfiles for reproducible builds
- Verify package integrity (checksums, signatures)

### Recommended Tools
| Ecosystem | Tool |
|-----------|------|
| JavaScript/Node | `npm audit`, Snyk, Dependabot |
| Python | `pip-audit`, Safety, Dependabot |
| Go | `govulncheck`, Dependabot |
| General | OWASP Dependency-Check |

---

## Error Handling & Logging

### Error Messages
- Don't expose stack traces to users in production
- Don't reveal system information in errors
- Log full details internally, show generic messages externally

### Secure Logging
```
# BAD - logs sensitive data
logger.info(f"User login: {username}, password: {password}")

# GOOD - logs safely
logger.info(f"User login attempt: {username}")
```

### What to Log
- [ ] Authentication attempts (success and failure)
- [ ] Authorization failures
- [ ] Input validation failures
- [ ] Application errors
- [ ] Security-relevant events

### What NOT to Log
- Passwords or secrets
- Full credit card numbers
- Personal health information
- Session tokens
- Encryption keys

---

## API Security

### REST API Guidelines
- [ ] Use HTTPS only
- [ ] Implement rate limiting
- [ ] Validate Content-Type headers
- [ ] Return appropriate status codes
- [ ] Don't expose internal IDs if possible (use UUIDs)

### Authentication Options
| Method | Use Case |
|--------|----------|
| API Keys | Server-to-server, simple auth |
| OAuth 2.0 | User authorization, third-party access |
| JWT | Stateless authentication |

### CORS Configuration
- Be specific about allowed origins (not `*` in production)
- Limit allowed methods and headers
- Consider credentials requirements

---

## Security Checklist for New Features

### Before Implementation
- [ ] Identify sensitive data involved
- [ ] Document authentication/authorization requirements
- [ ] Consider attack vectors (STRIDE, OWASP Top 10)

### During Implementation
- [ ] Validate all inputs
- [ ] Use parameterized queries
- [ ] Apply least privilege
- [ ] Handle errors securely

### Before Release
- [ ] Run security-focused code review
- [ ] Scan dependencies for vulnerabilities
- [ ] Test authentication/authorization
- [ ] Verify secrets are not in code

---

## Resources

- **Project CodeGuard**: https://github.com/project-codeguard/rules
- **OWASP Top 10**: https://owasp.org/Top10/
- **OWASP Cheat Sheets**: https://cheatsheetseries.owasp.org/
- **CWE (Common Weakness Enumeration)**: https://cwe.mitre.org/

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | [Date] | Initial security guidelines |
