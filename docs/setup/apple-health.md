# Apple Health integration path

Task 1 does not implement HealthKit yet.

## Recommended path

1. Keep the Expo managed app during early UI and product work.
2. When step sync becomes an active feature, move to `expo prebuild`.
3. Add a native HealthKit bridge such as `react-native-health`.
4. Configure HealthKit entitlements and validate the iOS permission flow on device.

## Why this is deferred

- HealthKit is iOS-only and needs native capabilities.
- Expo Go is not enough for full HealthKit access.
- The exact permission shape depends on whether we read steps only or also write workout data later.

## What is already ready

- iOS usage descriptions live in `app.json`.
- The service boundary for health sync can live under `src/services/health`.
- The project structure is prepared for a later prebuild without rewriting the UI layer.
