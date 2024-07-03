# Tic Tac Toe Game

This is a simple Tic Tac Toe game built with Next.js, TypeScript, and TailwindCSS. It includes basic functionalities like marking cells, detecting win and draw conditions, and resetting the game. Animations are added to enhance the user experience using `framer-motion`.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Approach and Design Decisions](#approach-and-design-decisions)

## Installation

To get started with this project, you need to have Node.js and npm installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/EricP91/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Application

To run the application locally, use the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

To run the unit test, use the following command:

```bash
npm run test
```

This will run all the tests defined in the `__tests__` directory using Jest and React Testing Library.

## Approach and design decisions

### Components & Styled components

- **Board**: Manages the game logic and renders the grid.
- **Cell**: Represents each cell in the grid. Styled using styled-components and animated using framer-motion.
- **ResetButton**: A button to reset the game state. Styled using styled-components and animated using framer-motion.

### Game Logic

The game logic is separated into a utility function `isGameEnded` which checks for win and draw conditions.

### Styling

Styling is done using TailwindCSS for rapid and responsive design, combined with styled-components for component-specific styles and animations.

### Animations

Animations are implemented using `framer-motion` for smooth and interactive UI transitions. For example, cells scale on hover and tap for a better user experience.

### Testing

Unit tests are written using Jest and React Testing Library to ensure all functionalities work correctly:

- Rendering of the Tic Tac Toe grid
- Marking cells with "X" and "O"
- Detecting win conditions (rows, columns, and diagonals)
- Detecting draw conditions
- Reset button functionality
