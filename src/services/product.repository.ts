import { Product } from '@/interfaces';
import { ProductAdapter } from '@/interfaces/product.interface';
import { supabase } from '@/lib/supabase-client';

export class ProductRepository {
  private db: typeof supabase;

  constructor(db: typeof supabase) {
    this.db = db;
  }

  async getProducts(): Promise<Product[]> {
    try {
      const { data, error } = await this.db.from('products').select('*');

      if (error) {
        throw error;
      }

      return ProductAdapter.toModelList(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const { error } = await this.db
        .from('products')
        .update({ isActive: false })
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }
}
