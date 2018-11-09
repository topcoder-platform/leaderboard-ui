import PropTypes from 'prop-types'

const table = (props) => {
  const { finalists, primaryColor, smallerDesign } = props
  const smallClass = smallerDesign ? ' small' : ''
  return (
    <div className={'container' + smallClass}>
      <div className='header'>
        <div className='rank'>RANK</div>
        <div className='competitor'>competitor</div>
        <div className='points'>points</div>
        {!smallerDesign && <div className='tests-passed'>tests passed</div>}
        {!smallerDesign && <div className='challenges'>challenges</div>}
      </div>
      { finalists.map((profile, i) => (
        <div key={i} className='row'>
          <div className='rank'>
            <div className='rank-overlay' />
            <div className='rank-text'>
              {i + 1}
            </div>
          </div>

          { profile.hasOwnProperty('points') && <div style={{ display: 'flex' }}>
            <div className='competitor'>
              <div className='avatar'>
                <img src={profile.profilePic} />
              </div>
              <img className='country-flag' src={profile.countryFlag} />
              <div className='handle' style={{ color: primaryColor }}>{profile.handle}</div>
            </div>

            <div className='points'>
              {/* <img src='/static/img/trend/down.png' /> */}
              <div>
                <span className='value'>
                  {profile.points}
                </span>
                <span className='hint'>
                  POINTS
                </span>
              </div>
            </div>

            {!smallerDesign && <div className='tests-passed'>
              <div>
                <span className='value'>
                  {profile.testsPassed}
                </span>
                <span className='hint'>
                  TESTS
                </span>
              </div>
            </div>}

            {!smallerDesign && <div className='challenges'>
              <div>
                <span className='value'>
                  {profile.challenges}
                </span>
                <span className='hint'>
                  CHALLENGES
                </span>
              </div>
            </div>}
          </div> }
          { profile.hasOwnProperty('status') && <div className='status'>
            {profile.status}
          </div>
          }
        </div>
      ))

      }
      <style jsx>
        {`
          .container {
            height: 100%;
            box-shadow: -1px 0px 10px 0px #0000005c;
            z-index: 3;
            display: flex;
            flex-direction: column;
          }

          .row {
            display: flex;
            min-height: 62px;
            height: 62px;
            overflow: hidden;
            color: #ffffff;
            flex-grow: 1;
            background-image: linear-gradient(-180deg,#00385561 0%,#000b1161 94%);
          }

          .rank-overlay {
            background: #003855;
            box-shadow: 1px 0px 9px 0 #000000, inset 0px 1px 0px 0 rgba(255,255,255,0.34), inset 5px -39px 54px -15px rgba(0, 0, 0, 0.92);
            width: 100%;
            height: 100%;
            transform: skew(-15deg);
            position: absolute;
            left: -17px;
            width: 120%;
            z-index: -1;
          }

          .rank-text {
            line-height: 70px;
            text-align: center;
            height: 100%;
            z-index: 3;
            color: #FFFFFF;
            font-family: Helvetica;
            font-size: 24px;
            font-weight: 700;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .header {
            background-color: #002133;
            height: 48px;
            min-height: 48px;
            color: #ffffff77;
            font-family: Helvetica;
            font-size: 13px;
            font-weight: 700;
            line-height: 48px;
            text-align: center;
            display: flex;
            text-transform: uppercase;
            z-index: -1;
          }

          .rank {
            width: 70px;
            position: relative;
            z-index: 1;
          }

          .competitor {
            width: 180px;
            position: relative;
            text-align: left;
          }

          .small .competitor {
            width: 250px;
          }

          .row .competitor {
            display: flex;
            align-items: center;
          }

          .avatar {
            height: 100%;
            width: 70px;
            transform: skew(-14deg);
            overflow: hidden;
            left: -11px;
            position: absolute;
          }

          .avatar img {
            height: 125px;
            margin-top: -18px;
            margin-left: -15px;
            transform: skew(14deg);
          }

          .country-flag {
            height: 26px;
            width: 24px;
            position: absolute;
            z-index: 3;
            left: 48px;
            top: 36px;
          }

          .handle {
            margin-left: 80px;
            font-size: 16px;
            font-weight: 800;
            width: 198px;
            text-align: left;
          }

          .points {
            width: 122px;
            text-align: center;
          }

          .row .points {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .row span {
            display: block;
          }

          .hint {
            font-size: 13px;
            font-weight: 700;
            opacity: 0.300000011920929;
            width: 54px;
            text-align: left;
          }

          .value {
            font-size: 20px;
            font-weight: 700;
            text-align: left;
          }

          .points img {
            width: 18.5px;
            margin-right: 10px;
          }

          .tests-passed {
            width: 120px;
          }

          .row .tests-passed {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .challenges {
            width: 120px;
          }

          .row .challenges {
            display: flex;
            padding-left: 20px;
            align-items: center;
          }

          .status {
            color: #FFFFFF;
            font-size: 20px;
            font-weight: 700;
            opacity: 0.300000011920929;
            width: 100%;
            text-align: center;
            line-height: 70px;
          }

          @media only screen and (min-width:1800px){
            .competitor {
              width: 250px;
            }
          }

          @media only screen and (min-width:1920px){
            .competitor {
              width: 320px;
            }

            .handle {
              font-size: 18px;
            }
          }
        `}
      </style>
    </div>
  )
}

table.propTypes = {
  finalists: PropTypes.arrayOf(PropTypes.object).isRequired,
  primaryColor: PropTypes.string.isRequired,
  smallerDesign: PropTypes.bool
}

table.defaultProps = {
  smallerDesign: false
}

export default table
