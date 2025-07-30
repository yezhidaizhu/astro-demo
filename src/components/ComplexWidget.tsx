// src/components/ComplexWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface ComplexWidgetProps {
  userName: string;
  initialCount?: number;
  children?: React.ReactNode;
}

export default function ComplexWidget({ userName, initialCount = 0, children }: ComplexWidgetProps) {
  const { t } = useTranslation(['widget', 'common']);
  const [count, setCount] = useState(initialCount);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(`Component mounted with userName: ${userName}`);
  }, [userName]);

  return (
    <div style={{ border: '2px solid #888', padding: '1rem', borderRadius: '8px' }}>
      <h2>{t('widget:title')}</h2>
      <p>{t('widget:greeting', { user: userName })}</p>

      <div>
        <label>
          {t('common:input_label')}:
          <input ref={inputRef} type="text" className="border ml-2 p-1" />
        </label>
        <button
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => alert(inputRef.current?.value)}
        >
          {t('common:submit')}
        </button>
      </div>

      <div className="mt-4">
        <button onClick={() => setCount((c) => c + 1)} className="bg-green-600 text-white px-2 py-1 rounded">
          {t('common:increment')} ({count})
        </button>
      </div>

      <div className="mt-4 bg-gray-100 p-2 rounded">
        <strong>{t('common:children_slot')}:</strong>
        <div>{children}</div>
      </div>
    </div>
  );
}
