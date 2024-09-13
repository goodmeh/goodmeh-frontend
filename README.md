# GoodMeh?

This project is written in React + TypeScript + Vite. The architecture of the project is based on [Bulletproof React](https://github.com/alan2207/bulletproof-react/).

## Recommended IDE setup

- [VSCode](https://code.visualstudio.com) as our IDE.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VSCode.

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension for VSCode. Remember to enable the `Format on Save` option and set the default formatter to `Prettier`.

## Code Conventions

Naming Conventions:
- Use `camelCase` for variable names.
- Use `PascalCase` for component (and component file) names.
- Use `camelCase` for file names.
- Use `SCREAMING_SNAKE_CASE` for constants.
- Use `PascalCase` for type names.
- Use `PascalCase` for class names.
- Boolean values should typically be named `isX` or `hasX` unless following props defined by library components (e.g. `disabled` for buttons or `opened` for modals).

Styling Conventions:
- Use [Mantine](https://mantine.dev) for UI components.
- Use scoped [CSS Modules](https://vitejs.dev/guide/features.html#css-modules) for styling.
  - We follow an adaptation of [Block Element Modifier (BEM)](https://getbem.com/naming/) convention for class names: `Block__Element--modifier`.
  - Usually, the block is the component name, and the element is the part of the component that is inside the component. These are in PascalCase.
  - Modifiers are usually state-based, and are in kebab-case.
  - Example: `Button--variant-primary`, `Button--disabled`, `TextField__Label`.
- Use [clsx](https://github.com/lukeed/clsx) for conditional className.

## Getting Started
To get started with this project, follow the steps below:

1. Clone the repository:
  ```
  git clone https://github.com/cs3203-team1/goodmeh-frontend.git
  ```

2. Install dependencies:
  ```
  cd goodmeh-frontend
  yarn
  ```

3. Start the development server:
  ```
  yarn dev
  ```

4. Open your browser and navigate to `http://localhost:3203` to see the application.

5. Happy coding!
