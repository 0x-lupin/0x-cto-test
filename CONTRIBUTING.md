# Contributing to Enterprise Hub

Thank you for considering contributing to Enterprise Hub! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- System information (OS, browser, versions)

### Suggesting Features

Feature requests are welcome! Please include:
- Clear description of the feature
- Use cases and benefits
- Mockups or examples if applicable

### Code Contributions

1. **Fork the Repository**
   ```bash
   git clone https://github.com/your-username/enterprise-hub.git
   cd enterprise-hub
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Write clear, commented code
   - Add tests if applicable
   - Update documentation

4. **Test Your Changes**
   ```bash
   # Backend
   cd backend
   npm run build
   
   # Frontend
   cd frontend
   npm run build
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   **Commit Message Format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Test additions or changes
   - `chore:` Build process or auxiliary tool changes

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes
   - Link related issues

## Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript strict mode
- Prefer `const` over `let`
- Use meaningful variable names
- Add type annotations
- Avoid `any` type
- Use async/await over promises

### React
- Use functional components
- Use hooks for state management
- Keep components small and focused
- Extract reusable logic to custom hooks
- Use proper prop types

### Naming Conventions
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `kebab-case.tsx` or `PascalCase.tsx` for components

### Code Organization
- One component per file
- Group related files in directories
- Keep files under 300 lines
- Extract complex logic to separate functions

## Testing

- Write unit tests for new features
- Ensure existing tests pass
- Aim for good test coverage
- Test edge cases

## Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update API documentation
- Add examples for new features

## Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Address feedback
4. Approval and merge

## Development Setup

See [QUICKSTART.md](QUICKSTART.md) for setup instructions.

## Questions?

- Create an issue for questions
- Join community discussions
- Read existing documentation

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
