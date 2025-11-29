import React, { useState, useRef } from 'react';

interface ImageToPromptEditorProps {
  isApiKeyReady: boolean;
  openSettings: () => void;
}

const ImageToPromptEditor: React.FC<ImageToPromptEditorProps> = ({ isApiKeyReady, openSettings }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!isApiKeyReady) {
      openSettings();
      return;
    }

    if (!selectedImage) {
      return;
    }

    setIsAnalyzing(true);
    try {
      // TODO: Implement actual image analysis using Gemini Vision API
      // Placeholder for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedPrompt('이미지 분석 결과가 여기에 표시됩니다...');
      console.log('Analyzing image...');
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            이미지 업로드
          </label>
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              이미지 선택
            </button>
            {selectedImage && (
              <span className="text-sm text-gray-400">이미지가 선택되었습니다</span>
            )}
          </div>
        </div>

        {selectedImage && (
          <div className="bg-gray-700 rounded-lg p-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-96 mx-auto rounded-lg"
            />
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !selectedImage}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {isAnalyzing ? '분석 중...' : '이미지 분석'}
        </button>

        {!isApiKeyReady && (
          <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4">
            <p className="text-yellow-200 text-sm">
              API 키가 설정되지 않았습니다.{' '}
              <button
                onClick={openSettings}
                className="underline hover:text-yellow-100"
              >
                설정에서 API 키를 입력
              </button>
              해주세요.
            </p>
          </div>
        )}

        {generatedPrompt && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-white mb-3">생성된 프롬프트</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-200 whitespace-pre-wrap">{generatedPrompt}</p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(generatedPrompt)}
              className="mt-3 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              클립보드에 복사
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToPromptEditor;
