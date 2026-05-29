// Google App Script - 儲存行事曆資料到 Google Sheets

// 設定常數
const SHEET_ID = 'YOUR_SPREADSHEET_ID'; // 替換為你的 Google Sheets ID
const EVENTS_SHEET = 'Events'; // 事件資料表
const CATEGORIES_SHEET = 'Categories'; // 分類表
const LOGS_SHEET = 'Sync Logs'; // 同步日誌表

/**
 * 初始化 Google Sheets
 * 如果工作表不存在，則創建新的工作表
 */
function initializeSheets() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  
  // 建立事件表
  if (!getSheetByName(ss, EVENTS_SHEET)) {
    const eventSheet = ss.insertSheet(EVENTS_SHEET);
    eventSheet.appendRow([
      'ID',
      '日期',
      '標題',
      '分類',
      '說明',
      '建立時間',
      '最後修改時間'
    ]);
  }
  
  // 建立分類表
  if (!getSheetByName(ss, CATEGORIES_SHEET)) {
    const categorySheet = ss.insertSheet(CATEGORIES_SHEET);
    categorySheet.appendRow([
      'ID',
      '分類名稱',
      '顏色代碼',
      '建立時間'
    ]);
    
    // 插入預設分類
    const defaultCategories = [
      ['假日', 'FF6B6B'],
      ['行政會議', '4ECDC4'],
      ['教學活動', '45B7D1'],
      ['招生相關', 'FFA07A'],
      ['學生活動', '98D8C8'],
      ['重要截止', 'F7DC6F'],
      ['學期課程', 'BB8FCE']
    ];
    
    defaultCategories.forEach((cat, index) => {
      categorySheet.appendRow([
        index + 1,
        cat[0],
        cat[1],
        new Date()
      ]);
    });
  }
  
  // 建立同步日誌表
  if (!getSheetByName(ss, LOGS_SHEET)) {
    const logSheet = ss.insertSheet(LOGS_SHEET);
    logSheet.appendRow([
      '時間',
      '操作',
      '事件數量',
      '狀態',
      '訊息'
    ]);
  }
}

/**
 * 取得工作表（如果不存在返回 null）
 */
function getSheetByName(ss, sheetName) {
  return ss.getSheetByName(sheetName) || null;
}

/**
 * 主要的 doPost 函數 - 接收 POST 請求
 * 用於從前端匯入行事曆資料
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action || 'sync';
    
    let result = {};
    
    if (action === 'sync') {
      result = syncCalendarData(payload);
    } else if (action === 'getEvents') {
      result = getEvents();
    } else if (action === 'getCategories') {
      result = getCategories();
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    const errorResponse = {
      success: false,
      error: error.toString(),
      timestamp: new Date()
    };
    
    // 記錄錯誤
    logSync('錯誤', 0, '失敗', error.toString());
    
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 同步行事曆資料
 */
function syncCalendarData(payload) {
  initializeSheets();
  
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const eventSheet = getSheetByName(ss, EVENTS_SHEET);
  
  if (!eventSheet) {
    throw new Error('Events sheet not found');
  }
  
  const events = payload.events || [];
  const timestamp = payload.timestamp || new Date();
  
  // 清空現有資料（保留標題行）
  const lastRow = eventSheet.getLastRow();
  if (lastRow > 1) {
    eventSheet.deleteRows(2, lastRow - 1);
  }
  
  // 匯入新資料
  events.forEach((event) => {
    eventSheet.appendRow([
      event.id,
      event.date,
      event.title,
      event.category,
      event.description || '',
      timestamp,
      timestamp
    ]);
  });
  
  // 記錄同步日誌
  logSync('同步', events.length, '成功', `已同步 ${events.length} 個事件`);
  
  return {
    success: true,
    message: `已成功同步 ${events.length} 個事件`,
    syncedCount: events.length,
    timestamp: timestamp
  };
}

/**
 * 取得所有事件
 */
function getEvents() {
  initializeSheets();
  
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const eventSheet = getSheetByName(ss, EVENTS_SHEET);
  
  if (!eventSheet) {
    return { success: false, events: [] };
  }
  
  const data = eventSheet.getDataRange().getValues();
  const events = [];
  
  // 跳過標題行
  for (let i = 1; i < data.length; i++) {
    events.push({
      id: data[i][0],
      date: data[i][1],
      title: data[i][2],
      category: data[i][3],
      description: data[i][4],
      createdAt: data[i][5],
      updatedAt: data[i][6]
    });
  }
  
  return {
    success: true,
    events: events,
    count: events.length
  };
}

/**
 * 取得所有分類
 */
function getCategories() {
  initializeSheets();
  
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const categorySheet = getSheetByName(ss, CATEGORIES_SHEET);
  
  if (!categorySheet) {
    return { success: false, categories: [] };
  }
  
  const data = categorySheet.getDataRange().getValues();
  const categories = [];
  
  // 跳過標題行
  for (let i = 1; i < data.length; i++) {
    categories.push({
      id: data[i][0],
      name: data[i][1],
      color: data[i][2],
      createdAt: data[i][3]
    });
  }
  
  return {
    success: true,
    categories: categories,
    count: categories.length
  };
}

/**
 * 新增單個事件
 */
function addEvent(eventData) {
  initializeSheets();
  
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const eventSheet = getSheetByName(ss, EVENTS_SHEET);
  
  const timestamp = new Date();
  eventSheet.appendRow([
    eventData.id || Date.now(),
    eventData.date,
    eventData.title,
    eventData.category,
    eventData.description || '',
    timestamp,
    timestamp
  ]);
  
  return { success: true, message: 'Event added successfully' };
}

/**
 * 刪除事件
 */
function deleteEvent(eventId) {
  initializeSheets();
  
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const eventSheet = getSheetByName(ss, EVENTS_SHEET);
  
  const data = eventSheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == eventId) {
      eventSheet.deleteRow(i + 1);
      return { success: true, message: 'Event deleted successfully' };
    }
  }
  
  return { success: false, message: 'Event not found' };
}

/**
 * 新增新的分類
 */
function addCategory(categoryName, colorCode) {
  initializeSheets();
  
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const categorySheet = getSheetByName(ss, CATEGORIES_SHEET);
  
  const data = categorySheet.getDataRange().getValues();
  const maxId = Math.max(...data.slice(1).map(row => row[0])) + 1;
  
  categorySheet.appendRow([
    maxId,
    categoryName,
    colorCode || 'CCCCCC',
    new Date()
  ]);
  
  return { success: true, message: 'Category added successfully' };
}

/**
 * 記錄同步日誌
 */
function logSync(operation, count, status, message) {
  try {
    initializeSheets();
    
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const logSheet = getSheetByName(ss, LOGS_SHEET);
    
    if (logSheet) {
      logSheet.appendRow([
        new Date(),
        operation,
        count,
        status,
        message
      ]);
    }
  } catch (e) {
    Logger.log('Failed to log sync: ' + e.toString());
  }
}

/**
 * 測試函數 - 用於 Debug
 */
function testSync() {
  const testData = {
    action: 'sync',
    events: [
      {
        id: 1,
        date: '2026-05-29',
        title: '測試事件 1',
        category: '教學活動',
        description: '這是一個測試事件'
      },
      {
        id: 2,
        date: '2026-05-30',
        title: '測試事件 2',
        category: '假日',
        description: '測試描述'
      }
    ],
    timestamp: new Date()
  };
  
  Logger.log(syncCalendarData(testData));
}
