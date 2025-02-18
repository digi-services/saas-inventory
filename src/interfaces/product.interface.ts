interface ProductDTO {
  id: string;
  category_id: number;
  category: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  categoryId: number;
  categoryName: string;
  name: string;
  price: number;
  stock: number;
  isInStock: boolean;
}

export class ProductAdapter {
  static toModel(dto: ProductDTO): Product {
    return {
      id: dto.id,
      categoryId: dto.category_id,
      categoryName: dto.category,
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
      isInStock: dto.stock > 0,
    };
  }

  static toDTO(model: Product): ProductDTO {
    return {
      id: model.id,
      category_id: model.categoryId,
      category: model.categoryName,
      name: model.name,
      price: model.price,
      stock: model.stock,
    };
  }

  static toModelList(dtoList: ProductDTO[]): Product[] {
    return dtoList.map((dto) => this.toModel(dto));
  }

  static toDTOList(modelList: Product[]): ProductDTO[] {
    return modelList.map((model) => this.toDTO(model));
  }
}
