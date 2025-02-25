<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Review;
use App\Models\Borrowing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'category_id',
        'published_year',
        'copies_available',
        'cover_image'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function borrowings() {
        return $this->hasMany(Borrowing::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }
}
