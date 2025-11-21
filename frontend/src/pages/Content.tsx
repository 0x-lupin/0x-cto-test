import { useEffect, useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const Content = () => {
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await api.get('/contents');
      setContents(response.data);
    } catch (error) {
      toast.error('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contents.map((content) => (
          <div key={content.id} className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  content.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {content.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {content.excerpt || content.content.substring(0, 100)}
              </p>
              <div className="mt-4 text-xs text-gray-500">
                <p>By: {content.author.firstName} {content.author.lastName}</p>
                <p>Created: {format(new Date(content.createdAt), 'MMM dd, yyyy')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Content;
