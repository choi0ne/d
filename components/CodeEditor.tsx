import React, { useState } from 'react';

interface CodeEditorProps {
  isApiKeyReady: boolean;
  openSettings: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ isApiKeyReady, openSettings }) => {
  const [code, setCode] = useState('{\n  "prompt": "",\n  "aspectRatio": "1:1",\n  "numberOfImages": 1\n}');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!isApiKeyReady) {
      openSettings();
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const config = JSON.parse(code);
      // TODO: Implement actual image generation using Gemini API
      // Placeholder for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Generating images with config:', config);
    } catch (err) {
      setError(err instanceof Error ? err.message : '코드를 파싱할 수 없습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            JSON 설정 입력
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-mono text-sm"
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-3">
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !code.trim()}
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

        {generatedImages.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-white mb-3">생성된 이미지</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedImages.map((img, idx) => (
                <div key={idx} className="bg-gray-700 rounded-lg p-4">
                  <img
                    src={img}
                    alt={`Generated ${idx + 1}`}
                    className="w-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
