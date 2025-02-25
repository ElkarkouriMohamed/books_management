<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrowing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class BorrowingController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny',Borrowing::class);

        $borrowings = Borrowing::all();

        return response()->json([
            'borrowings' => $borrowings
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create',Borrowing::class);

        $fields = $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'due_date' => 'required|date|after:today'
        ]);

        $book = Book::find($fields['book_id']);
        if ($book->copies_available <= 0) {
            return response()->json([
                'message' => 'This book is currently unavailable for borrowing.'
            ], 400);
        }

        $borrowing = Borrowing::create($fields);

        $book->decrement('copies_available');

        return response()->json([
            'borrowing' => $borrowing,
            'message' => 'The book borrowed Successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Borrowing $borrowing)
    {
        Gate::authorize('view',Borrowing::class);

        return response()->json([
            'borrowing' => $borrowing
        ]); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        // Gate::authorize('update',$borrowing);

        // $fields = $request->validate([
        //     'user_id' => 'required|exists:users,id',
        //     'book_id' => 'required|exists:books,id',
        //     'due_date' => 'required|date|after:today'
        // ]);

        // if ($borrowing->book_id !== $fields['book_id']) {
        //     $newBook = Book::find($fields['book_id']);
        //     if ($newBook->copies_available <= 0) {
        //         return response()->json([
        //             'message' => 'This new book is currently unavailable for borrowing.'
        //         ], 400);
        //     }
        // }

        // if ($borrowing->book_id !== $fields['book_id']){
        //     $oldbook = Book::find($borrowing->book_id);
        //     $oldbook->increment('copies_available');
        // }

        // if ($borrowing->book_id !== $fields['book_id']){
        //     $newBook->decrement('copies_available');
        // }

        // $borrowing->update($fields);

        // return response()->json([
        //     'borrowing' => $borrowing,
        //     'message' => 'The borrowed book has updated Successfully'
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Borrowing $borrowing)
    {
        Gate::authorize('delete',$borrowing);

        if (!$borrowing->validated_at) {
            $book = Book::find($borrowing->book_id);
            $book->increment('copies_available');
        }

        $borrowing->delete();

        return response()->json([
            'message' => 'The borrowed book was deleted'
        ]);
    }

    public function validateBorrowing(Borrowing $borrowing) {

        Gate::authorize('validateBorrowing',$borrowing);

        $borrowing->update(['validated_at' => now()]);

        return response()->json([
            'message' => 'Borrowing Valiated Successfully'
        ]);
    }
}
