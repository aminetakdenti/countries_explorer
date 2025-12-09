# Countries Explorer

## Install & Run

- Prerequisites: Node `20.x` LTS, npm `>=9`, optional Xcode/Android Studio for simulators
- Install dependencies:

  ```bash
  yarn
  ```

- Start development server and choose a platform:

  ```bash
  yarn start
  ```

- Direct platform commands:
  
  ```bash
  yarn android   # build/run on Android (device/emulator)
  yarn ios       # build/run on iOS (simulator)
  yarn web       # run in the browser
  ```

## Versions for Reproducibility

- Node: `20.x` LTS (recommended)
- Expo SDK: `54` (`expo` `~54.0.26`)
- React Native: `0.81.5`
- React: `19.1.0`

## Technical Decisions

- `expo-router` for file-based routing to simplify navigation and deep linking
- `@tanstack/react-query` for data fetching, caching, and retry logic
- `axios` for HTTP client ergonomics and interceptors
- `i18next`/`react-i18next` for localization and runtime language switching
- Expo modules (`expo-image`, `expo-haptics`, etc.) for performant cross-platform primitives
- `@react-native-async-storage/async-storage` for lightweight persistence and caching

## Tests

- Test runner: `jest` with `jest-expo` preset
- UI tests: `@testing-library/react-native`
- Run tests:

  ```bash
  yarn test
  ```

- Notes: The test script runs in watch-all mode; on CI use a non-watch invocation (e.g. `jest`) if needed.
