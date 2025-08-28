import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import PDFWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// 设置PDF.js worker - 使用Vite的资源处理
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFWorker;

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
  onTextExtracted: (text: string) => void;
  onClear: () => void;
  title: string;
  currentFile?: File | null;
  isLoading?: boolean;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({
  onFileSelect,
  onTextExtracted,
  onClear,
  title,
  currentFile,
  isLoading = false
}) => {
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('请选择PDF文件');
      return;
    }

    onFileSelect(file);

    try {
      // 使用PDF.js读取PDF文件
      const arrayBuffer = await file.arrayBuffer();
      
      // 使用PDF.js解析PDF
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      // 逐页提取文本
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }
      
      onTextExtracted(fullText.trim());
    } catch (error) {
      console.error('PDF解析失败:', error);
      alert('PDF文件解析失败，请确保文件格式正确且未加密');
    }
  }, [onFileSelect, onTextExtracted]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file && file.type === 'application/pdf') {
      const fakeEvent = {
        target: { files: [file] }
      } as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(fakeEvent);
    } else {
      alert('请拖拽PDF文件');
    }
  }, [handleFileChange]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FileText size={20} className={title.includes('原始') ? 'text-blue-600' : 'text-green-600'} />
          {title}
        </h3>
        {currentFile && (
          <button
            onClick={onClear}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="清除文件"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {!currentFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id={`pdf-upload-${title}`}
          />
          <label htmlFor={`pdf-upload-${title}`} className="cursor-pointer">
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium text-gray-600 mb-2">
              点击上传或拖拽PDF文件
            </p>
            <p className="text-sm text-gray-500">
              支持PDF格式，文件大小不超过10MB
            </p>
          </label>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="text-red-600" size={24} />
            <div className="flex-1">
              <p className="font-medium text-gray-800">{currentFile.name}</p>
              <p className="text-sm text-gray-500">
                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {isLoading && (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;