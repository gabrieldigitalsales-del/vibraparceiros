import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const slides = [
  {
    id: 'capa', image: '/slides/01-capa.png', label: 'Abertura', hint: 'Clique ou arraste para avançar',
    hotspots: [
      { x: 78, y: 86, w: 18, h: 10, label: 'Avançar', action: { type: 'next' } },
      { x: 57, y: 26, w: 13, h: 12, label: 'Oportunidades', detail: { title: 'Mais oportunidades', text: 'A parceria foi desenhada para transformar relacionamento em geração de negócio, com suporte e estrutura comercial.' } },
      { x: 71, y: 17, w: 14, h: 12, label: 'Relacionamentos', detail: { title: 'Relacionamentos que geram valor', text: 'O parceiro entra com sua rede. A Vibra entra com operação, método, treinamento e acompanhamento.' } },
      { x: 86, y: 6, w: 12, h: 11, label: 'Crescimento', detail: { title: 'Crescimento contínuo', text: 'O programa foi pensado para levar o parceiro da indicação à construção de uma operação própria.' } },
    ]
  },
  {
    id: 'conceito', image: '/slides/02-conceito.png', label: 'Conceito', hint: 'Clique nos pilares',
    hotspots: [
      { x: 4, y: 64, w: 29, h: 13, label: 'Estrutura', detail: { title: 'Estrutura', text: 'Plataformas, administradoras, processos e suporte operacional para o parceiro não começar sozinho.' } },
      { x: 34, y: 64, w: 28, h: 13, label: 'Geração de negócios', detail: { title: 'Geração de negócios', text: 'Possibilidade de utilizar a estrutura de tráfego da Vibra para gerar oportunidades conforme estratégia e investimento.' } },
      { x: 4, y: 77, w: 29, h: 11, label: 'Desenvolvimento', detail: { title: 'Desenvolvimento', text: 'Treinamento comercial, SDR, abordagem, qualificação, reunião, follow-up e fechamento.' } },
      { x: 34, y: 77, w: 28, h: 11, label: 'Acompanhamento', detail: { title: 'Acompanhamento', text: 'Apoio nas primeiras vendas, reuniões, operação e pós-venda até o parceiro ganhar autonomia.' } },
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
      { x: 31, y: 47, w: 9, h: 22, label: '1', detail: { title: '1. Identificação', text: 'O parceiro identifica uma oportunidade dentro da própria rede de contatos ou carteira de clientes.' } },
      { x: 41, y: 47, w: 9, h: 22, label: '2', detail: { title: '2. Indicação', text: 'O contato é encaminhado para a Vibra com contexto suficiente para iniciar o atendimento.' } },
      { x: 52, y: 47, w: 10, h: 22, label: '3', detail: { title: '3. Cotação e atendimento', text: 'A Vibra assume a análise inicial, apresenta cenários e conduz o primeiro atendimento.' } },
      { x: 63, y: 47, w: 10, h: 22, label: '4', detail: { title: '4. Reunião', text: 'Havendo interesse, a Vibra agenda e conduz a reunião comercial.' } },
      { x: 75, y: 47, w: 9, h: 22, label: '5', detail: { title: '5. Venda', text: 'A Vibra conduz o fechamento dentro das regras e critérios aplicáveis.' } },
      { x: 86, y: 47, w: 9, h: 22, label: '6', detail: { title: '6. Comissão', text: 'O parceiro recebe conforme as regras da parceria e o efetivo recebimento da comissão pela administradora.' } },
      { x: 79, y: 89, w: 18, h: 9, label: 'Próximo nível', action: { type: 'goto', slide: 4 } },
    ]
  },
  {
    id: 'sublink', image: '/slides/05-sublink.png', label: 'Sublink', hint: 'Clique nos suportes',
    hotspots: [
      { x: 5, y: 60, w: 17, h: 8, label: 'Treinamento', detail: { title: 'Treinamento', text: 'Integração comercial, produto, postura de atendimento e domínio do processo.' } },
      { x: 23, y: 60, w: 17, h: 8, label: 'Orientação', detail: { title: 'Orientação comercial', text: 'Apoio para estruturar abordagem, rotina de prospecção e condução de oportunidades.' } },
      { x: 41, y: 60, w: 17, h: 8, label: 'Primeiras vendas', detail: { title: 'Primeiras vendas', text: 'A Vibra acompanha o parceiro até que ele desenvolva segurança para conduzir sozinho.' } },
      { x: 59, y: 60, w: 17, h: 8, label: 'Reuniões', detail: { title: 'Primeiras reuniões', text: 'Apoio prático em reuniões e videoconferências quando necessário.' } },
      { x: 76, y: 60, w: 19, h: 8, label: 'Videoconferência', detail: { title: 'Videoconferências', text: 'Participação conjunta para acelerar o aprendizado e manter padrão comercial.' } },
      { x: 80, y: 87, w: 17, h: 10, label: 'Modelo avançado', action: { type: 'goto', slide: 5 } },
    ]
  },
  {
    id: 'direto', image: '/slides/06-direto.png', label: 'Direto', hint: 'Clique nas áreas para detalhar',
    hotspots: [
      { x: 4, y: 44, w: 31, h: 40, label: 'Perfil', detail: { title: 'Perfil ideal', text: 'Parceiro com experiência, carteira, estrutura própria, CNPJ adequado e intenção de atuar profissionalmente no mercado.' } },
      { x: 36, y: 44, w: 36, h: 24, label: 'Administradoras', detail: { title: 'Administradoras', text: 'Magalu, Caixa Consórcio, Itaú, Embracon e Volkswagen, conforme disponibilidade e critérios de credenciamento de cada administradora.' } },
      { x: 36, y: 69, w: 43, h: 18, label: 'Suporte', detail: { title: 'Suporte mesmo com autonomia', text: 'Treinamento de sistemas, orientação inicial, suporte comercial, apoio estratégico, troca de experiência e auxílio nas primeiras vendas.' } },
      { x: 83, y: 88, w: 14, h: 10, label: 'Estrutura completa', action: { type: 'goto', slide: 6 } },
    ]
  },
  {
    id: 'estrutura', image: '/slides/07-estrutura.png', label: 'Estrutura Vibra', hint: 'Clique nos 4 blocos',
    hotspots: [
      { x: 3, y: 41, w: 23, h: 33, label: 'Geração de Leads', detail: { title: 'Geração de leads', text: 'O parceiro define o investimento e a Vibra direciona a estratégia de captação. Os leads gerados são encaminhados para atendimento e follow-up.' } },
      { x: 27, y: 41, w: 23, h: 33, label: 'Treinamento e SDR', detail: { title: 'Treinamento comercial e SDR', text: 'Abordagem, qualificação, primeiro contato, follow-up, objeções, agendamento, videoconferência, apresentação e fechamento.' } },
      { x: 51, y: 41, w: 23, h: 33, label: 'Acompanhamento', detail: { title: 'Acompanhamento nas primeiras reuniões', text: 'A Vibra pode participar junto com o parceiro para gerar segurança, prática e autonomia comercial.' } },
      { x: 74, y: 41, w: 23, h: 33, label: 'Pós-venda', detail: { title: 'Suporte operacional e pós-venda', text: 'Contratos, apoio administrativo, plataformas, boletos, cliente, lances, contemplação e pós-venda.' } },
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
