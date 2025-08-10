# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## 说明

阅读《[Nuxt 3.0 全栈开发](https://juejin.cn/video/7202149403342143520)》小册所写代码，不完全按照教程编写，融入了自己的想法

技术栈：Nuxt3 + Naive UI + UnoCSS + Prisma + MySQL + Docker

代码规范：@antfu/eslint-config + husky + lint-staged + commitlint

开发环境和生产环境都可以使用docker来启动和打包，不需要本地安装MySQL，比较方便。

开发环境容器启动后，如果本地代码无类型提示，需要先安装node_modules依赖。

### 开发环境
```bash
docker compose -f compose.yaml -f compose.dev.yaml watch
```

### 生产环境
```bash
docker compose -f compose.yaml -f compose.prod.yaml up -d
```

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
