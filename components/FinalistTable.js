import PropTypes from 'prop-types'

const table = (props) => {
  const { finalists, primaryColor, smallerDesign, largeColumns } = props
  const smallClass = smallerDesign ? ' small ' : ''
  const sizeClass = largeColumns ? ' largerCells ' : ''
  console.log(largeColumns, sizeClass)
  return (
    <div className={'container' + smallClass + sizeClass}>
      <div className='header'>
        <div className='rank'>RANK</div>
        <div className='competitor'>competitor</div>
        <div className='points'>points</div>
        {!smallerDesign && <div className='tests-passed'>tests passed</div>}
      </div>
      { finalists.map((profile, i) => (
        <div key={i} className='row'>
          <div className='rank'>
            <div className='rank-overlay' />
            <div className='rank-text' style={{ opacity: profile.hasOwnProperty('profilePic') ? '1' : '0.3' }}>
              {i + 1}
            </div>
          </div>

          { profile.hasOwnProperty('points') && <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between' }}>
            <div className='competitor'>
              <div className='avatar'>
                <img src={profile.profilePic} />
              </div>
              <img className='country-flag' src={profile.countryFlag} />
              <div className='handle' style={{ color: primaryColor }}>{profile.handle}</div>
            </div>

            <div className='points'>
              { profile.hasOwnProperty('scoreLevel') && <img src={`/static/img/trend/${profile.scoreLevel}.png`} /> }
              { profile.points.length > 0 && <div>
                <span className='value'>
                  {profile.points}
                </span>
                <span className='hint'>
                  POINTS
                </span>
              </div> }
            </div>

            {!smallerDesign && <div className='tests-passed'>
              <div>
                <span className='value'>
                  {profile.testsPassed} / {profile.totalTestCases}
                </span>
                <span className='hint'>
                  TESTS
                </span>
              </div>
            </div>}

          </div> }
          { profile.hasOwnProperty('status') && <div className='status' style={{ opacity: profile.hasOwnProperty('points') ? '1' : '0.3' }}>
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
            background-image: linear-gradient(180deg,rgba(13, 30, 90, 0.5) 0%,rgba(0, 1, 17, 0.5) 94%);
            box-shadow: inset 0 -1px 15px 0 rgba(255, 255, 255, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
          }

          .rank-overlay {
            background: linear-gradient(180deg,rgba(13,30,90,0.5) 0%,rgba(0,1,17,0.5) 94%);
            box-shadow: 2px 2px 9px 0 #000000, inset 0 1px 0 0 rgba(255,255,255,0.20);
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
            font-size: 2em;
            font-weight: 700;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .emptyRow {
            color: #FFFFFF;
            font-size: 1.25em;
            font-weight: 700;
            opacity: 0.3;
            flex-grow: 1;
            text-align: center;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 20px;
          }

          .header {
            background-color: #002133;
            height: 48px;
            min-height: 48px;
            color: #ffffff77;
            font-family: Helvetica;
            font-size: 1em;
            font-weight: 700;
            line-height: 48px;
            text-align: center;
            display: flex;
            text-transform: uppercase;
            z-index: -1;
          }

          .rank {
            min-width: 70px;
            height: 100%;
            position: relative;
            z-index: 1;
          }

          .competitor {
            width: 180px;
            position: relative;
            text-align: left;
            font-size: 0.9375em;
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
            left: -3px;
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
            left: 45px;
            bottom: 10px;
          }

          .handle {
            margin-left: 90px;
            font-size: 1.5625em;
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
            padding-right: 15px;
          }

          .largerCells .points {
            width: 160px;
          }

          .largerCells .competitor {
            width: 300px;
          }

          .row span {
            display: block;
          }

          .hint {
            font-size: 0.9375em;
            font-weight: 700;
            opacity: 0.300000011920929;
            width: 54px;
            text-align: left;
          }

          .value {
            font-size: 1.75em;
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

          .status {
            color: #FFFFFF;
            font-size: 1.25em;
            font-weight: 700;
            opacity: 0.300000011920929;
            width: 100%;
            text-align: center;
            line-height: 70px;
          }

          .small .status {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            text-transform: uppercase;
            padding-right: 20px;
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
              font-size: 1.125em;
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
  smallerDesign: PropTypes.bool,
  largeColumns: PropTypes.bool
}

table.defaultProps = {
  smallerDesign: false,
  largeColumns: false
}

export default table
