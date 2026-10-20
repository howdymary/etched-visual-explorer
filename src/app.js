import { chapters, components, sources } from './content.js';
import { createScene } from './scene.js';

const $ = (id) => document.getElementById(id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const smallScreen = matchMedia('(max-width: 760px)');
const state = { chapter:-1, selected:null, paused:reducedMotion.matches, fault:false, lastTrigger:null };
const escapeHTML = (s) => String(s).replace(/[&<>"']/g,(c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const navLabels = ['System','Package','Architecture','Quantization','Microarchitecture','Verification','Physical design','Tapeout','Server racks','AI & feedback'];

$('scroll-track').innerHTML = chapters.map((chapter,i) => `<section class="scroll-step" id="${escapeHTML(chapter.id)}" aria-label="View ${i+1}: ${escapeHTML(chapter.title)}"><h2 class="sr-only">${escapeHTML(chapter.title)}</h2></section>`).join('');
$('chapter-nav').innerHTML = chapters.map((chapter,i) => `<button type="button" data-chapter-link="${i}" aria-label="View ${i+1}: ${escapeHTML(chapter.title)}"><span class="nav-number">${String(i+1).padStart(2,'0')}</span><span class="nav-label">${navLabels[i]}</span></button>`).join('');
$('source-links').innerHTML = sources.map((source) => `<li><a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.label)}</a></li>`).join('');

const scene = createScene($('scene'),{onSelect:selectComponent,onHover:showTooltip,onLeave:hideTooltip});
// The explorer supplies its own chapter labels; frame the actual diagram more closely.
$('scene').querySelector('svg').setAttribute('viewBox','0 110 1000 610');
scene.setPlaying(!state.paused);

function hideTooltip() { $('component-tooltip').hidden = true; }
function showTooltip(id,event) {
  if (smallScreen.matches || state.selected || !components[id]) return;
  const item=components[id];
  $('tooltip-title').textContent=item.name;
  $('tooltip-description').textContent=item.description;
  const tooltip=$('component-tooltip'); tooltip.hidden=false;
  const target=event?.target?.closest?.('[data-component]') || event?.target;
  const rect=target?.getBoundingClientRect?.();
  const x=event?.clientX || rect?.right || innerWidth/2;
  const y=event?.clientY || rect?.top || innerHeight/2;
  const box=tooltip.getBoundingClientRect();
  let left=x+19,top=y-box.height-14;
  if (left+box.width>innerWidth-12) left=x-box.width-19;
  if (top<85) top=y+22;
  tooltip.style.left=`${Math.max(12,Math.min(left,innerWidth-box.width-12))}px`;
  tooltip.style.top=`${Math.max(84,Math.min(top,innerHeight-box.height-12))}px`;
}

function selectComponent(id) {
  const item=components[id]; if (!item) return;
  state.lastTrigger=document.activeElement;
  state.selected=id; hideTooltip();
  $('inspector-type').textContent=item.type;
  $('inspector-title').textContent=item.name;
  $('inspector-description').textContent=item.description;
  $('inspector-facts').replaceChildren();
  for (const [label,key] of [['Purpose','why'],['Inputs','inputs'],['Outputs','outputs'],['Tradeoff','tradeoff']]) {
    if (!item[key]) continue;
    const dt=document.createElement('dt'); dt.textContent=label;
    const dd=document.createElement('dd'); dd.textContent=item[key];
    $('inspector-facts').append(dt,dd);
  }
  $('inspector').hidden=false;
  $('visual-explorer').classList.add('has-inspector');
  scene.selectComponent(id);
  $('inspector').focus({preventScroll:true});
  document.querySelectorAll('[data-component-link]').forEach((button) => button.setAttribute('aria-pressed',String(button.dataset.componentLink===id)));
  $('view-announcement').textContent=`Selected ${item.name}. Component details are open.`;
}

function closeInspector(restore=false) {
  $('inspector').hidden=true;
  $('visual-explorer').classList.remove('has-inspector');
  state.selected=null; scene.selectComponent(null);
  document.querySelectorAll('[data-component-link]').forEach((button) => button.setAttribute('aria-pressed','false'));
  if (restore && state.lastTrigger?.isConnected) state.lastTrigger.focus({preventScroll:true});
}

function activateChapter(index,progress=0) {
  if (state.chapter!==index) {
    state.chapter=index; closeInspector(); hideTooltip();
    const chapter=chapters[index];
    $('view-kicker').textContent=chapter.kicker;
    $('view-title').textContent=chapter.title;
    $('view-caption').textContent=chapter.caption;
    $('view-number').textContent=String(index+1).padStart(2,'0');
    $('fault-toggle').hidden=index!==5;
    $('previous-view').disabled=index===0;
    $('next-view').disabled=index===chapters.length-1;
    const buttons=[...document.querySelectorAll('[data-chapter-link]')];
    buttons.forEach((button,i) => i===index ? button.setAttribute('aria-current','step') : button.removeAttribute('aria-current'));
    const active=buttons[index],nav=$('chapter-nav');
    nav.scrollTo({left:Math.max(0,active.offsetLeft-nav.offsetLeft-nav.clientWidth/2+active.offsetWidth/2),behavior:reducedMotion.matches?'instant':'smooth'});
    $('component-strip').innerHTML=chapter.componentIds.map((id) => `<button type="button" class="component-chip" data-component-link="${id}" aria-pressed="false">${escapeHTML(components[id]?.name || id)}</button>`).join('');
    $('component-strip').scrollLeft=0;
    $('view-announcement').textContent=`View ${index+1}: ${chapter.title}. ${chapter.caption}`;
  }
  scene.setChapter(index,progress);
}

let scrollFrame=0;
function updateOnScroll() {
  scrollFrame=0;
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  const position=Math.max(0,Math.min(chapters.length-1,scrollY/max*(chapters.length-1)));
  const active=Math.round(position);
  activateChapter(active,Math.max(0,Math.min(1,position-active+.5)));
  $('journey-progress').style.transform=`scaleX(${position/(chapters.length-1)})`;
}
function scheduleScroll() { if (!scrollFrame) scrollFrame=requestAnimationFrame(updateOnScroll); }
function goToChapter(index,instant=false) {
  const target=Math.max(0,Math.min(chapters.length-1,index));
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  window.scrollTo({top:target/(chapters.length-1)*max,behavior:instant || reducedMotion.matches?'instant':'smooth'});
  history.replaceState(null,'',`#${chapters[target].id}`);
}
window.addEventListener('scroll',scheduleScroll,{passive:true});
window.addEventListener('resize',scheduleScroll,{passive:true});
document.addEventListener('click',(event) => {
  const chapterButton=event.target.closest('[data-chapter-link]');
  if (chapterButton) goToChapter(Number(chapterButton.dataset.chapterLink));
  const componentButton=event.target.closest('[data-component-link]');
  if (componentButton) selectComponent(componentButton.dataset.componentLink);
});
$('previous-view').addEventListener('click',() => goToChapter(state.chapter-1));
$('next-view').addEventListener('click',() => goToChapter(state.chapter+1));
$('chapter-nav').addEventListener('keydown',(event) => {
  const button=event.target.closest('[data-chapter-link]'); if (!button) return;
  let next=Number(button.dataset.chapterLink);
  if (event.key==='ArrowRight') next++;
  else if (event.key==='ArrowLeft') next--;
  else if (event.key==='Home') next=0;
  else if (event.key==='End') next=chapters.length-1;
  else return;
  event.preventDefault();
  next=Math.max(0,Math.min(chapters.length-1,next));
  goToChapter(next);
  document.querySelector(`[data-chapter-link="${next}"]`).focus({preventScroll:true});
});
$('inspector-close').addEventListener('click',() => closeInspector(true));
document.addEventListener('keydown',(event) => { if (event.key==='Escape') { hideTooltip(); closeInspector(true); } });

function updateMotionButton() {
  $('motion-toggle').disabled=reducedMotion.matches;
  $('motion-label').textContent=reducedMotion.matches?'Motion off':state.paused?'Play':'Pause';
  $('motion-icon').textContent=reducedMotion.matches?'—':state.paused?'▷':'Ⅱ';
  $('motion-toggle').setAttribute('aria-label',reducedMotion.matches?'Animation is off to respect your reduced motion preference':state.paused?'Play diagram animation':'Pause diagram animation');
  $('motion-toggle').setAttribute('aria-pressed',String(state.paused));
}
$('motion-toggle').addEventListener('click',() => { state.paused=!state.paused; scene.setPlaying(!state.paused); updateMotionButton(); });
reducedMotion.addEventListener('change',() => { state.paused=reducedMotion.matches; scene.setPlaying(!state.paused); updateMotionButton(); });
function updateHint() { $('explore-hint').textContent=smallScreen.matches?'Tap a component to inspect':'Hover to inspect · click to focus'; }
smallScreen.addEventListener('change',updateHint);
$('fault-toggle').addEventListener('click',() => {
  state.fault=!state.fault; scene.setVerificationFault(state.fault);
  $('fault-toggle').setAttribute('aria-pressed',String(state.fault));
  $('fault-toggle').textContent=state.fault?'Restore expected behavior':'Introduce a mismatch';
  $('view-announcement').textContent=state.fault?'Illustrative mismatch detected.':'The illustrative implementation matches expected behavior.';
});
$('sources-open').addEventListener('click',() => { hideTooltip(); $('sources-dialog').showModal(); });
$('sources-close').addEventListener('click',() => $('sources-dialog').close());
$('sources-dialog').addEventListener('click',(event) => { if (event.target===$('sources-dialog')) { const r=$('sources-dialog').getBoundingClientRect(); if (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) $('sources-dialog').close(); } });
document.addEventListener('visibilitychange',() => scene.setPlaying(!state.paused && !document.hidden));
updateMotionButton(); updateHint(); updateOnScroll();
if (location.hash) {
  const index=chapters.findIndex((chapter) => `#${chapter.id}`===location.hash);
  if (index>=0) requestAnimationFrame(() => { goToChapter(index,true); updateOnScroll(); });
}
