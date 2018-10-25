import PropTypes from 'prop-types'

const sponsors = (props) => (
  <div className='container'>
    {props.showDivider && <img className='divider' src='/static/img/divider.png' alt='divider' />}
    <div className='sponsoredText'>
      SPONSORED BY
    </div>
    <img className='sponsor' src={props.mainSponsor} alt='sponsor' />
    <div className='otherSponsorsContainer'>
      {
        props.otherSponsors.map((sponsor, i) => (<img key={`${sponsor}${i}`} className='otherSponsor' src={sponsor} alt='sponsor' />))
      }
    </div>
    <style jsx>
      {`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 50px;
          min-height: 200px;
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

        .sponsor {
          margin-top: 20px;
          width: 250px;
        }

        .otherSponsorsContainer {
          margin-top: 40px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .otherSponsor {
          margin: 0px 30px;
          width: 125px;
        }

        .divider {
          width: 684px;
          height: 3px;
        }

        @media only screen and (min-width:1600px){
          .container {
            min-height: 230px;
          }

          .sponsor {
            width: 350px;
          }

          .sponsoredText {
            font-size: 22px;
          }

          .otherSponsor {
            width: 150px;
          }
        }
      `}
    </style>
  </div>
)

sponsors.propTypes = {
  showDivider: PropTypes.bool,
  mainSponsor: PropTypes.string,
  otherSponsors: PropTypes.arrayOf(PropTypes.string)
}

sponsors.defaultProps = {
  showDivider: false,
  mainSponsor: '/static/img/sponsor.png'
}

export default sponsors
