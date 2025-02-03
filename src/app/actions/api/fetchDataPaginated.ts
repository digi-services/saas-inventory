'use server';

import { supabase } from '@/lib/supabase';

interface PaginationOptions {
  page?: number;
  pageSize?: number;
  table: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const getPaginatedData = async <T>({
  page = 1,
  pageSize = 10,
  table,
}: PaginationOptions): Promise<PaginatedResponse<T>> => {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const [countResponse, dataResponse] = await Promise.all([
      supabase.from(table).select('*', { count: 'exact', head: true }),
      supabase.from(table).select('*').range(from, to),
    ]);

    if (countResponse.error || dataResponse.error) {
      throw new Error(
        countResponse.error?.message ||
          dataResponse.error?.message ||
          'Error desconocido'
      );
    }

    return {
      data: dataResponse.data as T[],
      total: countResponse.count || 0,
      page,
      pageSize,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      data: [],
      total: 0,
      page,
      pageSize,
    };
  }
};
