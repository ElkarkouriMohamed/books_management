import { useEffect, useState } from "react";
import { api } from "../api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const getBooks = async () => {
    try {
      const res = await api.get("api/books");
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBooks();
  }, [])
  
  return (
    <>
      {books.length > 0 ? (
        <ul>
          {books.map((book, i) => (
            <li key={i}>{book.title}</li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-red-500 text-2xl">
          There are no available books
        </p>
      )}
    </>
  );
}
