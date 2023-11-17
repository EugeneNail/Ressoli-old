<?php

namespace App\Console;

use App\Models\Photo;
use App\Models\Plot;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class Kernel extends ConsoleKernel {
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void {
        $schedule->call(function () {
            $public = Storage::disk("public");
            $public->delete($public->allFiles("temp"));
            Photo::where("application_id")->delete();

            $ids = DB::table("applications")->select("applicable_id")->distinct()->pluck("applicable_id");
            Plot::whereNotIn($ids)->delete();
        })->dailyAt("03:00");
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
