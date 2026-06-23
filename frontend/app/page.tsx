"use client";

import { useEffect, useState } from "react";
import Card from "./components/Card";

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  updatedAt: string;
};

type Cursor = {
  id: string;
  updatedAt: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [anchor, setAnchor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [cursorHistory, setCursorHistory] = useState<
    (Cursor | null)[]
  >([null]);

  const [nextCursor, setNextCursor] =
    useState<Cursor | null>(null);

  const [loading, setLoading] = useState(false);

  async function fetchPage(
    page: number,
    cursor: Cursor | null
  ) {
    try {
      setLoading(true);

      let url =
        "http://localhost:3000/products-cursor?limit=10";

      if (cursor) {
        url += `&cursorId=${cursor.id}`;
        url += `&updatedAt=${cursor.updatedAt}`;
        url += `&anchor=${anchor}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setProducts(data.data);

      if (!anchor) {
        setAnchor(data.anchor);
      }

      setNextCursor(data.nextCursor);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage(1, null);
  }, []);

  const handleNext = async () => {
    if (!nextCursor) return;

    const updatedHistory = [
      ...cursorHistory,
      nextCursor,
    ];

    setCursorHistory(updatedHistory);

    await fetchPage(
      currentPage + 1,
      nextCursor
    );
  };

  const handlePrev = async () => {
    if (currentPage === 1) return;

    const prevCursor =
      cursorHistory[currentPage - 2];

    await fetchPage(
      currentPage - 1,
      prevCursor
    );
  };

 const handleUpdate = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3000/products/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `Updated-${Date.now()}`,
        }),
      }
    );

    const data = await res.json();

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              name: data.product.name,
              updatedAt: data.product.updatedAt,
            }
          : product
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Delete this product?"
      );

      if (!confirmDelete) return;

      await fetch(
        `http://localhost:3000/products/${id}`,
        {
          method: "DELETE",
        }
      );

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <header className="bg-white border border-slate-200 rounded-2xl px-6 py-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Product Management
              </h1>

              <p className="text-slate-500 text-sm mt-1">
                Cursor Pagination Demo
              </p>
            </div>

            <div className="flex gap-3">
              <div className="bg-slate-100 px-4 py-2 rounded-xl">
                <p className="text-xs text-black ">
                  Products
                </p>
                <p className="font-semibold text-black">
                  {products.length}
                </p>
              </div>

              <div className="bg-slate-100 px-4 py-2 rounded-xl">
                <p className="text-xs text-black">
                  Current Page
                </p>
                <p className=" text-black font-semibold">
                  {currentPage}
                </p>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="h-100 flex items-center justify-center">
            <div className="text-lg font-medium text-slate-600">
              Loading Products...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {products.map((product) => (
              <Card
                key={product.id}
                product={product}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <footer className="mt-10 flex justify-center">
          <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 text-black rounded-xl border border-slate-200 cursor-pointer disabled:opacity-40"
            >
              ← Prev
            </button>

            <div className="flex gap-2">
              <button className="h-10 w-10 rounded-xl bg-slate-900  cursor-pointer">
                {currentPage}
              </button>

              {nextCursor && (
                <button
                  onClick={handleNext}
                  className="h-10 w-10 rounded-xl  bg-gray-500 text-white text cursor-pointer"
                >
                  {currentPage + 1}
                </button>
              )}
            </div>

            <button
              onClick={handleNext}
              disabled={!nextCursor}
              className="px-4 py-2 text-black rounded-xl border border-slate-200 cursor-pointer disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}