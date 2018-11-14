import PropTypes from 'prop-types'

const sponsors = (props) => {
  const { showFlatDesign, hideMainSponsor, showDivider, mainSponsor, otherSponsors, smallerSponsor } = props
  let containerClass = (showFlatDesign) ? 'flatContainer' : (smallerSponsor) ? 'small' : ''
  return (<div className={`container ${containerClass}`}>
    {showDivider && <img className='divider' src='/static/img/divider.png' alt='divider' />}
    {!showFlatDesign &&
      <div className='sponsoredText'>
        SPONSORED BY
      </div>
    }
    {!hideMainSponsor && <img className='sponsor' src={mainSponsor} />}
    <div className='otherSponsorsContainer'>
      {
        otherSponsors.map((sponsor, i) => (<img key={`${sponsor}${i}`} className='otherSponsor' src={sponsor} alt='sponsor' />))
      }
    </div>
    <style jsx>
      {`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 50px;
          flex-shrink: 0;
        }

        .container.small {
          margin-bottom: 0px;
        }

        .flatContainer {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          margin-bottom: 20px;
        }

        .sponsoredText {
          color: #FFFFFF;
          font-family: 'Montserrat';
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 2px;
          line-height: 40px;
          opacity: 0.4000000059604645;
          text-align: center;
          margin-top: 20px;
        }

        .small .sponsoredText {
          display: none;
        }

        .sponsor {
          margin-top: 20px;
          width: 250px;
        }

        .small .sponsor {
          margin-top: 0px;
          width: 200px;
        }

        .flatContainer .sponsor {
          margin-top: 0px;
          margin-right: 30px;
        }

        .otherSponsorsContainer {
          margin-top: 40px;
          display: flex;
          align-items: center;
        }

        .small .otherSponsorsContainer {
          margin-top: 20px;
        }

        .flatContainer .otherSponsorsContainer {
          margin-top: 0px;
        }

        .otherSponsor {
          margin: 0px 30px;
          height: 24px;
        }

        .small .otherSponsor {
          margin: 0px 20px;
        }

        .flatContainer .otherSponsorsContainer .otherSponsor {
          margin: 0px 20px;
        }

        .divider {
          width: 684px;
          height: 3px;
        }

        @media only screen and (min-width:1600px){
          .container {
            min-height: 230px;
          }

          .flatContainer {
            min-height: 0px;
          }

          .container.small {
            min-height: unset;
          }

          .sponsor {
            width: 350px;
          }

          .sponsoredText {
            font-size: 22px;
          }

          .otherSponsor {
            height: 32px;
          }
        }
      `}
    </style>
  </div>
  )
}

sponsors.propTypes = {
  showFlatDesign: PropTypes.bool,
  showDivider: PropTypes.bool,
  mainSponsor: PropTypes.string,
  otherSponsors: PropTypes.arrayOf(PropTypes.string),
  smallerSponsor: PropTypes.bool,
  hideMainSponsor: PropTypes.bool
}

sponsors.defaultProps = {
  showDivider: false,
  showFlatDesign: false,
  mainSponsor: undefined,
  smallerSponsor: false,
  hideMainSponsor: false
}

export default sponsors
