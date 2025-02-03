import { getAllData } from '@/app/actions';
import AddProductComponent from '@/app/components/product/AddProductComponent';
import { Category } from '@/interfaces';

export default async function AddProductPage() {
  const { data: categories } = await getAllData<Category>('categories');

  return (
    <>
      <AddProductComponent categories={categories} />
    </>
  );
}
