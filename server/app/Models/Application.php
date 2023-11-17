<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Application extends Model {
    use HasFactory;

    protected $guarded = [];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function client(): BelongsTo {
        return $this->belongsTo(Client::class);
    }

    public function applicable(): MorphTo {
        return $this->morphTo();
    }

    public function address(): BelongsTo {
        return $this->belongsTo(Address::class);
    }

    public function photos(): HasMany {
        return $this->hasMany(Photo::class);
    }

    public function preview(): BelongsTo {
        return $this->belongsTo(Photo::class);
    }
}
