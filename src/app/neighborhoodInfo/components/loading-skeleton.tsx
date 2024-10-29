// יצירת קומפוננטת סקלטון חדשה
const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow-lg p-4">
      {/* סקלטון ללוגו */}
      <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
      
      {/* סקלטון לכותרת */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      
      {/* סקלטון לתיאור */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      
      {/* סקלטון לפרטי קשר */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      
      {/* סקלטון לכפתורים */}
      <div className="mt-4 flex gap-2">
        <div className="h-8 bg-gray-200 rounded w-100"></div>
        {/* <div className="h-8 bg-gray-200 rounded w-24"></div> */}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
