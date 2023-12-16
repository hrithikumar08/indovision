<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use Illuminate\Support\Facades\Log;

class DocumentController extends Controller
{
    public function upload(Request $request)
    {
        try {
            // Log::info('received in the controller', ['request' => $request->all()]);

            $request->validate([
                'document' => 'required|mimes:pdf,docx|max:10240',
            ]);

            // $fileContent = file_get_contents($request->file('document')->getRealPath());
            $fileContent = file_get_contents($request->file('document')->getRealPath(), FILE_BINARY);

            // Log::info('Content:', ['content' => $fileContent]);

            $path = $request->file('document')->store('public/uploads');

            // Save to the database
            $document = new Document();
            $document->name = $request->file('document')->getClientOriginalName();
            $document->path = $path;
            $document->content = $fileContent;
            $document->save();

            return response()->json([
                'message' => 'File Uploaded Successfully',
                'document' => $document,
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index()
    {
        $documents = Document::all(['id', 'name', 'content', 'path']);

        return response()->json($documents);
    }
}