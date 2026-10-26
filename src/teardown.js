const assets = {
  rack: './assets/hardware/etched-rack.webp',
  tray: './assets/hardware/etched-tray.webp',
  chip: './assets/hardware/etched-chip.webp'
};

// These are crops of visible surfaces in the supplied photographs. The empty
// carrier outline is intentionally schematic: it does not depict hidden PCB detail.
export function teardownMarkup() {
  return `<g data-teardown-stage class="teardown-stage" aria-hidden="true" data-phase="rack">
    <defs>
      <image id="__ID__-td-rack-image" href="${assets.rack}" x="0" y="0" width="2525" height="3200" />
      <image id="__ID__-td-tray-image" href="${assets.tray}" x="0" y="0" width="3200" height="1800" />
      <image id="__ID__-td-chip-image" href="${assets.chip}" x="0" y="0" width="3200" height="2562" />
      <clipPath id="__ID__-td-rack-crop"><rect x="820" y="600" width="900" height="2370" /></clipPath>
      <clipPath id="__ID__-td-tray-crop"><rect x="1190" y="275" width="820" height="1250" /></clipPath>
      <clipPath id="__ID__-td-chip-crop"><rect x="1120" y="750" width="980" height="1100" rx="12" /></clipPath>
      <clipPath id="__ID__-td-copper-crop">
        <path d="M1350 420H1548V610H1350Z M1655 420H1850V610H1655Z M1355 645H1548V835H1355Z M1655 645H1850V835H1655Z" />
      </clipPath>
      <clipPath id="__ID__-td-tubing-crop">
        <path d="M1260 349L1340 345L1373 392L1459 423L1554 367L1580 390L1500 471L1420 487L1373 590L1340 737L1307 927L1304 1210L1280 1395L1230 1383L1250 1187L1246 934L1275 735L1314 579L1360 462L1291 412Z" />
        <path d="M1940 349L1860 345L1827 392L1741 423L1646 367L1620 390L1700 471L1780 487L1827 590L1860 737L1893 927L1896 1210L1920 1395L1970 1383L1950 1187L1954 934L1925 735L1886 579L1840 462L1909 412Z" />
        <path d="M1375 722L1443 718L1510 741L1558 789L1587 876L1564 976L1470 1078L1412 1161L1390 1278L1364 1395L1299 1392L1335 1260L1360 1135L1417 1042L1500 951L1520 882L1502 823L1462 787L1380 772Z" />
        <path d="M1825 722L1757 718L1690 741L1642 789L1613 876L1636 976L1730 1078L1788 1161L1810 1278L1836 1395L1901 1392L1865 1260L1840 1135L1783 1042L1700 951L1680 882L1698 823L1738 787L1820 772Z" />
      </clipPath>
    </defs>
    <rect class="teardown-paper" x="0" y="110" width="1000" height="610" />
    <g class="teardown-breadcrumb" transform="translate(42 143)">
      <text data-td-crumb="rack" data-active="true" x="0">RACK</text><text class="teardown-separator" x="49">›</text>
      <text data-td-crumb="tray" x="72">TRAY</text><text class="teardown-separator" x="122">›</text>
      <text data-td-crumb="cooling" x="145">COOLING</text><text class="teardown-separator" x="220">›</text>
      <text data-td-crumb="package" x="244">PACKAGE</text>
    </g>
    <g data-td-rack>
      <g transform="translate(315 165) scale(.215) translate(-820 -600)">
        <use href="#__ID__-td-rack-image" clip-path="url(#__ID__-td-rack-crop)" />
        <rect data-td-bay class="teardown-bay" x="1030" y="1390" width="470" height="350" rx="7" />
      </g>
    </g>
    <g data-td-rack-label class="teardown-annotation">
      <path d="M530 367H586" /><text x="603" y="363">One delivered system</text>
      <text class="teardown-annotation-secondary" x="603" y="384">Compute, memory, power, cooling.</text>
    </g>
    <path data-td-rails class="teardown-rails" d="M450 350L640 430M450 390L640 470" opacity="0"/>
    <g data-td-tray transform="translate(412 372) rotate(90) scale(.105) translate(-1600 -910)" opacity="0">
      <g data-td-base><use href="#__ID__-td-tray-image" clip-path="url(#__ID__-td-tray-crop)" /></g>
      <g data-td-carrier opacity="0" class="teardown-carrier">
        <rect x="1208" y="294" width="774" height="1100" rx="7" />
        <path d="M1237 334H1953M1237 1350H1953" />
      </g>
      <g data-td-copper><use href="#__ID__-td-tray-image" clip-path="url(#__ID__-td-copper-crop)" /></g>
      <g data-td-tubing><use href="#__ID__-td-tray-image" clip-path="url(#__ID__-td-tubing-crop)" /></g>
    </g>
    <g data-td-package opacity="0" transform="translate(565 425) scale(.43) translate(-1600 -1280)">
      <use href="#__ID__-td-chip-image" clip-path="url(#__ID__-td-chip-crop)" />
    </g>
    <g data-td-layer-label class="teardown-annotation" opacity="0">
      <path data-td-layer-line d="M250 334H325" />
      <text data-td-layer-title x="42" y="326">Liquid cooling</text>
      <text data-td-layer-note class="teardown-annotation-secondary" x="42" y="348">Visible tubing and cold plates</text>
    </g>
    <text data-td-caption class="teardown-caption" x="42" y="697">Official hardware photography · explanatory sequence</text>
  </g>`;
}

const clamp = value => Math.max(0, Math.min(1, Number(value) || 0));
const mix = (a, b, progress) => a + (b - a) * progress;
const smooth = (start, end, value) => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};
const nearest = (value, stops) => stops.reduce((best, stop) => Math.abs(value - stop) < Math.abs(value - best) ? stop : best, stops[0]);
const fixed = value => Number(value.toFixed(3));

export function createTeardown(svg) {
  const stage = svg.querySelector('[data-teardown-stage]');
  if (!stage) throw new Error('teardownMarkup() must be added to the SVG before createTeardown().');
  const find = part => stage.querySelector(`[data-td-${part}]`);
  const parts = Object.fromEntries(['rack', 'bay', 'rack-label', 'rails', 'tray', 'base', 'carrier', 'copper', 'tubing', 'package', 'layer-label', 'layer-title', 'layer-note', 'layer-line', 'caption'].map(part => [part, find(part)]));
  let visible = true;
  let state = { chapter: 0, progress: 0, phase: 'rack', architectureMix: 0 };
  const opacity = (part, value) => parts[part].setAttribute('opacity', fixed(clamp(value)));
  const transform = (part, value) => parts[part].setAttribute('transform', value);

  function setPosition(chapter, progress = 0, reducedMotion = false) {
    const chapterIndex = Number(chapter) || 0;
    let p = clamp(progress);
    if (reducedMotion) {
      p = chapterIndex <= 0 ? nearest(p, [0, .2, .55, 1]) : chapterIndex === 1 ? nearest(p, [0, .32, .72, 1]) : nearest(p, [0, .4, 1]);
    }
    const first = chapterIndex <= 0;
    const second = chapterIndex === 1;
    const extraction = first ? p : 1;
    const separation = first ? 0 : second ? p : 1;
    const slide = smooth(.18, .62, extraction);
    const turn = smooth(.58, .97, extraction);
    const rackRetreat = smooth(.32, .94, extraction);
    const cx = mix(mix(412, 635, slide), 565, turn);
    const cy = mix(mix(372, 455, slide), 425, turn);
    const scaleY = mix(mix(.08, .25, slide), .385, turn);
    const scaleX = mix(mix(.045, .12, slide), .385, turn);
    const rotate = mix(-90, 0, turn);
    const skew = mix(-12,0,turn);
    transform('rack', `translate(${fixed(-75 * rackRetreat)} 0)`);
    opacity('rack', 1 - rackRetreat);
    opacity('bay', smooth(.02, .16, extraction) * (1 - smooth(.43, .72, extraction)));
    opacity('rack-label', 1 - smooth(.12, .38, extraction));
    opacity('rails', smooth(.18,.34,extraction) * (1-smooth(.58,.88,extraction)));
    const railStart = 460 - 75*rackRetreat;
    const railEnd = cx-635*scaleY;
    parts.rails.setAttribute('d',`M${fixed(railStart)} 348L${fixed(railEnd)} ${fixed(cy-410*scaleX)}M${fixed(railStart)} 392L${fixed(railEnd)} ${fixed(cy+410*scaleX)}`);
    transform('tray', `translate(${fixed(cx)} ${fixed(cy)}) rotate(${fixed(rotate)}) skewX(${fixed(skew)}) scale(${fixed(scaleX)} ${fixed(scaleY)}) translate(-1600 -910)`);
    opacity('tray', smooth(.16, .28, extraction) * (1 - smooth(.69, .96, separation)));

    const tubingLift = smooth(.04, .38, separation);
    const copperLift = smooth(.32, .73, separation);
    transform('tubing', `translate(${fixed(-365 * tubingLift)} ${fixed(-115 * tubingLift)}) rotate(${fixed(-8 * tubingLift)} 1600 910)`);
    opacity('tubing', 1 - smooth(.64, .88, separation));
    transform('copper', `translate(${fixed(330 * copperLift)} ${fixed(-115 * copperLift)}) rotate(${fixed(6 * copperLift)} 1600 680)`);
    opacity('copper', 1 - smooth(.73, .97, separation));
    opacity('base', (1 - .65*smooth(.04,.32,separation)) * (1-smooth(.64,.88,separation)));
    opacity('carrier', smooth(.07, .28, separation) * (1 - smooth(.61, .88, separation)) * .15);

    const packageReveal = smooth(.58, .97, separation);
    opacity('package', packageReveal);
    const packageScale = mix(.29, .43, packageReveal);
    transform('package', `translate(565 ${fixed(mix(460, 425, packageReveal))}) scale(${fixed(packageScale)}) translate(-1600 -1280)`);
    const layerLabel = smooth(.04, .16, separation) * (1 - smooth(.84, 1, separation));
    opacity('layer-label', layerLabel);
    const platePhase = separation > .38;
    parts['layer-title'].textContent = platePhase ? 'Heat leaves the package' : 'Liquid cooling';
    parts['layer-note'].textContent = platePhase ? 'Photographed cold-plate surfaces' : 'Photographed tubing surfaces';
    parts['layer-line'].setAttribute('d', platePhase ? 'M250 334H337' : 'M250 334H325');
    const phase = first ? (p < .22 ? 'rack' : 'tray') : second ? (p < .76 ? 'cooling' : 'package') : 'package';
    stage.setAttribute('data-phase', phase);
    stage.querySelectorAll('[data-td-crumb]').forEach(crumb => crumb.setAttribute('data-active', String(crumb.getAttribute('data-td-crumb') === phase)));
    parts.caption.textContent = first && p < .2 ? 'Official hardware photography · start at the delivered system' : separation > .05 && separation < .96 ? 'Visible photo regions separated for explanation; hidden board detail is not depicted.' : 'Official hardware photography · explanatory sequence';
    const architectureMix = chapterIndex < 2 ? 0 : chapterIndex === 2 ? smooth(.04, .38, p) : 1;
    stage.setAttribute('opacity', fixed(1 - architectureMix));
    stage.setAttribute('data-reduced-motion', String(Boolean(reducedMotion)));
    stage.style.display = visible && architectureMix < 1 ? '' : 'none';
    state = { chapter: chapterIndex, progress: p, phase, architectureMix };
    return { ...state };
  }

  function setVisible(value) {
    visible = Boolean(value);
    stage.style.display = visible && state.architectureMix < 1 ? '' : 'none';
  }
  setPosition(0, 0, false);
  return { setPosition, setVisible, getState: () => ({ ...state }), element: stage };
}
