<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index'])->middleware('auth:sanctum');
// Books Api Route:
Route::apiResource('/books',BookController::class);
// Categories Api Route:
Route::apiResource('/categories',CategoryController::class);
// Borrowings Api Route:
Route::apiResource('/borrowings',BorrowingController::class)->middleware('auth:sanctum');
// Reviews Api Route:
Route::apiResource('/reviews',ReviewController::class);

Route::patch('/borrowings/{borrowing}/validate',[BorrowingController::class,'validateBorrowing'])->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/books', [BookController::class, 'index']);


