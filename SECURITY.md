# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security vulnerability within this project, please send an e-mail to sakulbudhathoki977@gmail.com. All security vulnerabilities will be promptly addressed.

Please include the following information in your report:

-   Description of the vulnerability
-   Steps to reproduce the issue
-   Potential impact
-   Suggested fix (if you have one)

We will acknowledge your email within 48 hours and provide a detailed response within 72 hours indicating the next steps in handling your report.

## Security Measures

This project implements the following security measures:

1. **Input Validation**: All user inputs are validated to prevent injection attacks
2. **Dependency Management**: Dependencies are regularly updated to patch security vulnerabilities
3. **Error Handling**: Proper error handling to prevent information leakage
4. **Type Safety**: TypeScript is used throughout the project for better type safety

## Best Practices

When using this library:

1. Always validate user inputs before passing them to the library
2. Keep the library updated to the latest version
3. Use the provided TypeScript types for better type safety
4. Sanitize any user-provided URLs or text before generating QR codes
