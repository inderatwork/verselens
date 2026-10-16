import { useId, useState } from 'react'
import { parsePoem } from '../parsePoem.js'

function PoemLine({ parts, lineId, openWord, onToggle }) {
  const id = useId()
  const wordId = index => `${lineId}-${index}`
  return (
    <div className="poem-line">
      <p className="verse">{parts.map((part, index) => part.definition !== undefined ? (
        <button key={index} type="button" className="defined-word" aria-expanded={openWord === wordId(index)} aria-controls={`${id}-${index}`} onClick={() => onToggle(wordId(index))}>{part.text}</button>
      ) : <span key={index}>{part.text}</span>)}</p>
      {parts.map((part, index) => part.definition !== undefined && (
        <div key={index} id={`${id}-${index}`} hidden={openWord !== wordId(index)} className="definition">
          <p><strong>{part.text}</strong><span className="definition-divider" aria-hidden="true"> / </span><span lang="en">{part.definition}</span></p>
          <button type="button" className="close-definition" onClick={() => onToggle(wordId(index))} aria-label={`Close definition of ${part.text}`}>×</button>
        </div>
      ))}
    </div>
  )
}

export default function Poem({ markdown, author, year, subtitle, language = 'en', sectionLabel = 'Stanza', eyebrow = 'POEM 001 / RESILIENCE' }) {
  const { title, stanzas } = parsePoem(markdown)
  const [openWord, setOpenWord] = useState(null)
  function toggleWord(word) {
    setOpenWord(previous => previous === word ? null : word)
  }
  return (
    <article id="poem" className="poem" aria-labelledby="poem-title">
      <header className="poem-header"><span className="eyebrow">{eyebrow}</span><h1 id="poem-title" lang={language}>{title}</h1><p className="byline">{author}{(subtitle || year) && <> <span aria-hidden="true">·</span> {subtitle || year}</>}</p></header>
      <div className="stanzas" lang={language}>{stanzas.map((lines, index) => <section className="stanza" aria-label={`${sectionLabel} ${index + 1}`} key={index}>{lines.map((parts, line) => <PoemLine key={line} parts={parts} lineId={`${index}-${line}`} openWord={openWord} onToggle={toggleWord} />)}</section>)}</div>
      <p className="poem-end"><span aria-hidden="true">✳</span> The words are yours to explore.</p>
    </article>
  )
}
