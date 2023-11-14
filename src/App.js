import React, { useState, useEffect } from 'react';
import './App.css'; // Stil dosyanızı içe aktarın

const DrumMachine = () => {
  // Davul pedleri ve ilgili ses dosyaları ve görüntü isimleri ile tanımlayın
  const drumPads = [
    { id: 'Q', key: 'Q', src: 'path/to/heater-1.mp3', name: 'Heater 1' },
    // Diğer davul pedlerini buraya ilgili bilgilerle ekleyin
  ];

  const [displayText, setDisplayText] = useState('');

  // Davul pedlerine tıklama olaylarını işleyin
  const handleClick = (pad) => {
    playAudio(pad);
  };

  // Davul pedleri için keydown olaylarını işleyin
  const handleKeyDown = (event) => {
    const pad = drumPads.find((drumPad) => drumPad.key === event.key.toUpperCase());
    if (pad) {
      playAudio(pad);
    }
  };

  // Bir davul pedi ile ilişkilendirilmiş sesi çalın
  const playAudio = (pad) => {
    const audio = document.getElementById(pad.key);
    if (audio) {
      audio.currentTime = 0; // Sesin başından çalmak için sesi sıfırla
      audio.play().catch((err) => console.error(err));
      setDisplayText(pad.name);
    } else {
      console.error('Audio element not found:', pad.key);
    }
  };

  // keydown olayları için olay dinleyicileri ekleyin
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{displayText}</div>
      <div className="drum-pads">
        {drumPads.map((pad) => (
          <div
            key={pad.id}
            className="drum-pad"
            id={pad.id}
            onClick={() => handleClick(pad)}
          >
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src}></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
