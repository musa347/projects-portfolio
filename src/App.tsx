import { useState } from 'react';
import { OSProvider } from './contexts/OSContext';
import OSShell from './components/os/OSShell';
import BootScreen from './components/os/BootScreen';

function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <OSProvider>
      {bootComplete ? (
        <OSShell />
      ) : (
        <BootScreen onComplete={() => setBootComplete(true)} />
      )}
    </OSProvider>
  );
}

export default App;