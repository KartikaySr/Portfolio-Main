import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { achievements, certifications, education, experience, profile, projects, skillCategories } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import MandyMascot from './MandyMascot';

type NavigationTarget = 'top' | 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story' | 'contact';
type ChatMessage = { role: 'assistant' | 'user'; text: string };
type AssistantResponse = { reply: string; navigateTo: NavigationTarget | null; openResume: boolean };
type SpeechResultEvent = Event & { results: ArrayLike<ArrayLike<{ transcript: string }>> };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

const targets: Record<NavigationTarget, string> = {
  top: 'Home',
  about: 'Profile',
  journey: 'Experience',
  originals: 'Projects',
  picks: 'Highlights',
  skills: 'Skills',
  moments: 'Recognition & certifications',
  story: 'Résumé',
  contact: 'Contact',
};

const initialMessage: ChatMessage = {
  role: 'assistant',
  text: "Hi, I’m Mandy! I’m Kartikay’s portfolio friend. Ask me about his work, or tell me where you’d like to go and I’ll take you there.",
};

function getError(data: unknown, fallback: string): string {
  if (typeof data === 'object' && data !== null && 'error' in data && typeof data.error === 'string') return data.error;
  return fallback;
}

async function readResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    if (response.status === 404 || contentType.includes('text/html')) {
      throw new Error('The AI endpoint is not available in this preview. Run the site with Vercel to enable AI.');
    }
    throw new Error('The server returned an unexpected response. Please try again.');
  }
  try {
    return await response.json();
  } catch {
    if (response.status === 404) {
      throw new Error('The AI endpoint is not available in this preview. Run the site with Vercel to enable AI.');
    }
    throw new Error('The server returned an unreadable response. Please try again.');
  }
}

export default function AssistantHub({
  onNavigate,
  onOpenResume,
}: {
  onNavigate: (target: NavigationTarget) => void;
  onOpenResume: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'assistant' | 'analyzer'>('assistant');
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [question, setQuestion] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [recording, setRecording] = useState(false);
  const [voiceError, setVoiceError] = useState('');
  const recognition = useRef<SpeechRecognitionLike | null>(null);
  const feed = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const triggerButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  useScrollLock(open);

  const context = useMemo(() => {
    return [
      `${profile.displayName}: ${profile.role}. ${profile.intro} Location: ${profile.location}.`,
      `Education: ${education.map((item) => `${item.degree} at ${item.school}, ${item.period}, ${item.score}`).join('; ')}`,
      `Experience: ${experience.map((item) => `${item.role} at ${item.company} (${item.period}): ${item.points.join(' ')}`).join('\n')}`,
      `Projects: ${projects.map((item) => `${item.title} (${item.year}; ${item.status}): ${item.logline} Stack: ${item.stack.join(', ')}`).join('\n')}`,
      `Skills: ${skillCategories.map((group) => `${group.title}: ${group.skills.map((skill) => skill.name).join(', ')}`).join('; ')}`,
      `Certifications: ${certifications.map((item) => `${item.name} — issued by ${item.issuer}${item.date ? ` (${item.date})` : ''}`).join('; ')}`,
      `Recognition: ${achievements.map((item) => `${item.title} — ${item.org}: ${item.detail}`).join('; ')}`,
      `Navigation section IDs: ${Object.entries(targets).map(([id, label]) => `${label}=${id}`).join('; ')}`,
    ].join('\n\n');
  }, []);

  useEffect(() => {
    feed.current?.scrollTo({ top: feed.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, view]);

  useEffect(() => {
    if (!open) {
      recognition.current?.stop();
      window.speechSynthesis?.cancel();
      if (wasOpen.current) {
        wasOpen.current = false;
        triggerButton.current?.focus({ preventScroll: true });
      }
      return;
    }
    wasOpen.current = true;
    window.requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = panel.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = question.trim();
    if (!message || busy) return;

    setQuestion('');
    setError('');
    setMessages((current) => [...current, { role: 'user', text: message }]);
    setBusy(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context }),
      });
      const data = await readResponse(response);
      if (!response.ok) throw new Error(getError(data, 'The assistant could not answer. Please try again.'));
      if (
        typeof data !== 'object' ||
        data === null ||
        !('reply' in data) ||
        typeof data.reply !== 'string' ||
        !('navigateTo' in data) ||
        !('openResume' in data) ||
        (data.navigateTo !== null && (typeof data.navigateTo !== 'string' || !(data.navigateTo in targets))) ||
        typeof data.openResume !== 'boolean'
      ) {
        throw new Error('The assistant returned an invalid response. Please try again.');
      }
      const result = data as AssistantResponse;
      setMessages((current) => [...current, { role: 'assistant', text: result.reply }]);
      if (result.navigateTo && result.navigateTo in targets) {
        window.setTimeout(() => {
          setOpen(false);
          onNavigate(result.navigateTo!);
        }, 650);
      } else if (result.openResume) {
        window.setTimeout(() => {
          setOpen(false);
          onOpenResume();
        }, 650);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The assistant could not answer. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function startVoiceInput() {
    const speechWindow = window as SpeechWindow;
    const SpeechRecognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError('Speech input is not available in this browser. You can still type your question.');
      return;
    }

    setVoiceError('');
    const current = new SpeechRecognition();
    current.lang = 'en-US';
    current.interimResults = false;
    current.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0]?.transcript ?? '').join(' ').trim();
      if (transcript) setQuestion((value) => `${value}${value ? ' ' : ''}${transcript}`);
    };
    current.onerror = () => setVoiceError('Speech input stopped. Please try again or type your question.');
    current.onend = () => {
      setRecording(false);
      recognition.current = null;
    };
    recognition.current = current;
    setRecording(true);
    try {
      current.start();
    } catch {
      setRecording(false);
      recognition.current = null;
      setVoiceError('Could not start speech input. Please try again.');
    }
  }

  function speak(text: string) {
    if (!window.speechSynthesis) {
      setVoiceError('Text-to-speech is not available in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close portfolio guide"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[129] bg-black/60 backdrop-blur-[2px] transition-opacity"
        />
      )}
      <div className={`fixed z-[130] ${open ? 'inset-x-0 bottom-0 sm:inset-auto sm:bottom-7 sm:right-7' : 'bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:bottom-7 sm:right-7'}`}>
        {open && (
        <section
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={view === 'assistant' ? 'Portfolio AI navigator' : 'Résumé analyzer'}
          className="glass flex h-[min(88dvh,760px)] max-h-[calc(100dvh-env(safe-area-inset-top)-8px)] w-full flex-col overflow-hidden rounded-t-[26px] border border-white/15 bg-[#111115]/[0.98] pb-[env(safe-area-inset-bottom)] shadow-[0_28px_90px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:mb-3 sm:h-[min(78dvh,720px)] sm:max-h-[min(78dvh,720px)] sm:w-[min(94vw,440px)] sm:rounded-[26px] sm:pb-0"
        >
          <header className="px-4 pb-4 pt-4 sm:px-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-accent" aria-hidden>
                  <MandyMascot className="h-11 w-11" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Mandy · Kartikay’s portfolio friend</p>
                  <h2 className="mt-1 text-base font-semibold tracking-tight text-bone">{view === 'assistant' ? 'What should we explore?' : 'Review a résumé'}</h2>
                </div>
              </div>
              <button ref={closeButton} type="button" onClick={() => setOpen(false)} aria-label="Close AI panel" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-mist transition hover:bg-white/10 hover:text-bone">
                ✕
              </button>
            </div>
            <div role="group" aria-label="AI tools" className="mt-4 grid grid-cols-2 gap-1 rounded-[14px] bg-black/35 p-1">
              <button
                type="button"
                aria-pressed={view === 'assistant'}
                onClick={() => { setView('assistant'); setError(''); }}
                className={`min-h-10 rounded-[10px] px-2 text-xs font-semibold transition ${view === 'assistant' ? 'bg-white/[0.12] text-bone shadow-sm' : 'text-mist hover:text-bone'}`}
              >
                Ask the portfolio
              </button>
              <button
                type="button"
                aria-pressed={view === 'analyzer'}
                onClick={() => { setView('analyzer'); setError(''); }}
                className={`min-h-10 rounded-[10px] px-2 text-xs font-semibold transition ${view === 'analyzer' ? 'bg-white/[0.12] text-bone shadow-sm' : 'text-mist hover:text-bone'}`}
              >
                Résumé review
              </button>
            </div>
          </header>

          {view === 'assistant' ? (
            <>
              <div ref={feed} className="min-h-40 flex-1 space-y-3 overflow-y-auto border-y border-white/[0.07] bg-black/10 px-4 py-4 sm:px-5" aria-live="polite">
                {messages.map((message, index) => (
                  <article key={`${message.role}-${index}`} className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'ml-auto rounded-br-md bg-accent/15 text-bone ring-1 ring-accent/10' : 'rounded-bl-md bg-white/[0.055] text-bone ring-1 ring-white/[0.05]'}`}>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    {message.role === 'assistant' && index > 0 && (
                      <button type="button" onClick={() => speak(message.text)} className="mt-2 min-h-9 text-xs font-semibold text-accent hover:text-accent-2">
                        <span aria-hidden>◖</span> Read aloud
                      </button>
                    )}
                  </article>
                ))}
                {busy && <p className="rounded-2xl rounded-bl-md bg-white/[0.055] px-4 py-3 text-sm text-mist" role="status">Thinking…</p>}
              </div>
              <div className="px-4 pb-4 pt-3 sm:px-5">
                <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-smoke">Explore</p>
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                  {(['originals', 'skills', 'story', 'contact'] as const).map((target) => (
                    <button key={target} type="button" onClick={() => { setOpen(false); onNavigate(target); }} className="min-h-9 shrink-0 rounded-full border border-white/10 bg-white/[0.035] px-3 text-[11px] font-semibold text-mist transition hover:border-accent/25 hover:bg-accent/[0.06] hover:text-bone">
                      {targets[target]}
                    </button>
                  ))}
                </div>
                <form onSubmit={sendMessage} className="flex items-end gap-2">
                  <label className="sr-only" htmlFor="portfolio-ai-question">Ask Mandy about the portfolio</label>
                  <textarea
                    id="portfolio-ai-question"
                    rows={2}
                    maxLength={1200}
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Ask Mandy to show you the résumé…"
                    className="min-h-12 min-w-0 flex-1 resize-none rounded-[16px] border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-bone outline-none placeholder:text-smoke focus:border-accent/50"
                  />
                  <button type="button" onClick={recording ? () => recognition.current?.stop() : startVoiceInput} aria-label={recording ? 'Stop speech input' : 'Start speech input'} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border text-lg transition ${recording ? 'border-red-400/40 bg-red-400/10 text-red-300' : 'border-white/10 bg-white/[0.045] text-bone hover:bg-white/10'}`}>
                    {recording ? (
                      '■'
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <rect x="9" y="3" width="6" height="12" rx="3" />
                        <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8" />
                      </svg>
                    )}
                  </button>
                  <button type="submit" disabled={!question.trim() || busy} aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-accent text-lg font-bold text-ink transition hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-40">
                    ↑
                  </button>
                </form>
                {voiceError && <p className="mt-2 text-xs text-amber-200" role="status">{voiceError}</p>}
                {error && <p className="mt-2 text-xs text-red-300" role="alert">{error}</p>}
              </div>
            </>
          ) : (
            <ResumeAnalyzer />
          )}
        </section>
      )}

      <button
        ref={triggerButton}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close Mandy' : 'Ask Mandy, the portfolio assistant'}
        tabIndex={open ? -1 : undefined}
        className={`group ml-auto flex min-h-[58px] items-center gap-3 rounded-[20px] border border-white/10 bg-[#111115]/95 py-2 pl-2.5 pr-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.38)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_14px_44px_rgba(0,0,0,0.48),0_0_28px_var(--accent-glow-soft)] ${open ? 'hidden' : ''}`}
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-[14px] bg-accent text-ink shadow-[0_4px_20px_var(--accent-glow)]" aria-hidden>
          <MandyMascot className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
        </span>
        <span className="flex flex-col">
          <span className="text-[13px] font-semibold tracking-wide text-bone">{open ? 'Close Mandy' : 'Ask Mandy'}</span>
          <span className="mt-0.5 text-[10px] font-medium tracking-wide text-mist">{open ? 'Kartikay’s portfolio friend' : 'Here to help you explore'}</span>
        </span>
        {!open && <span aria-hidden className="ml-1 text-sm text-smoke transition group-hover:translate-x-0.5 group-hover:text-accent">↗</span>}
      </button>
      </div>
    </>
  );
}

function ResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [perspective, setPerspective] = useState('Recruiter');
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [report, setReport] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reportRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [report]);

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || busy) return;
    setError('');
    setReport('');

    if (file.size > 5 * 1024 * 1024) {
      setError('Choose a PDF smaller than 5 MB.');
      return;
    }
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Choose a PDF file.');
      return;
    }

    setBusy(true);
    let pdf: import('pdfjs-dist').PDFDocumentProxy | undefined;
    let sessionToken = '';
    try {
      const pdfjs = await import('pdfjs-dist');
      const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
      pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;

      const pages: string[] = [];
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();
        pages.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
      }
      let resumeText = pages.join('\n').trim().slice(0, 16_000);
      const needsOcr = resumeText.length < 80;
      if (needsOcr && pdf.numPages > 8) {
        setError('Scanned-PDF OCR supports up to 8 pages. Please use a shorter PDF or an accessible text-based résumé.');
        return;
      }

      const sessionResponse = await fetch('/api/resume-upload', { method: 'POST' });
      const sessionData = await readResponse(sessionResponse);
      if (!sessionResponse.ok) throw new Error(getError(sessionData, 'Could not start secure résumé processing.'));
      if (
        typeof sessionData !== 'object' ||
        sessionData === null ||
        !('sessionToken' in sessionData) ||
        typeof sessionData.sessionToken !== 'string' ||
        !('signedURL' in sessionData) ||
        typeof sessionData.signedURL !== 'string'
      ) {
        throw new Error('Secure résumé storage returned an invalid response.');
      }
      sessionToken = sessionData.sessionToken;
      const uploadResponse = await fetch(sessionData.signedURL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/pdf', 'x-upsert': 'false' },
        body: file,
      });
      if (!uploadResponse.ok) throw new Error('The résumé could not be uploaded to private temporary storage.');

      if (needsOcr) {
        const scannedPages: string[] = [];
        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const viewport = page.getViewport({ scale: Math.min(1.5, 1400 / baseViewport.width) });
          const canvas = document.createElement('canvas');
          canvas.width = Math.ceil(viewport.width);
          canvas.height = Math.ceil(viewport.height);
          const context = canvas.getContext('2d');
          if (!context) throw new Error('This browser could not prepare a PDF page for OCR.');
          await page.render({ canvasContext: context, viewport }).promise;
          const image = canvas.toDataURL('image/jpeg', 0.72).split(',')[1] ?? '';
          canvas.width = 0;
          canvas.height = 0;
          const ocrResponse = await fetch('/api/resume-ocr', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${sessionToken}` },
            body: JSON.stringify({ image, pageNumber }),
          });
          const ocrData = await readResponse(ocrResponse);
          if (!ocrResponse.ok) throw new Error(getError(ocrData, `OCR could not read page ${pageNumber}.`));
          if (typeof ocrData !== 'object' || ocrData === null || !('text' in ocrData) || typeof ocrData.text !== 'string') {
            throw new Error('The OCR service returned an invalid response.');
          }
          scannedPages.push(ocrData.text);
          resumeText = scannedPages.join('\n').trim().slice(0, 16_000);
        }
      }
      if (resumeText.length < 80) {
        throw new Error('Not enough readable text was found in this PDF to review.');
      }

      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, perspective, targetRole, sessionToken }),
      });
      const data = await readResponse(response);
      if (!response.ok) throw new Error(getError(data, 'Résumé analysis failed. Please try again.'));
      if (typeof data !== 'object' || data === null || !('report' in data) || typeof data.report !== 'string') {
        throw new Error('The analyzer returned an invalid response. Please try again.');
      }
      setReport(data.report);
      sessionToken = '';
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Résumé analysis failed. Please try again.');
    } finally {
      await pdf?.destroy();
      if (sessionToken) {
        try {
          const cleanup = await fetch('/api/delete-resume', {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${sessionToken}` },
            keepalive: true,
          });
          if (!cleanup.ok) {
            const cleanupData = await readResponse(cleanup);
            setError((current) => `${current ? `${current} ` : ''}${getError(cleanupData, 'Temporary résumé deletion could not be confirmed. Please retry or contact the site owner.')}`);
          }
        } catch {
          setError((current) => `${current ? `${current} ` : ''}Temporary résumé deletion could not be confirmed. Please retry or contact the site owner.`);
        }
      }
      setBusy(false);
    }
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
      <form onSubmit={analyze} className="space-y-4">
        <p className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-xs leading-relaxed text-mist">
          Your PDF is placed in a private Supabase bucket only while it is being processed, then deleted. Selectable text is extracted in your browser; scanned pages use Hugging Face OCR. Extracted text is sent to Groq for review and is not stored. Provider data handling applies, so avoid sensitive personal information.
        </p>

        <div>
          <label htmlFor="resume-file" className="mb-1.5 block text-xs font-semibold text-bone">Résumé PDF · max 5 MB</label>
          <input
            id="resume-file"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(event) => { setFile(event.target.files?.[0] ?? null); setReport(''); setError(''); }}
            className="block min-h-12 w-full rounded-xl border border-white/15 bg-black/30 p-2 text-xs text-mist file:mr-3 file:min-h-8 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:text-xs file:font-semibold file:text-bone"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="text-xs font-semibold text-bone">
            Reviewer perspective
            <select value={perspective} onChange={(event) => setPerspective(event.target.value)} className="mt-1.5 min-h-11 w-full rounded-xl border border-white/15 bg-[#17171c] px-3 text-sm text-bone">
              <option>Recruiter</option>
              <option>Engineering manager</option>
              <option>ATS-style review</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-bone">
            Target role
            <input value={targetRole} onChange={(event) => setTargetRole(event.target.value)} maxLength={120} required className="mt-1.5 min-h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-sm text-bone" />
          </label>
        </div>

        <button type="submit" disabled={!file || busy} className="min-h-11 w-full rounded-xl bg-accent px-4 text-sm font-bold text-ink disabled:cursor-not-allowed disabled:opacity-40">
          {busy ? 'Reading and reviewing…' : 'Analyze résumé'}
        </button>
      </form>

      {error && <p className="mt-4 rounded-lg border border-red-300/20 bg-red-300/5 p-3 text-xs leading-relaxed text-red-200" role="alert">{error}</p>}
      {report && (
        <div ref={reportRef} className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
          <h3 className="mb-3 text-sm font-bold text-accent">Advisory review · not a hiring decision</h3>
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-bone">{report}</pre>
        </div>
      )}
    </div>
  );
}
