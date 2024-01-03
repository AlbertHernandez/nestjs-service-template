<h1 align="center">Express Typescript Service Skeleton</h1>

<p align="center">
  Skeleton for new typescript services based on express
</p>

<p align="center">
    <a href="https://github.com/AlbertHernandez/express-typescript-service-skeleton/actions/workflows/nodejs.yml?branch=main"><img src="https://github.com/AlbertHernandez/express-typescript-service-skeleton/actions/workflows/nodejs.yml/badge.svg?branch=main" alt="nodejs"/></a>
</p>

## Table of Contents

- [Developing](#developing)
- [Building](#building)
- [Testing](#testing)
- [Linting](#linting)

## Developing

The project is fully dockerized, if we want to start the app in development mode, we just need to run:

```bash
make start-dev
```

Now, you should be able to start debugging configuring using your IDE. For example, if you are using vscode, you can create a `.vscode/launch.json` file with the following config:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Attach to docker",
      "restart": true,
      "port": 9229,
      "remoteRoot": "/project"
    }
  ]
}
```

If you want to stop developing, you can stop the service running:

```bash
make stop
```

## Building

```bash
make build
```

## Testing

### Jest with Testing Library

```bash
make test
```

## Linting

Run the linter

```bash
make lint
```

Fix lint issues automatically

```bash
make lint-fix
```
