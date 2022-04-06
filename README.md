# Nuxt 3 Library Consumption Test

We are building a Vue 3 component library using [Vite's library mode](https://vitejs.dev/guide/build.html#library-mode). The library primarily exposes Vue components. These components are authored as SFCs, and they import shared utility JavaScript files. We build both an ESM and UMD version of the library. We expect to import the ESM version into our Nuxt apps. 

Our plan is to consume this library from multiple Nuxt 3 applications. We have been successfully consuming our library when running Nuxt in dev mode. However, we discovered when we build for production (`yarn build && yarn start`) the application is throwing errors.

This repo demonstrates this problem. It contains:

- **vite-test-lib** - A minimal Vite library. It is published at: https://www.npmjs.com/package/@dcrall/vite-test-lib. It exports a single component, `<LibraryComponent>` that contains a default slot.
- **nuxt3-lib-consumer** - A minimal Nuxt 3 application. The library is set as a dependency and `<LibraryComponent>` is imported in `app.vue`. If you run it in dev, it renders correctly. If you build and start the application, you get the `isCE` error below. We tweaked the library a bit to deal with [ESM issues](https://v3.nuxtjs.org/guide/going-further/esm#library-author-guide.). This is potentially still part of the issue.
- **vite-lib-consumer** - A minimal Vite app that consumes the library. Very similar configuration to the Nuxt app. This works correctly in dev & prod.

## isCE Error

Google indicates that it is caused by multiple copies of Vue being in play. Our library sets vue as an external dependency as recommended. Here is one [example Vue issue](https://github.com/vuejs/core/issues/4344).

```bash
➜  nuxt3-lib-consumer yarn start
yarn run v1.22.18
$ node .output/server/index.mjs
Listening on http://localhost:3000/
[meta] useMeta has been renamed to useHead.
TypeError: Cannot read properties of null (reading 'isCE')
    at renderSlot (/Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:6489:34)
    at Proxy._sfc_render (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/node_modules/@dcrall/vite-test-lib/dist/vite-test-lib.mjs:14:5)
    at renderComponentRoot (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/index.mjs:2378:44)
    at renderComponentSubTree (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/index.mjs:9930:51)
    at renderComponentVNode (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/index.mjs:9869:16)
    at Object.ssrRenderComponent (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/index.mjs:10284:12)
    at file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/app/server.mjs:3811:36
    at renderComponentSubTree (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/index.mjs:9924:13)
    at renderComponentVNode (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/index.mjs:9869:16)
    at Object.ssrRenderComponent (file:///Users/dcrall/Projects/nuxt3-lib-consumer/.output/server/chunks/index.mjs:10284:12)
Cannot read properties of null (reading 'isCE')
  at renderSlot (./.output/server/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:6489:34)
  at Proxy._sfc_render (file://./.output/server/node_modules/@dcrall/vite-test-lib/dist/vite-test-lib.mjs:14:5)
  at renderComponentRoot (file://./.output/server/chunks/index.mjs:2378:44)
  at renderComponentSubTree (file://./.output/server/chunks/index.mjs:9930:51)
  at renderComponentVNode (file://./.output/server/chunks/index.mjs:9869:16)
  at Object.ssrRenderComponent (file://./.output/server/chunks/index.mjs:10284:12)
  at file://./.output/server/chunks/app/server.mjs:3811:36
  at renderComponentSubTree (file://./.output/server/chunks/index.mjs:9924:13)
  at renderComponentVNode (file://./.output/server/chunks/index.mjs:9869:16)
  at Object.ssrRenderComponent (file://./.output/server/chunks/index.mjs:10284:12)
```

## Components - Library Authors Guidance

I noted the following guidance in Nuxt 3's documentation:

- https://v3.nuxtjs.org/guide/directory-structure/components#library-authors

If I understand this correctly, this method essentially pulls the raw SFC files into the Nuxt build. I question how this would impact the `import` statements in our components that use aliases configured in the library project. Does this technique depend on all library imports being relative?

## Questions
1. Is this bug? 
2. Am I misunderstanding something? 
3. Is there any reason why this shouldn't work?
