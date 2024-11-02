# bun-api-base


## Overview

This project uses Bun to manage and run a TypeScript application. Below are the commands to run, watch, and build the application, as well as to build and run the Docker container.

## Commands

### Running the Application

To run the application, use the following command:

```bash
bun index.ts
```

### Watching the Application

To watch the application, use the following command:

```bash
bun watch index.ts
```

### Building the Application

To build the application, use the following command:

```bash
bun build index.ts
```

### Building and Running the Docker Container

To build and run the Docker container, use the following command:

```bash
docker build -t bun-api-server .
```

```bash
docker run -p 8080:8080 bun-api-server
```