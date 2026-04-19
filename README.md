# Pace Rivals

Expo React Native foundation for a premium, iOS-first running challenge app.

## Stack

- Expo SDK 54
- React Native 0.81
- TypeScript in strict mode
- NativeWind for styling
- Firebase service shell with environment-based config

## Project structure

```
assets/
docs/
src/
  core/
  components/ui/
  features/
  lib/
  services/
  theme/
```

## Local setup

1. Copy `.env.example` to `.env`.
2. Fill in the Firebase values when a project exists.
3. Install dependencies.
4. Run the app.

```bash
npm install
npm run start
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run format
```

## Apple Health note

HealthKit is intentionally not implemented in Task 1. See `docs/setup/apple-health.md` for the integration path and why Expo prebuild is likely required later.

## Notes

- The current Node version in this environment is slightly below the React Native engine recommendation. The project installs and configures successfully, but local development should use Node `>= 20.19.4` to avoid engine warnings.
- Keep files short and reuse existing UI, service, and theme modules before adding new ones.
