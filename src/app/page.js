/**
 * Next.js Task Board - 首頁組件
 *
 * 核心功能說明:
 * 1. Next.js路由系統:
 *    - app/page.js是Next.js 13+的App Router核心文件
 *    - 自動映射為網站的根路由'/'
 *    - 支援巢狀路由，例如app/about/page.js會映射到'/about'
 *
 * 2. 渲染策略:
 *    - 此組件使用'use client'指令標記為客戶端組件
 *    - 允許使用useState等客戶端特性
 *    - 如需SEO或快取，可改用伺服器端組件
 *
 * 3. 狀態管理架構:
 *    - 使用React.useState管理本地狀態
 *    - tasks: 儲存所有任務的陣列
 *    - newTask: 追蹤輸入框的當前值
 *
 * 4. 效能考量:
 *    - 利用展開運算符來不可變更新狀態
 *    - 使用Next.js的Image組件自動優化圖片
 *
 * 5. 可能的優化項目:
 *    - 添加錯誤邊界(Error Boundary)處理組件錯誤
 *    - 實作任務持久化存儲（localStorage或後端API）
 *    - 添加任務編輯和刪除功能
 *    - 添加任務狀態（完成/未完成）
 *    - 實作任務拖拽排序
 *    - 添加任務分類和篩選功能
 */

'use client';

// 引入Next.js和React核心功能
import Image from "next/image";
import { useState } from "react"; // 引入React的useState hook來管理狀態
import TaskList from "@/components/TaskList"; // 引入任務列表組件

// 定義首頁組件
export default function Home() {
  /**
   * 狀態管理配置
   * 使用React的useState Hook管理本地狀態
   *
   * @state {tasks} - 陣列，儲存所有任務
   *   - 初始值為空陣列[]
   *   - 透過setTasks函數更新
   *   - 每個任務為字串類型
   *
   * @state {newTask} - 字串，追踪輸入框的當前值
   *   - 初始值為空字串""
   *   - 透過setNewTask函數更新
   *   - 在表單提交時重置
   */
  const [tasks, setTasks] = useState([]); // 任務列表狀態
  const [newTask, setNewTask] = useState(""); // 輸入框狀態
  
  /**
   * 添加新任務到列表中
   *
   * 執行流程:
   * 1. 輸入驗證：檢查任務內容是否為空
   * 2. 狀態更新：使用不可變方式更新tasks陣列
   * 3. 重置表單：清空輸入框
   *
   * @注意事項
   * - 使用展開運算符[...tasks]來創建新陣列，避免直接修改原狀態
   * - trim()用於去除輸入的首尾空格
   * - 可以在這裡整合API調用，實現數據持久化
   */
  const addTask = () => {
    // 輸入驗證
    if (newTask.trim() === "") {
      alert("請輸入task");
      return;
    }

    // 使用不可變更新模式更新狀態
    const updatedTasks = [...tasks, newTask.trim()];
    setTasks(updatedTasks);
    
    // 重置輸入框狀態
    setNewTask("");
    
    // TODO: 實作後端整合
    // const response = await fetch('/api/tasks', {
    //   method: 'POST',
    //   body: JSON.stringify({ task: newTask })
    // });
  };

  /**
   * 渲染組件UI
   * 使用TailwindCSS進行樣式設計
   *
   * 組件結構:
   * 1. 標題區域
   * 2. 任務輸入區域
   *    - 文字輸入框
   *    - 添加按鈕
   * 3. 任務列表區域
   */
  return (
    <main className="p-4">
      {/* 頁面標題 */}
      <h1 className="text-2xl font-bold">Task Board</h1>
      
      {/* 輸入區域容器 */}
      <div className="flex gap-2 mb-4">
        {/* 任務輸入框 */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // 當輸入值變化時更新newTask狀態
        />
        {/* 添加任務按鈕 */}
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      {/* 渲染任務列表組件，傳入tasks作為props */}
      <TaskList tasks={tasks} />
    </main>
  );
}
