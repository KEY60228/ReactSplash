<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePhoto;
use App\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
  public function __construct()
  {
    // 認証が必要
    $this->middleware('auth')->except(['index', 'download']);
  }

  /**
   * 写真投稿
   * @param StorePhoto $request
   * @return \Illuminate\Http\Response
   */
  public function create(StorePhoto $request)
  {
    // 投稿写真の拡張子を取得する
    $extension = $request->photo->extension();
    
    $photo = new Photo();
    
    // インスタンス生成時に割り振られたランダムなID値と
    // 本来の拡張子を組み合わせてファイル名とする
    $photo->filename = $photo->id . '.' . $extension;
    
    // ファイルを保存する
    Storage::putFileAs('', $request->photo, $photo->filename);
    
    // データベースエラー時にファイル削除を行うため、トランザクションを利用する
    DB::beginTransaction();

    try {
      Auth::user()->photos()->save($photo);
      DB::commit();
    } catch (\Exception $exception) {
      DB::rollback();

      // DBとの不整合を避けるためアップロードしたファイルを削除
      Storage::delete($photo->filename);
      throw $exception;
    }

    // リソースの新規作成のため、レスポンスコードは201(CREATED)を返却
    return response($photo, 201);
  }

  /**
   * 写真一覧
   */
  public function index()
  {
    $photos = Photo::with(['owner'])->orderBy(Photo::CREATED_AT, 'desc')->paginate();

    return $photos;
  }

  /**
   * 写真のダウンロード
   * @param Photo $photo
   * @return \Illuminate\Http\Response
   */
  public function download(Photo $photo)
  {
    // 写真の存在チェック
    if (! Storage::exists($photo->filename)) {
      abort(404);
    }

    $disposition = 'attachment; filename="' . $photo->filename . '"';
    $headers = [
      'Content-Type' => 'appilication/octet-stream',
      'Content-Disposition' => $disposition,
    ];

    return response(Storage::get($photo->filename), 200, $headers);
  }
}
