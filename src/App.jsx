import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const slides = {
  programa: '/slides/01-programa.png',
  conceito: '/slides/02-conceito.png',
  modelos: '/slides/03-modelos.png',
  indicador: '/slides/04-indicador.png',
  sublink: '/slides/05-sublink.png',
  direto: '/slides/06-direto.png',
  estrutura: '/slides/07-estrutura.png',
  porque: '/slides/08-porque.png',
};

const routes = {
  base: ['programa', 'conceito', 'modelos'],
  indicador: ['programa', 'conceito', 'modelos', 'indicador', 'estrutura', 'porque'],
  sublink: ['programa', 'conceito', 'modelos', 'sublink', 'estrutura', 'porque'],
  direto: ['programa', 'conceito', 'modelos', 'direto', 'estrutura', 'porque'],
};

const modelHotspots = [
  { key: 'indicador', left: 2.5, top: 39, width: 31, height: 53 },
  { key: 'sublink', left: 34.5, top: 39, width: 31, height: 53 },
  { key: 'direto', left: 66.5, top: 39, width: 31, height: 53 },
];

export default function App() {
  const [routeKey, setRouteKey] = useState('base');
  const [position, setPosition] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, y: 0, t: 0 });

  const route = routes[routeKey];
  const currentKey = route[position];
  const currentSrc = slides[currentKey];

  const go = useCallback((nextPosition) => {
    const safe = Math.max(0, Math.min(route.length - 1, nextPosition));
    setPosition(safe);
  }, [route.length]);

  const next = useCallback(() => go(position + 1), [go, position]);
  const prev = useCallback(() => go(position - 1), [go, position]);

  const chooseModel = useCallback((key) => {
    setRouteKey(key);
    setPosition(3);
  }, []);

  const backToModels = useCallback(() => {
    setRouteKey('base');
    setPosition(2);
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        next();
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        prev();
      }
      if (event.key === 'Escape' || event.key === 'Home') {
        event.preventDefault();
        backToModels();
      }
      if (event.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
        else document.exitFullscreen?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, backToModels]);

  const pointerDown = (event) => {
    if (event.target.closest('button')) return;
    drag.current = { x: event.clientX, y: event.clientY, t: performance.now() };
    setDragging(true);
  };

  const pointerMove = (event) => {
    if (!dragging) return;
    const dx = event.clientX - drag.current.x;
    setDragX(Math.max(-170, Math.min(170, dx)));
  };

  const pointerUp = (event) => {
    if (!dragging) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    const elapsed = Math.max(1, performance.now() - drag.current.t);
    const velocity = dx / elapsed;
    setDragging(false);
    setDragX(0);
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    } else if (Math.abs(velocity) > 0.6 && Math.abs(dx) > Math.abs(dy)) {
      velocity < 0 ? next() : prev();
    }
  };

  const atModels = currentKey === 'modelos';
  const modelSelected = routeKey !== 'base';

  return (
    <main
      className={`app ${dragging ? 'dragging' : ''}`}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
      onDoubleClick={() => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      }}
    >
      <section className="stage" aria-label="Apresentação Programa de Parceiros Vibra Soluções">
        <div
          className="slide-track"
          style={{ transform: `translate3d(${dragX}px,0,0) scale(${dragging ? 0.997 : 1})` }}
        >
          <img key={currentSrc} className="slide-image" src={currentSrc} alt="" draggable="false" />
        </div>

        {atModels && (
          <div className="hotspot-layer" aria-label="Modelos de parceria">
            {modelHotspots.map((spot) => (
              <button
                key={spot.key}
                className="model-hotspot"
                style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.width}%`, height: `${spot.height}%` }}
                onClick={() => chooseModel(spot.key)}
                aria-label={spot.key === 'indicador' ? 'Parceiro Indicador' : spot.key === 'sublink' ? 'Parceiro Vibra Sublink' : 'Credenciamento Direto'}
              />
            ))}
          </div>
        )}

        {modelSelected && (
          <button className="logo-home" onClick={backToModels} aria-label="Voltar aos modelos" />
        )}

        <button className="edge-zone left" onClick={prev} disabled={position === 0} aria-label="Anterior" />
        <button className="edge-zone right" onClick={next} disabled={position === route.length - 1} aria-label="Próximo" />
      </section>
    </main>
  );
}
