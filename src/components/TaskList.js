// TaskList組件：負責渲染任務列表(子元件不負責邏輯)
'use client';
import Link from "next/link";

// 參數 {tasks}：從父組件接收的任務陣列，使用解構賦值方式接收
export default function TaskList({ tasks , onDelete }) {
    return (
        // 使用無序列表元素包裝任務項目，設置項目間距
        <ul className="space-y-2">
        {/*
          使用map()方法遍歷tasks陣列，為每個任務創建列表項目
          - task: 當前任務內容
          - index: 當前任務的索引值
        */}
        {tasks.map((task) => (
            // 列表項目
            <li
                // 使用索引作為key值（在實際應用中最好使用唯一ID）
                key={task.id}
                // 設置邊框和內間距的樣式
                className="border p-2 rounded flex justify-between items-center"
                // 根據索引值的奇偶性設置交替背景色
                // - 偶數索引：淺灰色 (#f0f0f0)
                // - 奇數索引：白色 (#ffffff)
                style={{ backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff" }}
            >
                {/* 顯示任務內容 */}
                <Link 
                    herf={'/task/${task.id}'}
                    className="text-blue-600 hover:underline"
                >
                    {task.title}
                </Link>
                <button
                    // 設置刪除按鈕的樣式
                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                    // 當按鈕被點擊時，調用onDelete函數並傳入當前任務的索引值
                    onClick={() => onDelete(task.id)}
                >
                    {/* 刪除按鈕的文字 */}
                    Delete
                </button>
            </li>
        ))}
      </ul>
    );
}