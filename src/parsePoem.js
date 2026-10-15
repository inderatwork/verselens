// Parse our limited poem format as text; never render input as HTML.
export function parseLine(line) {
  const parts = []
  const start = /\[([^\]\n]+)\]\\?\(/g
  let cursor = 0
  let match
  while ((match = start.exec(line))) {
    let end = start.lastIndex
    let depth = 1
    for (; end < line.length && depth > 0; end++) {
      if (line[end] === '(') depth++
      if (line[end] === ')') depth--
    }
    if (depth !== 0) continue
    if (match.index > cursor) parts.push({ text: line.slice(cursor, match.index) })
    parts.push({ text: match[1], definition: line.slice(start.lastIndex, end - 1) })
    cursor = end
    start.lastIndex = end
  }
  if (cursor < line.length) parts.push({ text: line.slice(cursor) })
  return parts
}

export function parsePoem(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').trim().split('\n')
  const title = (lines.shift() || '').replace(/^#{1,6}\s+/, '')
  const stanzas = lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean)
    .map(stanza => stanza.split('\n').map(parseLine))
  return { title, stanzas }
}
