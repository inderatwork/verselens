import { useId, useState } from 'react'
import { parsePoem } from '../parsePoem.js'

function PoemLine({ parts }) {
  const [open, setOpen] = useState([])
  const id = useId()
  function toggle(index) {
    setOpen(previous => previous.includes(index) ? previous.filter(item => item !== index) : [...previous, index])
  }
  return (
    <div className="poem-line">
      <p className="verse">{parts.map((part, index) => part.definition !== undefined ? (
        <button key={index} type="button" className="defined-word" aria-expanded={open.includes(index)} aria-controls={`${id}-${index}`} onClick={() => toggle(index)}>{part.text}</button>
      ) : <span key={index}>{part.text}</span>)}</p>
      {parts.map((part, index) => part.definition !== undefined && (
        <div key={index} id={`${id}-${index}`} hidden={!open.includes(index)} className="definition">
          <p><strong>{part.text}</strong><span className="definition-divider" aria-hidden="true"> / </span>{part.definition}</p>
          <button type="button" className="close-definition" onClick={() => toggle(index)} aria-label={`Close definition of ${part.text}`}>×</button>
        </div>
      ))}
    </div>
  )
}

export default function Poem({ markdown, author, year }) {
  const { title, stanzas } = parsePoem(markdown)
  return (
    <article id="poem" className="poem" aria-labelledby="poem-title">
      <header className="poem-header"><span className="eyebrow">POEM 001 / RESILIENCE</span><h1 id="poem-title">{title}</h1><p className="byline">{author} <span aria-hidden="true">·</span> {year}</p></header>
      <div className="stanzas">{stanzas.map((lines, index) => <section className="stanza" aria-label={`Stanza ${index + 1}`} key={index}>{lines.map((parts, line) => <PoemLine key={line} parts={parts} />)}</section>)}</div>
      <p className="poem-end"><span aria-hidden="true">✳</span> The words are yours to explore.</p>
    </article>
  )
}
