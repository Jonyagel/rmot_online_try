// src/app/profile/page.tsx
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FavoriteButton } from '../components/FavoriteButton';

type PostType = 'nadlan' | 'forum' | 'board';
type TabType = { id: PostType; label: string; icon: string };

interface FavoriteItem {
  _id: string;
  title: string;
  price?: string;
  location?: string;
  topic?: string;
  category?: string;
  date?: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  image?: string;
  favorites: {
    nadlan: FavoriteItem[];
    forum: FavoriteItem[];
    board: FavoriteItem[];
  };
}

const TABS: TabType[] = [
  { id: 'nadlan', label: 'נדל"ן', icon: '🏠' },
  { id: 'forum', label: 'פורום', icon: '💬' },
  { id: 'board', label: 'לוח מודעות', icon: '📋' }
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<PostType>('nadlan');

  // Authentication Check
  useEffect(() => {
    if (status === 'unauthenticated' && !localStorage.getItem('token')) {
      router.push('/auth/login');
      return;
    }
    fetchUserData();
  }, [status]);

  // Fetch User Data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user-info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? 'אנא התחבר מחדש' : 'שגיאה בטעינת הנתונים');
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה בטעינת הנתונים';
      setError(errorMessage);
      toast.error(errorMessage);
      if (err instanceof Error && err.message.includes('התחבר')) {
        router.push('/auth/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render Item Card
  const ItemCard = ({ item, type }: { item: FavoriteItem; type: PostType }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-medium text-lg mb-2 line-clamp-2">{item.title}</h3>
          {type === 'nadlan' && item.price && (
            <p className="text-green-600 font-semibold">{item.price}₪</p>
          )}
          {(item.location || item.topic || item.category) && (
            <span className={`inline-block px-2 py-1 text-sm rounded ${
              type === 'forum' ? 'bg-blue-100 text-blue-800' :
              type === 'board' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.location || item.topic || item.category}
            </span>
          )}
          {item.date && (
            <p className="text-gray-500 text-sm mt-2">
              {new Date(item.date).toLocaleDateString('he-IL')}
            </p>
          )}
        </div>
        <FavoriteButton
          itemId={item._id}
          type={type}
          initialIsFavorite={userData?.favorites[type].some(fav => fav._id === item._id) || false}
        />
      </div>
      <Link 
        href={`/${type}/${item._id}`}
        className="mt-3 text-blue-500 hover:underline block text-center"
      >
        צפה בפרטים
      </Link>
    </div>
  );

  // Render Content Section
  const renderContent = () => {
    const items = userData?.favorites[activeTab] || [];
    
    if (items.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">🔍</div>
          <p>אין פריטים מועדפים בקטגוריה זו</p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <ItemCard key={item._id} item={item} type={activeTab} />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
          <p className="text-lg">{error}</p>
          <button 
            onClick={fetchUserData}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 rtl min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            {userData?.image ? (
              <img 
                src={userData.image} 
                alt={userData.name} 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl text-blue-500">
                  {userData?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userData?.name}</h1>
            <p className="text-gray-600">{userData?.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b">
          <div className="flex gap-4 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-6 flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}