<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
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
        Gate::authorize('viewAny',Category::class);

        $categories = Category::all();
        return response()->json([
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Gate::authorize('create',Category::class);        

        $fields = $request->validate([
            'name' => 'required|min:10|max:30|unique:categories',
            'description' => 'required|max:255'
        ]);

        $category = Category::create($fields);

        return response()->json([
            'category' => $category,
            'message' => 'Your category added successfly'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        Gate::authorize('view',Category::class);

        return response()->json([
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        Gate::authorize('update',$category);

        $fields = $request->validate([
            'name' => 'required|min:10|max:30',
            'description' => 'required|max:255'
        ]);

        $category->update($fields);

        return response()->json([
            'category' => $category,
            'message' => 'Your category updated successfly'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Gate::authorize('delete',$category);

        $category->delete();

        return response()->json([
            'message' => 'The category was deleted'
        ],200);
    }
}
