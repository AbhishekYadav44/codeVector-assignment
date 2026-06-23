type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  updatedAt: string;
};

interface CardProps {
  product: Product;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function Card({
  product,
  onUpdate,
  onDelete,
}: CardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-slate-900 text-base">
            {product.name}
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            #{product.id}
          </p>
        </div>

        <span className="px-2 py-1 text-xs rounded-lg bg-slate-100 text-slate-700">
          {product.category}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-slate-900">
          ₹{product.price}
        </p>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Updated:
        <br />
        {new Date(
          product.updatedAt
        ).toLocaleString("en-IN")}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onUpdate(product.id)}
          className="flex-1 bg-slate-900 text-white py-2 rounded-xl cursor-pointer text-sm"
        >
          Update
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-xl cursor-pointer text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}