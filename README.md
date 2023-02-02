# Nuxt 3 Library Consumption Test

Following with [@dcrall's repository](https://github.com/dcrall/nuxt-lib-consumption) [and discussion](https://github.com/nuxt/nuxt/discussions/16392), I need a clean repository to consume a Vue 2.7 Vite library in Nuxt 3. 

I'm using [Vite's library mode](https://vitejs.dev/guide/build.html#library-mode). 

This repo demonstrates this problem. It contains:

- **vite-test-lib** - A minimal Vite library. It is published at: https://www.npmjs.com/package/@dprp-astara/vite-test-lib. It exports a single component, `<MyButton>` that contains a simple button. It works when imported on Nuxt 2 and a simple Vite project.
- **nuxt3-lib-consumer** - A minimal Nuxt 3 application. Imports the library. Run `yarn install && yarn dev` or `npm install && npm dev`.

## Error


```bash

```