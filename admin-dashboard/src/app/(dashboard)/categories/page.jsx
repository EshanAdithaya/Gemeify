'use client';

import { useEffect, useState, useCallback } from 'react';
import { Tags } from 'lucide-react';
import { categoriesAPI } from '@/lib/api';
import { Card, Spinner, EmptyState, PageHeader } from '@/components/ui';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoriesAPI.getAll();
      const d = res.data?.data ?? res.data;
      setCategories(Array.isArray(d) ? d : d?.data || []);
    } catch {
      setError('Failed to load categories. Is the backend API running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Spinner label="Loading categories..." />;

  return (
    <div>
      <PageHeader title="Categories" subtitle="Gem categories available in the marketplace" />

      {error ? (
        <Card>
          <EmptyState Icon={Tags} title="Unable to load categories" text={error} />
        </Card>
      ) : categories.length === 0 ? (
        <Card>
          <EmptyState Icon={Tags} title="No categories yet" text="Categories created through the API will appear here." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Card key={c.id} className="p-5">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Tags className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{c.name}</h3>
                  {c.description && <p className="text-sm text-slate-500 line-clamp-2">{c.description}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
