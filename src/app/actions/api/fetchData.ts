'use server';

import { supabase } from '@/lib/supabase';

interface Response<T> {
  data: T[];
}

export const getAllData = async <T>(table: string): Promise<Response<T>> => {
  try {
    const { data, error } = await supabase.from(table).select('*');

    if (error) {
      throw new Error(error.message);
    }

    return {
      data: data as T[],
    };
  } catch (error) {
    console.error(`Error fetching data from ${table}:`, error);
    return {
      data: [],
    };
  }
};
