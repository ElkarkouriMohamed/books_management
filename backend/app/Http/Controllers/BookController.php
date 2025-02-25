<?php

namespace App\Http\Controllers;


use App\Models\Book;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index','show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::all();
        return response()->json([
            'books' => $books
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create',Book::class);
        $fields = $request->validate([
            'title' => 'required|max:40',
            'author' => 'required|max:40',
            'category_id' => 'required|exists:categories,id',
            'published_year' => 'required|digits:4|integer' . date('Y'),
            'copies_available' => 'required|integer',
            'cover_image' => 'required|image|mimes:png,jpg,jpeg'
        ]);

        if($request->hasFile('cover_image')){
            $image_path = $request->file('cover_image')->store('images','public');
        }else {
            $image_path = null;
        }

        $book = Book::create([
            'title' => $fields['title'],
            'author' => $fields['author'],
            'category_id' => $fields['category_id'],
            'published_year' => $fields['published_year'],
            'copies_available' => $fields['copies_available'],
            'image_path' => $image_path
        ]);

        return response()->json([
            'book' => $book,
            'message' => 'Book added successfuly'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        Gate::authorize('view',Book::class);
        return response()->json([
            'book' => $book
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        Gate::authorize('update',$book);
        $fields = $request->validate([
            'title' => 'required|max:40',
            'author' => 'required|max:40',
            'category_id' => 'required|exists:categories,id',
            'published_year' => 'required|digits:4|integer' . date('Y'),
            'copies_available' => 'required|integer',
            'cover_image' => 'required|image|mimes:png,jpg,jpeg'
        ]);

        if($request->hasFile('cover_image')){
            if ($book->cover_image) {
                Storage::disk('public')->delete($book->cover_image);
            }
            $image_path = $request->file('cover_image')->store('images','public');
        }else {
            $image_path = $book->cover_image;
        }

        $book->update([
            'title' => $fields['title'],
            'author' => $fields['author'],
            'category_id' => $fields['category_id'],
            'published_year' => $fields['published_year'],
            'copies_available' => $fields['copies_available'],
            'image_path' => $image_path
        ]);

        return response()->json([
            'book' => $book,
            'message' => 'Book updated successfuly'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        Gate::authorize('delete',$book);
        if($book->cover_image && Storage::disk('public')->exists($book->cover_image)){
            Storage::disk('public')->delete($book->cover_image);
        }

        return response()->json([
            'message' => 'The book was deleted'
        ]);
    }
}
