import { useEffect, useState } from "react";
import { api } from "@/api";
import Pagination from "@/components/Pagination";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(null)

  const getBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get(`api/books?page=${page}&limit=${2}`);
      setBooks(res.data[0].data);
      setLastPage(res.data[0].last_page);
      console.log('done');
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBooks();
  }, [page])

  return (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 z-10">
          <div className="w-16 h-16 border-4 border-gray-700 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div>
        <ul>
          {books.map((book, i) => (
            <li key={i}>{book.id}</li>
          ))}
        </ul>
        <Pagination currentPage={page} totalPages={lastPage} onPageChange={setPage} visibleRange={3} />
      </div>
    </>
  );
}
