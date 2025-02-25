<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ReviewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index']);
    }

    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create',Review::class);
        $fields = $request->validate([
            'user_id' => 'required|exists:users',
            'book_id' => 'required|exists:books',
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|max:255'
        ]);

        $review = Review::create($fields);

        return response()->json([
            'review' => $review,
            'message' => 'Review was added successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        $reviews = $book->reviews()->get(); 

        return response()->json($reviews);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        Gate::authorize('update',$review);
        $fields = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'required|max:255'
        ]);

        $review->update($fields);

        return response()->json([
            'review' => $review,
            'message' => 'Review was updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        Gate::authorize('delete',$review);

        $review->delete();

        return response()->json([
            'message' => 'The review was deleted',
        ]);
    }
}
