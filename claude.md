# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Taro-based WeChat mini-program called "吾知全视界" (formerly "大空间玩家"). It's built with React, TypeScript, and MobX for state
management, targeting WeChat mini-program platform primarily.

## Architecture & Structure

- **Framework**: Taro 4.1.1 with React 18
- **State Management**: MobX 4.8.0 with mobx-react 6.1.4
- **Styling**: Less CSS preprocessor
- **UI Library**: taro-ui 3.3.0
- **Build Tool**: Webpack 5 via Taro CLI

### Key Directories

- `src/pages/` - Mini-program pages (index, playerInfo, playerPhotos)
- `src/store/` - MobX stores (user.ts, counter.ts)
- `src/utils/` - Utilities (request.ts for API calls)
- `config/` - Taro build configurations
- `types/` - Global TypeScript definitions

### API Integration

- Base URLs: `https://hub.innomix.cn` (prod), `https://hub-pre.innomix.cn` (dev)
- Authentication: Bearer token via WeChat login
- Key endpoints: login, player info retrieval, user info saving

## Development Commands

### Build Commands

- `npm run dev:weapp` - Start development server for WeChat mini-program
- `npm run build:weapp` - Build for WeChat mini-program
- `npm run build:h5` - Build for web (H5)
- `npm run build:tt` - Build for ByteDance mini-program
- `npm run build:alipay` - Build for Alipay mini-program

### Development Workflow

- No test files present in the project
- ESLint configuration via `eslint-config-taro`
- TypeScript strict mode enabled

### Configuration Files

- `src/app.config.ts` - Mini-program global configuration
- `config/index.ts` - Taro build configuration
- `tsconfig.json` - TypeScript configuration (ES5 target)
- `project.config.json` - WeChat Developer Tools project config

## Key Features

1. **User Authentication**: WeChat login with token management
2. **QR Code Scanning**: Scan player QR codes to view photos
3. **Player Profile Management**: View and edit player information
4. **Photo Gallery**: Display player photos after scanning QR
5. **Responsive Design**: 750rpx design width with device ratio scaling

## Environment Handling

The project automatically switches API endpoints based on WeChat mini-program environment:

- Development/trial: `hub-pre.innomix.cn`
- Production: `hub.innomix.cn`

## Common Development Tasks

- **Add new page**: Create folder in `src/pages/` with `index.tsx`, `index.less`, `index.config.ts`
- **Add API endpoint**: Extend `src/utils/request.ts` with new request functions
- **Update global config**: Modify `src/app.config.ts` for navigation, window settings
- **State management**: Use MobX stores in `src/store/` for global state
