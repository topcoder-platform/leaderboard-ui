/* global requestAnimationFrame */
import { Component } from 'react'
import PropTypes from 'prop-types'

class NewsMarquee extends Component {
  constructor () {
    super()

    this.state = {
      elemWidth: 0,
      translateX: 0,
      slide: false,
      elem: null,
      bodyWidth: 0
    }
  }

  componentDidMount () {
    const elem = document.getElementById('marquee-rollover')
    let { elemWidth, translateX, bodyWidth } = this.state

    if (elemWidth !== elem.clientWidth) {
      elemWidth = elem.clientWidth
      bodyWidth = document.body.clientWidth
      translateX = bodyWidth
    }

    this.setState({
      elemWidth,
      translateX,
      bodyWidth,
      elem,
      slide: true
    }, this.slide.bind(this))
  }

  slide () {
    const {
      elem, slide, elemWidth, bodyWidth
    } = this.state
    let { translateX } = this.state

    if (!slide) {
      return
    }

    elem.style.transform = `translateX(${translateX}px)`

    if (translateX < -elemWidth) {
      translateX = bodyWidth
    } else {
      translateX -= 1
    }

    this.setState({ translateX }, () => {
      requestAnimationFrame(this.slide.bind(this))
    })
  }

  render () {
    const { tickerMessages, tickerSeparator } = this.props

    return (
      <div className='marqueeContainer'>
        <div className='marqueeText' id='marquee-rollover'>
          {tickerMessages.map((message, i) => (
            <span className='marqueeMessageBlock' key={message}>
              {message}
              { i !== tickerMessages.length - 1 &&
              <img className='marqueeDividerImg' src={tickerSeparator} alt='divider' />
              }
            </span>
          ))}
        </div>
        <div className='marqueeShadowStart' />
        <div className='marqueeShadow' />
        <style jsx>
          {`
            .marqueeContainer {
              flex-grow: 1;
              position: relative;
              overflow: hidden;
              display: flex;
              height: 100%;
            }

            .marqueeShadow {
              position: absolute;
              width: 100px;
              height: 100%;
              right: 0;
              top: 0;
              background-image: linear-gradient(90deg, rgba(14,24,32,0.00) 0%, #010A17 80%);
            }

            .marqueeShadowStart {
              position: absolute;
              width: 100px;
              height: 100%;
              left: 0;
              top: 0;
              background-image: linear-gradient(-90deg, rgba(14,24,32,0.00) 0%, #010A17 80%);
            }

            .marqueeText {
              display: inline-flex;
              align-items: center;
              white-space: nowrap;
              color: rgba(255, 255, 255, .6);
              font-family: 'Roboto', sans-serif;
              font-size: 1.4375em;
              font-weight: 400;
              line-height: 29px;
            }

            .marqueeMessageBlock {
              display: flex;
              align-items: center;
            }

            .marqueeDividerImg {
              margin-left: 15px;
              margin-right: 15px;
              height: 26px;
              width: 47px;
            }
          `}
        </style>
      </div>
    )
  }
}

NewsMarquee.propTypes = {
  tickerSeparator: PropTypes.string.isRequired,
  tickerMessages: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default NewsMarquee
