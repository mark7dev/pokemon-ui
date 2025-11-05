# Pokemon Frontend UI

A modern, responsive Pokemon application built with Next.js, React, and Material-UI. This application provides a comprehensive interface for browsing, searching, and viewing Pokemon details with advanced filtering and sorting capabilities.

## 🚀 Features

- **Pokemon Browsing**: Browse through a complete collection of Pokemon with pagination
- **Advanced Search**: Search Pokemon by name with real-time filtering
- **Type Filtering**: Filter Pokemon by type with multi-select support
- **Sorting**: Sort Pokemon alphabetically (A-Z or Z-A)
- **Detailed Views**: View comprehensive Pokemon details including:
  - Stats visualization with color-coded charts
  - Abilities and types
  - Multiple images
  - Base experience, height, and weight
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Fully responsive design optimized for mobile, tablet, and desktop
- **High Test Coverage**: Comprehensive test suite with 96%+ code coverage

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query)
- **Styling**: Tailwind CSS + MUI Theme
- **Language**: TypeScript
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint with Next.js config

## 📋 Prerequisites

- Node.js 20.x or higher
- npm or yarn

## 🏃 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-pokemon-ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (if needed):
```bash
# Create .env.local file
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run test` - Run all tests
- `npm run test:coverage` - Run tests with coverage report

## 🧪 Testing

This project has comprehensive test coverage with **96%+ line coverage**. The test suite includes:

- Component tests for all UI components
- Hook tests for custom React hooks
- API route tests
- Integration tests
- Coverage tests for edge cases

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage
```

For detailed testing documentation, see [TESTING.md](./TESTING.md).

### Test Coverage

Current coverage metrics:
- **Statements**: 93%+
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 96%+

## 🔍 Code Quality

### Linting

The project uses ESLint with Next.js configuration for code quality:

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

ESLint rules are configured to:
- Follow Next.js best practices
- Enforce TypeScript best practices
- Allow flexible rules for test files
- Support React patterns (hooks, display names, etc.)

## 🏗️ Project Structure

```
frontend-pokemon-ui/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (proxies)
│   ├── pokemon/           # Pokemon detail pages
│   └── __tests__/         # Page tests
├── components/            # React components
│   ├── common/            # Reusable components
│   ├── layout/            # Layout components
│   ├── pokemon/           # Pokemon-specific components
│   └── __tests__/         # Component tests
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── services/              # API service layer
├── utils/                 # Utility functions
├── types/                 # TypeScript type definitions
├── constants/             # Application constants
├── config/                # Configuration files
└── public/                # Static assets
```

## 🔄 CI/CD

The project includes GitHub Actions workflow for automated testing and linting:

- **Automated Testing**: Runs on every push and pull request
- **Linting Checks**: Ensures code quality before merging
- **Coverage Reports**: Generates and uploads coverage artifacts
- **Multiple Node Versions**: Tested on Node.js 20.x

The workflow runs:
1. Code checkout
2. Dependency installation
3. ESLint validation
4. Test execution
5. Coverage report generation
6. Artifact upload

## 🎨 Theming

The application supports both light and dark themes:
- Toggle theme using the theme switcher in the header
- Theme preference is persisted across sessions
- Smooth transitions between themes
- Material-UI components adapt to theme

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: Optimized layout for small screens
- **Tablet**: Adaptive layout for medium screens
- **Desktop**: Full-featured layout for large screens

## 🔌 API Integration

The application connects to a backend API for Pokemon data:
- API routes in `app/api/` act as proxies
- Axios configured in `config/axios.ts`
- React Query for data fetching and caching
- Error handling with user-friendly messages

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy!

### Environment Variables

Required environment variables:
- `NEXT_PUBLIC_BACKEND_URL` - Backend API URL

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [React Testing Library](https://testing-library.com/react)

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

Built with ❤️ using Next.js and Material-UI
