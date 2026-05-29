# 🚀 快速開始指南

## 5 分鐘快速上手

### 1. 安裝依賴
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```

打開瀏覽器，訪問顯示的 URL（通常是 `http://localhost:5173`）

### 3. 試試看行事曆功能

#### 匯入示例行事曆
1. 點擊 `📥 匯入 ICS` 按鈕
2. 選擇 `example-calendar.ics` 文件
3. 自動匯入 11 個示例事件

#### 新增事件
1. 點擊 `➕ 新增事件` 按鈕
2. 填寫：
   - 標題：「會議」
   - 日期：2026-06-01
   - 分類：「行政會議」
3. 點擊 `確認`

#### 管理分類
1. 在右側分類面板點擊 `⚙️`
2. 輸入新分類名稱（如「臨時事項」）
3. 點擊 `新增`

#### 篩選事件
1. 勾選/取消勾選左側的分類
2. 行事曆會實時更新

### 4. 設置 Google Sheets 同步（可選）

詳細步驟見 [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## 📁 文件結構

```
├── src/
│   ├── App.vue                 # 主應用程式
│   ├── components/
│   │   ├── Calendar.vue       # 行事曆主元件
│   │   ├── CalendarGrid.vue   # 月份行事曆
│   │   ├── EventList.vue      # 事件列表
│   │   ├── CategoryFilter.vue # 分類篩選
│   │   └── ImportExport.vue   # 匯入導出
│   ├── main.js                # 應用入口
│   ├── style.css              # 全局樣式
│   └── calendar-style.css     # 行事曆樣式
├── index.html                 # HTML 模板
├── vite.config.js             # Vite 配置
├── package.json               # 項目配置
├── google-app-script.js       # Google App Script 代碼
├── example-calendar.ics       # 示例 ICS 文件
├── README.md                  # 項目說明
├── README_FULL.md             # 完整使用手冊
└── GOOGLE_SHEETS_SETUP.md     # Google Sheets 設置指南
```

## 🎨 主要功能

✅ 月份日曆視圖  
✅ ICS 檔案匯入  
✅ 新增/編輯/刪除事件  
✅ 自定義分類  
✅ 事件篩選  
✅ 本地儲存（LocalStorage）  
✅ Google Sheets 同步  
✅ JSON 資料導出  
✅ 響應式設計  

## 🔧 常用命令

| 命令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 生成生產版本 |
| `npm run preview` | 預覽生產版本 |

## 📱 瀏覽器支持

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 移動設備瀏覽器

## 🎯 下一步

1. **個性化設置**
   - 修改預設分類
   - 調整顏色主題
   - 添加組織 Logo

2. **部署上線**
   - 部署到 GitHub Pages
   - 部署到 Vercel
   - 自建服務器

3. **拓展功能**
   - 添加事件重複規則
   - 實現用戶認證
   - 支持多用戶協作

## 📚 更多文檔

- [README_FULL.md](./README_FULL.md) - 完整使用手冊
- [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md) - Google Sheets 設置
- [google-app-script.js](./google-app-script.js) - Google App Script 源代碼

## 💡 提示

- 數據會自動保存到 LocalStorage
- 定期同步到 Google Sheets 以備份
- 在 DevTools 的 Application 標籤可查看存儲的數據

## ❓ 問題反饋

遇到問題？請檢查：
1. 瀏覽器控制台（F12）是否有錯誤
2. LocalStorage 是否被禁用
3. 網絡連接是否正常
4. 參考完整文檔解決
