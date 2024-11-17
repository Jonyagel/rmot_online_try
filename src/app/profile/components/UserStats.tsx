// app/profile/components/UserStats.tsx
export default function UserStats() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">הסטטיסטיקות שלי</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">0</span>
          <p className="text-gray-600 text-sm">פוסטים</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">0</span>
          <p className="text-gray-600 text-sm">תגובות</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">0</span>
          <p className="text-gray-600 text-sm">מודעות</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">0</span>
          <p className="text-gray-600 text-sm">נק' פעילות</p>
        </div>
      </div>
    </div>
  );
}