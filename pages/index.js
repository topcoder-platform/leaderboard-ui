import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'

function getTracksMarkup (tracks) {
  const tracksMarkup = tracks.map(t => {
    return (
      <li key={t.sys.id}>
        <Link href={`/track/${t.sys.id}`}>
          <a>{t.fields.trackName}</a>
        </Link>
      </li>
    )
  })

  return tracksMarkup
}

const Index = (props) => (
  <div>
    <h1>Tracks</h1>
    <ul>
      {
        getTracksMarkup(props.tracks)
      }
    </ul>
  </div>
)

Index.getInitialProps = async function () {
  const { publicRuntimeConfig } = getConfig()
  try {
    const res = await fetch(`${publicRuntimeConfig.host}/content/CONTENTFUL_TRACKS_ENTRY_ID`)
    const data = await res.json()

    return {
      tracks: data.fields.tracks
    }
  } catch (err) {
    console.log(err)
    return {
      tracks: []
    }
  }
}

export default Index
