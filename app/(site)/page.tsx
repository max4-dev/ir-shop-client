import { getProducts } from "@/src/entities/product/handler";
import { Title } from "@/src/shared/ui";

export default async function Home() {
  const products = await getProducts.getAll();
  console.log(products);

  return (
    <div>
      <Title variant="decorated">Home</Title>
      {products &&
        products.map((product) => (
          <div key={product.id}>
            <div>{product.title}</div>
            <div>{product.price}</div>
          </div>
        ))}
    </div>
  );
}
