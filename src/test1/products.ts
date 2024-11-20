import { useInfiniteQuery } from 'vue-query';
import { v4 as uuidv4 } from 'uuid';
import { computed, ref } from 'vue';

interface Product {
  id: string;
  name: string;
}

// Mock products on the server
let generatedProducts: Product[] = [];
/**
 * Fetches a list of products
 */
export function useProductsList() {
  const { data, fetchNextPage, isLoading, refetch } = useInfiniteQuery('products', fetchItems, {
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const newProducts = ref<Product[]>([]);
  const fetchedProducts = computed(() => data?.value?.pages.flatMap((page) => page.products) ?? []);
  const products = computed(() => [...newProducts.value, ...fetchedProducts.value]);


  async function fetchItems({ pageParam = 1 }): Promise<{ products: Product[], nextCursor: number }> {
    return requestProductsList(pageParam);
  }

  function addNewProduct() {
    const newProduct = {
      id: uuidv4(),
      name: `Product ${generatedProducts.length}`,
    };
    newProducts.value = [newProduct, ...newProducts.value];
    addProductRequest(newProduct);

    return newProduct;
  }

  function refetchProducts() {
    newProducts.value = [];
    return refetch.value();
  }

  return {
    products,
    fetchNextPage,
    isLoading,
    addNewProduct,
    refetchProducts
  };
}

function requestProductsList(page: number) {
  generateProductsMock();
  // Mock API call
  return Promise.resolve({ products: generatedProducts.slice(20 * (page - 1), (20 * page) - 1), nextCursor: page + 1 });

}

function addProductRequest(product: Product) {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      generatedProducts = [product, ...generatedProducts];
      resolve(undefined);
    }, 100);
  });
}

function generateProductsMock() {
  if (generatedProducts.length) {
    return;
  }

  generatedProducts = Array.from({ length: 2000 }, (_, i) => ({
    id: uuidv4(),
    name: `Product ${i}`,
  }));
}