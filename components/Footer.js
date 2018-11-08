import PropTypes from 'prop-types'
import NewsMarquee from './Marquee'

const footer = ({ tickerMessages, tickerSeparator, tickerType }) => (
  <footer>
    <img className='footerDivider' src='/static/img/footerSeparator.png' alt='stars' />
    <div className='flashContainer'>
      <img className='flashImg' src={tickerType} alt='flash news' />
      <NewsMarquee tickerMessages={tickerMessages} tickerSeparator={tickerSeparator} />
    </div>
    <style jsx>
      {`
        footer {
          min-height: 70px;
          overflow: hidden;
        }

        .flashContainer {
          display: flex;
          position: relative;
        }

        .flashImg {
          padding: 10px;
          height: 30px;
          padding-bottom: 20px;
          background: #010A17;
        }        
      `}
    </style>
  </footer>
)

footer.propTypes = {
  tickerType: PropTypes.string,
  tickerMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  tickerSeparator: PropTypes.string
}

footer.defaultProps = {
  tickerType: '/static/img/flashNews.png',
  tickerSeparator: '/static/img/miniLogo.png'
}

export default footer
