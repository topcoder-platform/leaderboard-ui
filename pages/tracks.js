import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

function getPagesMarkup (pages) {
  const tracksMarkup = pages.map(p => {
    return (
      <li key={p.sys.id}>
        <Link href={`/page${p.fields.url}/${p.sys.id}`}>
          <a>{p.fields.pageType}</a>
        </Link>
      </li>
    )
  })

  return tracksMarkup
}

const Tracks = (props) => (
  <div>
    <h1>{props.trackName}</h1>
    <ul>
      {
        getPagesMarkup(props.pages)
      }
    </ul>
  </div>
)

Tracks.getInitialProps = async function ({ query }) {
  const { publicRuntimeConfig } = getConfig()
  const res = await fetch(`${publicRuntimeConfig.host}/contentful/${query.contentfulEntryId}`)

  const data = await res.json()

  return {
    trackName: data.fields.trackName,
    pages: data.fields.pages
  }
}

export default Tracks
