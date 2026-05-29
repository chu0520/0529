# 淡江大學行事曆 - 使用指南

## 功能概述

這是一個功能完整的行事曆網頁應用程式，具有以下特性：

- 📅 月份視圖行事曆
- 📥 ICS 檔案匯入功能
- ✏️ 新增/編輯/刪除事件
- 🏷️ 自定義分類管理
- 💾 Google Sheets 雲端儲存
- 📊 事件篩選和搜索
- 💻 本地數據備份

## 🎯 快速開始

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發服務器
```bash
npm run dev
```

### 3. 建置生產版本
```bash
npm run build
```

## 📖 使用說明

### 基本操作

#### 1. 瀏覽行事曆
- 使用 `‹ ›` 按鈕在月份之間導航
- 頁面中央顯示當前月份的行事曆
- 點擊日期可查看該日的事件

#### 2. 新增事件

**方法 A：通過表單**
1. 點擊 `➕ 新增事件` 按鈕
2. 填寫：
   - 標題（必填）
   - 日期（必填）
   - 分類（選擇現有分類）
   - 說明（選填）
3. 點擊 `確認` 按鈕

**方法 B：匯入 ICS 檔案**
1. 點擊 `📥 匯入 ICS` 按鈕
2. 選擇 `.ics` 檔案
3. 系統會自動匯入所有事件

#### 3. 管理分類

**查看分類**
- 右側面板顯示所有可用分類
- 勾選/取消勾選以顯示/隱藏該分類的事件

**新增分類**
1. 點擊右側分類面板的 `⚙️` 按鈕進入管理模式
2. 輸入新分類名稱
3. 點擊 `新增` 按鈕

**刪除分類**
1. 進入管理模式（點擊 `⚙️`）
2. 點擊要刪除的分類旁的 `刪除` 按鈕

#### 4. 刪除事件
1. 在右側事件列表中找到要刪除的事件
2. 點擊紅色 `×` 按鈕

#### 5. 同步到 Google Sheets

1. 在頂部輸入 Google Sheets Webhook URL
2. 點擊 `同步到 Google Sheets` 按鈕
3. 等待確認訊息

詳細設置步驟，請參考 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## 🎨 預設分類

系統提供以下預設分類：

| 分類 | 顏色 | 用途 |
|------|------|------|
| 假日 | 紅色 | 放假日期 |
| 行政會議 | 青色 | 行政相關會議 |
| 教學活動 | 藍色 | 教學相關活動 |
| 招生相關 | 橙色 | 招生活動 |
| 學生活動 | 綠色 | 學生相關活動 |
| 重要截止 | 黃色 | 重要截止日期 |
| 學期課程 | 紫色 | 課程相關事項 |

## 💾 數據儲存

### 本地儲存
- 所有數據自動保存到瀏覽器的 LocalStorage
- 可通過 `📥 導出資料` 下載 JSON 備份

### 雲端儲存
- 支持同步到 Google Sheets
- 提供自動備份功能
- 支持多設備訪問

## 📂 ICS 檔案格式

支持標準 ICS 格式，例如：

```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Example//Calendar//EN
BEGIN:VEVENT
UID:event1@example.com
DTSTART:20260529
SUMMARY:會議
DESCRIPTION:本週會議
END:VEVENT
END:VCALENDAR
```

## ⚙️ 進階設置

### 修改預設分類

編輯 [src/components/Calendar.vue](./src/components/Calendar.vue) 第 11 行：

```javascript
const categories = ref(['假日', '行政會議', '教學活動', ...])
```

### 自定義顏色

編輯各組件中的 `getCategoryColor` 函數，修改顏色對應關係。

### 修改 Google Sheets 工作表名稱

編輯 [google-app-script.js](./google-app-script.js) 的常數定義部分。

## 🔍 API 參考

### 行事曆事件結構

```javascript
{
  id: 1,                              // 唯一 ID
  date: "2026-05-29",                // 日期 (YYYY-MM-DD)
  title: "會議",                      // 事件標題
  category: "行政會議",               // 分類
  description: "週會討論"             // 說明（選填）
}
```

### 儲存位置

- **LocalStorage Key**: `calendarData`
- **Google Sheets**: 由 Google App Script 管理

## 🐛 常見問題

**Q: 匯入 ICS 後找不到事件？**
A: 檢查 ICS 檔案格式是否正確，確保包含 DTSTART 和 SUMMARY 字段。

**Q: 同步到 Google Sheets 失敗？**
A: 檢查 Webhook URL 是否正確，確保網絡連接正常。

**Q: 刪除瀏覽器 Cookie 後數據會丟失嗎？**
A: 是的。建議定期導出 JSON 備份或同步到 Google Sheets。

**Q: 是否支持多用戶協作？**
A: 當前版本支持通過 Google Sheets 共享，但不支持實時協作。

## 📱 響應式設計

- 支持桌面、平板和手機設備
- 自適應布局
- 觸摸友好的界面

## 🚀 部署

### 部署到 Vercel

1. 將代碼推送到 GitHub
2. 連接 Vercel 帳戶
3. 選擇項目並部署

### 部署到 GitHub Pages

```bash
npm run build
# 將 dist/ 文件夾推送到 gh-pages 分支
```

## 📝 許可證

MIT License

## 📧 支持

遇到問題？請檢查：
1. 瀏覽器控制台（F12）的錯誤訊息
2. LocalStorage 中是否有 calendarData
3. Google Sheets 設置是否正確
