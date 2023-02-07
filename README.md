# Nuxt 3 Library Consumption Test

EDIT: Nuxt 3 is not compatible with Vue 2: https://github.com/nuxt/nuxt/issues/18705

Following with [@dcrall's repository](https://github.com/dcrall/nuxt-lib-consumption) [and discussion](https://github.com/nuxt/nuxt/discussions/16392), I need a clean repository to consume a Vue 2.7 Vite library in Nuxt 3. 

I'm using [Vite's library mode](https://vitejs.dev/guide/build.html#library-mode). 

This repo demonstrates this problem. It contains:

- **vite-test-lib** - A minimal Vite library. It is published at: https://www.npmjs.com/package/@dprp-astara/vite-test-lib. It exports two components. It works when imported on Nuxt 2.
- **nuxt3-lib-consumer** - A minimal Nuxt 3 application. Imports the library. Run `yarn install && yarn dev` or `npm install && npm dev`.

## Error

After running `yarn install && yarn dev` in the **nuxt3-lib-consumer** project.

### Using modules

nuxt.config.ts
```typescript
export default defineNuxtConfig({¡
    module: ['@prp-astara/vite-test-lib']
})
```

```bash
 ERROR  Cannot start nuxt:  Cannot convert object to primitive value                                                                                                                                                                                                   13:26:46

  at normalizeModule (node_modules/@nuxt/kit/dist/index.mjs:458:62)
  at async installModule (node_modules/@nuxt/kit/dist/index.mjs:434:41)
  at async initNuxt (node_modules/nuxt/dist/index.mjs:2044:7)
  at async load (node_modules/nuxi/dist/chunks/dev.mjs:6797:9)
  at async Object.invoke (node_modules/nuxi/dist/chunks/dev.mjs:6858:5)
  at async _main (node_modules/nuxi/dist/cli.mjs:51:20)
```

### Using transpile

nuxt.config.ts
```typescript
export default defineNuxtConfig({
    build: {
        transpile: ['@prp-astara/vite-test-lib'],
    },
})
```

```bash
[Vue warn]: Property "_self" was accessed during render but is not defined on instance.                                                                                                                                                                                13:18:50
[Vue warn]: Unhandled error during execution of render function                                                                                                                                                                                                        13:18:50
  at <Anonymous>
[nitro] [dev] [unhandledRejection] TypeError: Cannot read properties of undefined (reading '_c')                                                                                                                                                                       13:18:50
    at Proxy.$ (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@prp-astara/vite-test-lib/dist/vite-test-lib.umd.js:1:1163)
    at renderComponentRoot (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@vue/runtime-core/dist/runtime-core.cjs.js:906:44)                                                                                                       13:18:41
    at renderComponentSubTree (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@vue/server-renderer/dist/server-renderer.cjs.js:719:51)
    at renderComponentVNode (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@vue/server-renderer/dist/server-renderer.cjs.js:644:16)
    at Module.ssrRenderComponent (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@vue/server-renderer/dist/server-renderer.cjs.js:94:12)
    at _sfc_ssrRender (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/app.vue:23:31)
    at renderComponentSubTree (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@vue/server-renderer/dist/server-renderer.cjs.js:710:17)
    at renderComponentVNode (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@vue/server-renderer/dist/server-renderer.cjs.js:644:16)
    at Module.ssrRenderComponent (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/@vue/server-renderer/dist/server-renderer.cjs.js:94:12)
    at default (/nuxt3-vue2-lib-consumption/nuxt3-lib-consumer/node_modules/nuxt/dist/app/components/nuxt-root.vue:63:37)
```
