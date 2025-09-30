# AWS Hackathon 2025 - AI 語音電商銷售系統

> 一個整合 AI 語音合成、即時通訊和智能對話的電商銷售系統

## 專案簡介

本專案是為 AWS Hackathon 2025 開發的智能語音銷售系統，透過 AI 技術模擬真實的電話銷售場景，提供自然流暢的對話體驗。系統整合了語音識別、自然語言處理和語音合成技術，打造完整的 AI 銷售助理解決方案。

## 專案結構

### 📁 核心模組

#### `app/` - 主應用服務
- **技術棧**: Node.js + Express + Socket.io + Prisma
- **功能**:
  - WebSocket 即時通訊
  - AWS Transcribe Streaming 語音轉文字
  - 對話控制與路由管理
  - 繁簡中文轉換
- **端口**: 3000

#### `app-server/` - 後端 API 服務
- **技術棧**: TypeScript + Express + Prisma
- **特點**:
  - OpenAPI/Swagger 文檔
  - 完整 TypeScript 類型系統
  - Zod schema 驗證
  - Jest 測試框架
- **開發工具**: Biome (代碼規範)

#### `app-client/` - 前端應用
- **技術棧**: Next.js 15 + React 19 + TypeScript
- **UI**: Tailwind CSS 4 + Radix UI
- **圖標**: Lucide React
- **端口**: 3000 (dev)

#### `gpt-sovit/` - 語音合成服務
- **技術**: GPT-SoVITS AI 模型
- **功能**: 高品質中文語音合成 (TTS)
- **API 端口**: 9880
- **支援**: GPU/CPU 推理

#### `llm-prompt/` - AI 對話設計
- **核心檔案**: `conversationprompt.md`
- **內容**:
  - AI 銷售專員角色定義
  - 對話策略與技巧
  - 產品資料庫
  - 對話範例腳本


## 核心功能

### 🎯 AI 對話系統
- 自然語言理解與生成
- 情境感知的對話管理
- 產品推薦與介紹
- 客戶關係建立

### 🎤 語音處理
- AWS Transcribe 即時語音識別
- GPT-SoVITS 高品質語音合成
- 繁簡中文轉換
- 低延遲音訊串流

### 💼 電商整合
- 產品資料庫管理
- 客戶資訊記錄
- 對話歷史追蹤
- 銷售數據分析

### 🔄 即時通訊
- WebSocket 雙向通訊
- 即時狀態同步
- 多客戶端支援

## 技術亮點

- **全棧 TypeScript**: 類型安全的開發體驗
- **微服務架構**: 模組化、可擴展的系統設計
- **AI 驅動**: 結合 LLM 與語音技術
- **現代前端**: Next.js 15 + React 19 最新特性
- **完整文檔**: OpenAPI/Swagger 自動生成
- **容器化部署**: Docker Compose 一鍵部署

## 快速開始

### 前置需求

- Node.js >= 18
- Docker & Docker Compose
- Yarn 或 npm
- (可選) NVIDIA GPU + CUDA (用於 GPT-SoVITS GPU 推理)

### 安裝步驟

1. **Clone 專案**
```bash
git clone <repository-url>
cd aws-hackathon-2025
```

2. **啟動資料庫服務**
```bash
docker-compose up -d mysql phpmyadmin
```

3. **設定主應用服務**
```bash
cd app
cp .env.example .env
yarn install
yarn db:deploy
yarn db:genrate
```

4. **設定後端服務**
```bash
cd ../app-server
yarn install
yarn db:generate
```

5. **設定前端服務**
```bash
cd ../app-client
yarn install
```

### 開發模式

在不同的終端視窗中啟動各服務：

```bash
# 終端 1 - 主應用服務
cd app
yarn dev

# 終端 2 - 後端 API 服務
cd app-server
yarn dev

# 終端 3 - 前端應用
cd app-client
yarn dev

# 終端 4 - GPT-SoVITS 語音合成 (可選)
cd gpt-sovit
docker-compose up
```

### 訪問服務

- **前端應用**: http://localhost:3000
- **主應用 API**: http://localhost:3000
- **後端 API 文檔**: http://localhost:<port>/api-docs (查看 app-server 配置)
- **phpMyAdmin**: http://localhost:8080
- **GPT-SoVITS API**: http://localhost:9880

## 環境變數設定

### app/.env
```env
DATABASE_URL=mysql://aws-user:aws-password@localhost:3306/aws-hackathon
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-northeast-1
```

### app-server/.env
參考 `app-server/.env.example`

## 資料庫管理

```bash
# 開發環境遷移
cd app
yarn db:dev

# 生產環境部署
yarn db:deploy

# 重新生成 Prisma Client
yarn db:genrate
```

## 測試

```bash
# app-server 測試
cd app-server
yarn test

# 代碼檢查
yarn lint
```

## 開發規範

### 提交訊息格式
```
<type>(<scope>): <subject>

type: feat, fix, docs, style, refactor, test, chore
```

### 分支策略
- `master`: 主分支
- `feature/*`: 功能開發
- `fix/*`: 問題修復

## 產品資料

系統目前支援以下產品：

1. **東森鴕鳥龜鹿精** - 強化靈活關節
2. **東森專利葉黃素滋養倍效膠囊** - 眼睛保健
3. **東森完美動能極纖果膠** - 體重管理

詳細產品資訊請參考 `llm-prompt/conversationprompt.md`

## 疑難排解

### MySQL 連線問題
```bash
# 檢查容器狀態
docker-compose ps

# 查看日誌
docker-compose logs mysql
```

### Prisma 同步問題
```bash
# 重置資料庫 (開發環境)
yarn db:dev --name reset

# 重新生成 client
yarn db:genrate
```

## 貢獻指南

1. Fork 本專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權

本專案為 AWS Hackathon 2025 參賽作品

## 聯繫方式

如有問題或建議，請透過 GitHub Issues 聯繫團隊