import React, { useState } from 'react';

interface PromptEditorProps {
  isApiKeyReady: boolean;
  openSettings: () => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ isApiKeyReady, openSettings }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!isApiKeyReady) {
      openSettings();
      return;
    }

    setIsGenerating(true);
    try {
      // TODO: Implement actual image generation using Gemini API
      // Placeholder for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Generating image with prompt:', prompt);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            이미지 프롬프트 입력
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-40 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder="생성하고 싶은 이미지를 설명해주세요..."
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {isGenerating ? '생성 중...' : '이미지 생성'}
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

        {generatedImage && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-white mb-3">생성된 이미지</h3>
            <div className="bg-gray-700 rounded-lg p-4">
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptEditor;
