import PropTypes from 'prop-types'
import NewsMarquee from './Marquee'

const footer = ({ tickerMessages, tickerSeparator, tickerType }) => (
  <footer>
    <img className='footerDivider' src='/static/img/footerSeparator.png' alt='stars' />
    <div className='flashContainer'>
      <div className='flashImg'>
        <img src={tickerType} alt='flash news' />
      </div>
      <NewsMarquee tickerMessages={tickerMessages} tickerSeparator={tickerSeparator} />
    </div>
    <style jsx>
      {`
        footer {
          min-height: 84px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .flashContainer {
          display: flex;
          position: relative;
          height: 100%;
          align-items: center;
          flex: 1;
        }

        .flashImg {
          padding-left: 30px;
          background: #010A17;
          height: 100%;
          display: flex;
          align-items: center;
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
  tickerType: '/static/img/flashNews.svg',
  tickerSeparator: '/static/img/miniLogo.png'
}

export default footer
