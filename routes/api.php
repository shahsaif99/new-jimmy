<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\AbsenceController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\LendingController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\VacationController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\CompetenceController;
use App\Http\Controllers\Api\AbsenceTypeController;
use App\Http\Controllers\Api\PermissionsController;
use App\Http\Controllers\Api\ResetPasswordController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\BoardInformationController;
use App\Http\Controllers\Api\CompetenceCourseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group whichnewIndex
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('/password/reset', [ResetPasswordController::class, 'reset'])->name('password.reset');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/users/status/{id}', [UserController::class, 'updateStatus'])->name('users.status');
    Route::get('/users/stats', [UserController::class, 'usersStats'])->name('users.stats');
    Route::post('/projects/documents/upload/{project}', [ProjectController::class, 'uploadDocuments'])->name('projects.upload.documents');
    Route::get('/dashboard/statistics', [DashboardController::class, 'statistics'])->name('dashboard.statistics');
    Route::get('/absences/statistics', [AbsenceController::class, 'absenceStatistics'])->name('absences.statistics');
    Route::post('/absences/status/{absence}', [AbsenceController::class, 'absenceStatusUpdate'])->name('absences.status');
    Route::post('/vacations/status/{vacation}', [VacationController::class, 'vacationStatusUpdate'])->name('vacations.status');
    Route::get('/vacations/statistics', [VacationController::class, 'vacationStatistics'])->name('vacations.statistics');

    Route::apiResources([
        'users' => UserController::class,
        'roles' => RolesController::class,
        'permissions' => PermissionsController::class,
        'projects' => ProjectController::class,
        'equipments' => EquipmentController::class,
        'competences' => CompetenceController::class,
        'lendings' => LendingController::class,
        'boardinformation' => BoardInformationController::class,
        'absences' => AbsenceController::class,
        'vacations' => VacationController::class,
        'absence-types' => AbsenceTypeController::class,
        'competence-courses' => CompetenceCourseController::class,
        'settings' => SettingsController::class,
    ]);

    Route::get('/documents', [DocumentController::class, 'getDocuments'])->name('documents');
    Route::post('/documents/store', [DocumentController::class, 'storeDocument'])->name('documents.store');
    Route::post('/documents/update/{id}', [DocumentController::class, 'updateDocument'])->name('documents.update');

    Route::get('/account', [AccountController::class, 'account'])->name('account');
    Route::put('/account/password', [AccountController::class, 'updateAccountPassword'])->name('account.password');
    Route::put('/account/general', [AccountController::class, 'updateAccountGeneral'])->name('account.general');
});
