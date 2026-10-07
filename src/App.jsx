import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const slides = [
  {
    id: 'capa', image: '/slides/01-capa.png', label: 'Abertura', hint: 'Clique ou arraste para avançar',
    hotspots: [
      { x: 78, y: 86, w: 18, h: 10, label: 'Avançar', action: { type: 'next' } },
      { x: 57, y: 26, w: 13, h: 12, label: 'Oportunidades', detail: { title: 'Mais oportunidades', text: 'Transformar relacionamento em negócio com estrutura comercial e suporte.' } },
      { x: 71, y: 17, w: 14, h: 12, label: 'Relacionamentos', detail: { title: 'Relacionamentos que geram valor', text: 'Você traz a rede. A Vibra entra com método, operação e suporte.' } },
      { x: 86, y: 6, w: 12, h: 11, label: 'Crescimento', detail: { title: 'Crescimento contínuo', text: 'Da indicação à operação própria: o parceiro evolui por etapas.' } },
    ]
  },
  {
    id: 'conceito', image: '/slides/02-conceito.png', label: 'Conceito', hint: 'Clique nos pilares',
    hotspots: [
      { x: 4, y: 64, w: 29, h: 13, label: 'Estrutura', detail: { title: 'Estrutura', text: 'Plataformas, administradoras, processos e suporte operacional.' } },
      { x: 34, y: 64, w: 28, h: 13, label: 'Geração de negócios', detail: { title: 'Geração de negócios', text: 'Acesso à estrutura de tráfego da Vibra, conforme estratégia e investimento.' } },
      { x: 4, y: 77, w: 29, h: 11, label: 'Desenvolvimento', detail: { title: 'Desenvolvimento', text: 'Treinamento em abordagem, qualificação, follow-up, reunião e fechamento.' } },
      { x: 34, y: 77, w: 28, h: 11, label: 'Acompanhamento', detail: { title: 'Acompanhamento', text: 'Apoio nas primeiras vendas e reuniões até ganhar autonomia.' } },
      { x: 72, y: 89, w: 23, h: 8, label: 'Explorar modelos', action: { type: 'goto', slide: 2 } },
    ]
  },
  {
    id: 'modelos', image: '/slides/03-modelos.png', label: '3 modelos', hint: 'Clique em um modelo',
    hotspots: [
      { x: 4, y: 33, w: 30, h: 56, label: 'Parceiro Indicador', action: { type: 'goto', slide: 3 } },
      { x: 35, y: 33, w: 30, h: 56, label: 'Parceiro Vibra / Sublink', action: { type: 'goto', slide: 4 } },
      { x: 66, y: 33, w: 30, h: 56, label: 'Credenciamento Direto', action: { type: 'goto', slide: 5 } },
    ]
  },
  {
    id: 'indicador', image: '/slides/04-indicador.png', label: 'Indicador', hint: 'Clique nas etapas do fluxo',
    hotspots: [
      { x: 31, y: 47, w: 9, h: 22, label: '1', detail: { title: '1. Identificação', text: 'O parceiro identifica uma oportunidade na própria rede.' } },
      { x: 41, y: 47, w: 9, h: 22, label: '2', detail: { title: '2. Indicação', text: 'A indicação é enviada para a Vibra.' } },
      { x: 52, y: 47, w: 10, h: 22, label: '3', detail: { title: '3. Cotação e atendimento', text: 'A Vibra faz a cotação e conduz o atendimento.' } },
      { x: 63, y: 47, w: 10, h: 22, label: '4', detail: { title: '4. Reunião', text: 'Havendo interesse, a Vibra conduz a reunião.' } },
      { x: 75, y: 47, w: 9, h: 22, label: '5', detail: { title: '5. Venda', text: 'A Vibra realiza o fechamento.' } },
      { x: 86, y: 47, w: 9, h: 22, label: '6', detail: { title: '6. Comissão', text: 'O parceiro recebe conforme as regras da parceria e o repasse da administradora.' } },
      { x: 79, y: 89, w: 18, h: 9, label: 'Próximo nível', action: { type: 'goto', slide: 4 } },
    ]
  },
  {
    id: 'sublink', image: '/slides/05-sublink.png', label: 'Sublink', hint: 'Clique nos suportes',
    hotspots: [
      { x: 5, y: 60, w: 17, h: 8, label: 'Treinamento', detail: { title: 'Treinamento', text: 'Produto, processo e postura comercial.' } },
      { x: 23, y: 60, w: 17, h: 8, label: 'Orientação', detail: { title: 'Orientação comercial', text: 'Abordagem, prospecção e condução de oportunidades.' } },
      { x: 41, y: 60, w: 17, h: 8, label: 'Primeiras vendas', detail: { title: 'Primeiras vendas', text: 'Acompanhamento até o parceiro ganhar segurança e autonomia.' } },
      { x: 59, y: 60, w: 17, h: 8, label: 'Reuniões', detail: { title: 'Primeiras reuniões', text: 'Apoio nas primeiras reuniões, quando necessário.' } },
      { x: 76, y: 60, w: 19, h: 8, label: 'Videoconferência', detail: { title: 'Videoconferências', text: 'Participação conjunta para acelerar o aprendizado.' } },
      { x: 80, y: 87, w: 17, h: 10, label: 'Modelo avançado', action: { type: 'goto', slide: 5 } },
    ]
  },
  {
    id: 'direto', image: '/slides/06-direto.png', label: 'Direto', hint: 'Clique nas áreas para detalhar',
    hotspots: [
      { x: 4, y: 44, w: 31, h: 40, label: 'Perfil', detail: { title: 'Perfil ideal', text: 'Para quem já tem experiência, carteira, estrutura e atuação profissional.' } },
      { x: 36, y: 44, w: 36, h: 24, label: 'Administradoras', detail: { title: 'Administradoras', text: 'Magalu, KSK Consórcio, Itaú, Embracon e Volkswagen, conforme critérios de cada administradora.' } },
      { x: 36, y: 69, w: 43, h: 18, label: 'Suporte', detail: { title: 'Suporte mesmo com autonomia', text: 'Treinamento, orientação inicial, apoio estratégico e suporte nas primeiras vendas.' } },
      { x: 83, y: 88, w: 14, h: 10, label: 'Estrutura completa', action: { type: 'goto', slide: 6 } },
    ]
  },
  {
    id: 'estrutura', image: '/slides/07-estrutura.png', label: 'Estrutura Vibra', hint: 'Clique nos 4 blocos',
    hotspots: [
      { x: 3, y: 41, w: 23, h: 33, label: 'Geração de Leads', detail: { title: 'Geração de leads', text: 'Você define o investimento. A Vibra direciona a captação e encaminha os leads.' } },
      { x: 27, y: 41, w: 23, h: 33, label: 'Treinamento e SDR', detail: { title: 'Treinamento comercial e SDR', text: 'Abordagem, qualificação, follow-up, reunião e fechamento.' } },
      { x: 51, y: 41, w: 23, h: 33, label: 'Acompanhamento', detail: { title: 'Acompanhamento nas primeiras reuniões', text: 'A Vibra participa quando necessário para acelerar prática e autonomia.' } },
      { x: 74, y: 41, w: 23, h: 33, label: 'Pós-venda', detail: { title: 'Suporte operacional e pós-venda', text: 'Contratos, plataformas, boletos, lances, contemplação e pós-venda.' } },
      { x: 78, y: 88, w: 19, h: 9, label: 'Método Vibra', action: { type: 'goto', slide: 7 } },
    ]
  },
  {
    id: 'metodo', image: '/slides/08-metodo.png', label: 'Método + evolução', hint: 'Clique na jornada ou reinicie',
    hotspots: [
      { x: 3, y: 28, w: 90, h: 17, label: 'Método Vibra', detail: { title: 'Do lead ao pós-venda', text: 'Captação → Prospecção → Qualificação → Agendamento → Videoconferência → Apresentação → Fechamento → Contrato → Pós-venda → Lance/Contemplação → Novas oportunidades.' } },
      { x: 3, y: 51, w: 90, h: 16, label: 'Evolução', detail: { title: 'Evolução do parceiro', text: 'Indicador → Parceiro Vibra / Sublink → Credenciamento Direto → Estruturação e escala.' } },
      { x: 81, y: 85, w: 17, h: 11, label: 'Reiniciar', action: { type: 'goto', slide: 0 } },
    ]
  },
];

function App() {
  const [index, setIndex] = useState(0);
  const [detail, setDetail] = useState(null);
  const [flash, setFlash] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [intro, setIntro] = useState(true);
  const touch = useRef({ x: 0, y: 0 });
  const slide = slides[index];

  const go = useCallback((next) => {
    const safe = Math.max(0, Math.min(slides.length - 1, next));
    if (safe === index) return;
    setFlash(true);
    setDetail(null);
    setTimeout(() => setIndex(safe), 110);
    setTimeout(() => setFlash(false), 420);
  }, [index]);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') next();
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
      if (e.key === 'Escape') { setDetail(null); setShowMap(false); }
      if (e.key.toLowerCase() === 'm') setShowMap(v => !v);
      if (e.key.toLowerCase() === 'f') document.documentElement.requestFullscreen?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index]);

  function runHotspot(h) {
    if (h.detail) setDetail(h.detail);
    if (h.action?.type === 'next') next();
    if (h.action?.type === 'goto') go(h.action.slide);
  }

  function onPointerDown(e) { touch.current = { x: e.clientX, y: e.clientY }; }
  function onPointerUp(e) {
    const dx = e.clientX - touch.current.x;
    const dy = e.clientY - touch.current.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : prev();
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  }

  return (
    <main className="deck" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
      <div className={`slide-stage ${flash ? 'flash' : ''}`}>
        <img key={slide.id} className="slide-image" src={slide.image} alt={`Slide ${index + 1}: ${slide.label}`} draggable="false" />
        <div key={`anim-${slide.id}`} className="slide-wash" />

        {slide.patches?.map((p, i) => (
          <div key={`patch-${i}`} className={`slide-patch ${p.type || ''}`} style={{ left:`${p.x}%`, top:`${p.y}%`, width:`${p.w}%`, height:`${p.h}%` }}>
            <strong>{p.title}</strong><small>{p.subtitle}</small>
          </div>
        ))}

        <div className="hotspots" aria-label="Áreas interativas do slide">
          {slide.hotspots.map((h, i) => (
            <button
              key={`${slide.id}-${i}`}
              className="hotspot"
              style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${h.w}%`, height: `${h.h}%`, '--delay': `${i * .18}s` }}
              onClick={(e) => { e.stopPropagation(); runHotspot(h); }}
              aria-label={h.label}
            >
              <span className="hotspot-ring" />
              <span className="hotspot-tip">{h.label}</span>
            </button>
          ))}
        </div>

        <button className="edge-nav edge-left" onClick={prev} disabled={index === 0} aria-label="Slide anterior">‹</button>
        <button className="edge-nav edge-right" onClick={next} disabled={index === slides.length - 1} aria-label="Próximo slide">›</button>

        <div className="top-tools">
          <button onClick={() => setShowMap(true)} title="Mapa dos slides">☰</button>
          <button onClick={toggleFullscreen} title="Tela cheia">⛶</button>
        </div>

        <div className="hint-pill"><span className="blink-dot" />{slide.hint}</div>
        <div className="counter"><b>{String(index + 1).padStart(2,'0')}</b><span>/ {String(slides.length).padStart(2,'0')}</span></div>

        <div className="progress"><span style={{ width: `${progress}%` }} /></div>
      </div>

      {detail && (
        <div className="detail-backdrop" onClick={() => setDetail(null)}>
          <aside className="detail-panel" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setDetail(null)}>×</button>
            <div className="detail-kicker">VIBRA SOLUÇÕES</div>
            <h2>{detail.title}</h2>
            <p>{detail.text}</p>
            <div className="detail-line" />
            <button className="detail-next" onClick={() => { setDetail(null); next(); }}>Continuar apresentação <span>→</span></button>
          </aside>
        </div>
      )}

      {showMap && (
        <div className="map-backdrop" onClick={() => setShowMap(false)}>
          <section className="slide-map" onClick={e => e.stopPropagation()}>
            <div className="map-head"><div><small>PROGRAMA DE PARCEIROS</small><h3>Navegue pela apresentação</h3></div><button onClick={() => setShowMap(false)}>×</button></div>
            <div className="map-grid">
              {slides.map((s, i) => (
                <button key={s.id} className={i === index ? 'active' : ''} onClick={() => { setShowMap(false); go(i); }}>
                  <img src={s.image} alt="" /><span>{String(i+1).padStart(2,'0')} · {s.label}</span>
                </button>
              ))}
            </div>
            <footer>Setas ← → para navegar · M abre este mapa · F ativa tela cheia · ESC fecha painéis</footer>
          </section>
        </div>
      )}

      {intro && (
        <div className="intro-splash">
          <img src="/vibra-logo.png" alt="Vibra Soluções" />
          <span>PROGRAMA DE PARCEIROS</span>
          <div className="intro-bar"><i /></div>
        </div>
      )}
    </main>
  );
}

export default App;
