<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\AbsenceController;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\ChapterController;
use App\Http\Controllers\Api\LendingController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\RuhTypeController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\HandbookController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\VacationController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\CompetenceController;
use App\Http\Controllers\Api\CompetenceCategoryController;
use App\Http\Controllers\Api\AbsenceTypeController;
use App\Http\Controllers\Api\PermissionsController;
use App\Http\Controllers\Api\AvvikListingsController;
use App\Http\Controllers\Api\ResetPasswordController;
use App\Http\Controllers\Api\ForgotPasswordController;
use App\Http\Controllers\Api\BoardInformationController;
use App\Http\Controllers\Api\ChecklistController;
use App\Http\Controllers\Api\ChecklistTaskController;
use App\Http\Controllers\Api\CompetenceCourseController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\ApiCategoryController;
use App\Http\Controllers\TaskCheckListAnswerController;
use App\Http\Controllers\UserChecklistController;
use App\Http\Controllers\Api\EquipmentCategoryController;
use App\Http\Controllers\Api\StorageLocationController;
use App\Http\Controllers\Api\CustomerSupplierController;
use App\Http\Controllers\Api\TaskCommentController;
use Illuminate\Http\Request;

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
Route::get('/equipments/{tool_id}', [EquipmentController::class, 'getDetails'])->name('equipments.getDetails');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/users/status/{id}', [UserController::class, 'updateStatus'])->name('users.status');
    Route::get('/users/stats', [UserController::class, 'usersStats'])->name('users.stats');
    Route::post('/projects/documents/upload/{project}', [ProjectController::class, 'uploadDocuments'])->name('projects.upload.documents');
    Route::get('/competences/{competence}/download', [CompetenceController::class, 'downloadFiles'])->name('competences.download');
    Route::get('/dashboard/statistics', [DashboardController::class, 'statistics'])->name('dashboard.statistics');
    Route::get('/absences/statistics', [AbsenceController::class, 'absenceStatistics'])->name('absences.statistics');
    Route::post('/absences/status/{absence}', [AbsenceController::class, 'absenceStatusUpdate'])->name('absences.status');
    Route::post('/vacations/status/{vacation}', [VacationController::class, 'vacationStatusUpdate'])->name('vacations.status');
    Route::get('/vacations/statistics', [VacationController::class, 'vacationStatistics'])->name('vacations.statistics');

    Route::get('/subcategories', [CategoryController::class, 'fetchSubCategories'])->name('subcategories');
    Route::get('/avvikruh/statistics', [AvvikListingsController::class, 'avvikStatistics'])->name('avvikruh.statistics');


    Route::post('/handbook/chapter/{handbookId}', [HandbookController::class, 'createHandbookChapter'])->name('handbook.store.chapter');
    Route::get('/handbook/chapters', [HandbookController::class, 'getHandbookChapters'])->name('handbook.get.chapter');
    // update
    Route::put('/handbook/chapter/{chapterId}', [HandbookController::class, 'updateHandbookChapter'])->name('handbook.update.chapter');

    Route::apiResources([
        'users' => UserController::class,
        'roles' => RolesController::class,
        'permissions' => PermissionsController::class,
        'projects' => ProjectController::class,
        'equipments' => EquipmentController::class,
        'competences' => CompetenceController::class,
        'competence-categories' => CompetenceCategoryController::class,
        'lendings' => LendingController::class,
        'boardinformation' => BoardInformationController::class,
        'absences' => AbsenceController::class,
        'vacations' => VacationController::class,
        'absence-types' => AbsenceTypeController::class,
        'ruh-types' => RuhTypeController::class,
        'avvikruh' => AvvikListingsController::class,
        'competence-courses' => CompetenceCourseController::class,
        'settings' => SettingsController::class,
        'categories' => CategoryController::class,
        'api-categories' => ApiCategoryController::class,
        'documents' => DocumentController::class,
        'handbooks' => HandbookController::class,
        'chapters' => ChapterController::class,
        'tags' => TagController::class,
        'equipment-categories' => EquipmentCategoryController::class,
        'storage-locations' => StorageLocationController::class,
        'customers-suppliers' => CustomerSupplierController::class,
        'task-comments' => TaskCommentController::class,
    ]);

    Route::delete('/customer-supplier-documents/{id}', [CustomerSupplierController::class, 'deleteDocument'])->name('customer-supplier-documents.destroy');

    // Route::get('/documents', [DocumentController::class, 'getDocuments'])->name('documents');
    // Route::post('/documents/store', [DocumentController::class, 'storeDocument'])->name('documents.store');
    // Route::post('/documents/update/{id}', [DocumentController::class, 'updateDocument'])->name('documents.update');
    // Route::delete('/documents/destroy/{id}', [DocumentController::class, 'deleteDocument'])->name('documents.update');
    Route::get('/tasks/{taskId}/comments', [TaskCommentController::class, 'index'])->name('task-comments.index');
    Route::get('/search-documents', [DocumentController::class, 'search'])->name('documents.search');
    Route::post('/lendings/return', [LendingController::class, 'returnEquipment'])->name('lendings.returnEquipment');


    Route::get('/account', [AccountController::class, 'account'])->name('account');
    Route::put('/account/password', [AccountController::class, 'updateAccountPassword'])->name('account.password');
    Route::put('/account/general', [AccountController::class, 'updateAccountGeneral'])->name('account.general');

    Route::post('checklist', [ChecklistController::class, 'store'])->name('checklist.store');
    Route::get('checklist', [ChecklistController::class, 'index'])->name('checklist.index');
    Route::get('checklist/{checklist}', [ChecklistController::class, 'show'])->name('checklist.show');
    Route::delete('checklist/{checklist}', [ChecklistController::class, 'destroy'])->name('checklist.destroy');
    Route::put('checklist/{checklist}', [ChecklistController::class, 'update'])->name('checklist.update');
    Route::post('user-checklist', [UserChecklistController::class, 'store'])->name('user-checklist.store');
    Route::get('user-checklist/{checklist}', [UserChecklistController::class, 'index'])->name('user-checklist.index');
    Route::get('user-checklist/{userChecklist}', [UserChecklistController::class, 'show'])->name('user-checklist.show');
    Route::delete('user-checklist/{userChecklist}', [UserChecklistController::class, 'destroy'])->name('user-checklist.destroy');
    Route::post('user-checklist/{userChecklist}', [UserChecklistController::class, 'update'])->name('user-checklist.update');
    Route::get('user-checklist-start/{userChecklist}', [UserChecklistController::class, 'start'])->name('user-checklist.start');

    Route::apiResource('task', TaskController::class);
    Route::put('task-update-status/{id}', [TaskController::class, 'updateStatus'])->name('task.update.status');
    // get read and unread notifications
    Route::get('/unread-notifications', [UserController::class, 'unreadNotifications'])->name('unread.notifications');
    Route::get('/read-notifications', [UserController::class, 'readNotifications'])->name('read.notifications');
    Route::get('/notifications-read', [UserController::class, 'markAllAsReadNotifications'])->name('markAllAsRead.notifications');


    Route::post('task-answer', [TaskCheckListAnswerController::class, 'store'])->name('task-answer.store');
});
