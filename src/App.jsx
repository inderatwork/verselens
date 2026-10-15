import Poem from './components/Poem.jsx'
import { poem } from './data/poem.js'
import './App.css'

export default function App() {
  return (
    <main className="reading-room">
      <header className="masthead"><a href="#poem" className="brand">Verse<span>Lens</span> ✳</a><span>A closer reading</span></header>
      <div className="reading-layout">
        <aside className="reading-note"><span className="eyebrow">THE READING ROOM</span><h2>A little meaning.<br />A deeper connection.</h2><p>Some words invite a closer look. Tap an underlined word to discover its meaning, right where you’re reading.</p><hr /><p>Read at your own pace.<br />There’s no rush here.</p></aside>
        <Poem markdown={poem} author="William Ernest Henley" year="1875" />
      </div>
      <footer>Stay with the words.<span>VERSE LENS · NO. 001</span></footer>
    </main>
  )
}
