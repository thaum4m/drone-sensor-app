# drone-sensor-app

Drone sensor React app for displaying sensor information via a backend sensor API.
\
For design considerations see __Considerations__ below.

## Compile and run the project

```bash
npm i
npm start
```
If start fails, ensure Docker is installed and an alias exists for docker-compose if needed.

## Run the application without Docker

The following is not recommended unless you know what you are doing:

1. Run the drone-sensor-api server (refer to that API for details).
2. Configure `.env` based on `.env-sample`.
3. Run the application:
```bash
npm run dev
```

## Considerations
- Sensor API __should be separated into a dedicated repository__ for use as a service along with its own Docker file.
- __Docker files are only setup for development__ and are not production ready.
- __Connection to actual senses is required for production__.
- Uses `MockSensorEventService` as no service has been implemented to connect to Drone sensors for status updates.\
__Sensor statuses are toggled consecutively__ (each after about 10secs). 
- __Authentication is not yet implemented__ for the consumer/clients.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
