# Google Sheets 整合指南

## 📋 功能說明

本行事曆應用程式可以將所有事件和分類資料自動同步到 Google Sheets。

## 🚀 設置步驟

### 1. 建立 Google Sheets

1. 開啟 [Google Sheets](https://sheets.google.com)
2. 建立新的試算表
3. 複製試算表的 ID（URL 中的長字符串）
   - 例如: `https://docs.google.com/spreadsheets/d/**1a2b3c4d5e6f7g8h9i0j**/edit`
   - ID 就是粗體部分

### 2. 建立 Google App Script

1. 在 Google Sheets 中，點擊 `擴充功能` → `Apps Script`
2. 刪除預設代碼
3. 複製 [google-app-script.js](./google-app-script.js) 中的所有代碼
4. 將第 4 行的 `SHEET_ID` 替換為你的試算表 ID：
   ```javascript
   const SHEET_ID = 'YOUR_SPREADSHEET_ID'; // 替換為你的 ID
   ```

5. 儲存專案

### 3. 部署為網路應用程式

1. 點擊 `部署` → `新增部署`
2. 選擇部署類型為 `網路應用程式`
3. 設置：
   - 執行身份：選擇你的 Google 帳戶
   - 誰可以存取：`任何人`
4. 點擊 `部署`
5. 複製部署的 URL（會看到如下格式）：
   ```
   https://script.google.com/macros/d/[SCRIPT_ID]/usercontent
   ```

### 4. 在行事曆中設置 Webhook URL

1. 在行事曆網頁中，找到 "Google Sheets webhook URL" 輸入框
2. 貼上上面複製的 URL：
   ```
   https://script.google.com/macros/d/[SCRIPT_ID]/usercontent
   ```
3. 按下 `同步到 Google Sheets` 按鈕測試連接

## 📊 Google Sheets 結構

應用程式會自動建立以下工作表：

### Events (事件資料表)
- ID：事件唯一識別碼
- 日期：YYYY-MM-DD 格式
- 標題：事件名稱
- 分類：事件分類
- 說明：事件描述
- 建立時間：建立時間戳
- 最後修改時間：最後修改時間戳

### Categories (分類表)
- ID：分類 ID
- 分類名稱：分類名稱
- 顏色代碼：十六進制顏色代碼
- 建立時間：建立時間戳

### Sync Logs (同步日誌表)
- 時間：同步時間
- 操作：操作類型
- 事件數量：同步的事件數
- 狀態：成功/失敗
- 訊息：詳細訊息

## 🔄 API 端點

### 1. 同步行事曆資料
**POST** 到 Webhook URL
```json
{
  "action": "sync",
  "events": [
    {
      "id": 1,
      "date": "2026-05-29",
      "title": "會議",
      "category": "行政會議",
      "description": "週會"
    }
  ],
  "timestamp": "2026-05-29T10:00:00"
}
```

### 2. 取得所有事件
```json
{
  "action": "getEvents"
}
```

### 3. 取得所有分類
```json
{
  "action": "getCategories"
}
```

## 🔐 安全注意事項

1. **API 金鑰**：在實際環境中，考慮添加驗證機制
2. **數據隱私**：不要在 URL 中包含敏感信息
3. **訪問控制**：可以修改部署設置中的「誰可以存取」以限制訪問

## 🐛 故障排除

### 1. "部署失敗" 錯誤
- 檢查 SHEET_ID 是否正確
- 確保你有 Google Sheet 的編輯權限

### 2. "找不到試算表" 錯誤
- 驗證 SHEET_ID 是否匹配
- 檢查試算表是否仍然存在

### 3. 同步後無資料
- 查看 Sync Logs 工作表中的日誌
- 檢查 Webhook URL 是否正確
- 確認網絡連接

## 📝 本地備份

應用程式會在瀏覽器的 LocalStorage 中保存備份。如需導出：

1. 點擊 `📥 導出資料` 按鈕
2. 將下載的 JSON 文件保存在安全的地方

## 🔄 自動同步

要設置定期自動同步：

在 Google App Script 中添加以下觸發器：

1. 點擊 `觸發器` → `建立觸發器`
2. 選擇 `syncCalendarData` 函數
3. 設置執行時間（例如：每小時）
4. 點擊 `儲存`

## 📞 支持

如遇問題，請檢查：
1. 瀏覽器控制台的錯誤訊息
2. Google App Script 的執行日誌
3. Google Sheets 的同步日誌表
