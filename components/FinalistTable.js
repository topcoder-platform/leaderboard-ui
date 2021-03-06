import PropTypes from 'prop-types'
import React from 'react'

const table = (props) => {
  const { finalists, primaryColor, smallerDesign, largeColumns, track, fullWidth, isMini, isDev, isQa, isMM } = props
  const smallClass = smallerDesign || isMini ? ' small ' : ''
  const sizeClass = largeColumns ? ' largerCells ' : ''
  const trackTableClass = (track) => {
    switch (track) {
      case 'algorithm': return 'algorithmTable'
      default: return 'f2fTable'
    }
  }
  const algorithmLeaderboard = track === 'algorithm'
  const f2fLeaderboard = fullWidth
  const isDevOrQa = isDev || isQa || isMM
  return (
    <div className={'container' + smallClass + sizeClass + `${trackTableClass(track)}`}>
      <div className='header'>
        <div className='rank'>RANK</div>
        {!isMini && <div className='competitor'>competitor</div>}
        { largeColumns && algorithmLeaderboard && <div className='algorithmFieldCell'>
          250
        </div>}
        { largeColumns && algorithmLeaderboard && <div className='algorithmFieldCell'>
          500
        </div>}
        { largeColumns && algorithmLeaderboard && <div className='algorithmFieldCell'>
          1000
        </div> }
        { largeColumns && f2fLeaderboard && !isDevOrQa && <div className='f2fPblmCell'>
          Problem 1
        </div> }
        { largeColumns && f2fLeaderboard && !isDevOrQa && <div className='f2fTestCell'>
          TESTS PASSED/TOTAL
        </div> }
        { largeColumns && f2fLeaderboard && !isDevOrQa && <div className='f2fPblmCell'>
          Problem 2
        </div> }
        { largeColumns && f2fLeaderboard && !isDevOrQa && <div className='f2fTestCell'>
          TESTS PASSED/TOTAL
        </div> }
        { largeColumns && f2fLeaderboard && !isDevOrQa && <div className='f2fPblmCell'>
          Problem 3
        </div> }
        { largeColumns && f2fLeaderboard && !isDevOrQa && <div className='f2fTestCell'>
          TESTS PASSED/TOTAL
        </div> }
        {!isMini && !isDevOrQa && <div className='points'>points</div>}
        {
          isMini &&
          <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between' }}>
            <div className='competitor'>competitor</div>
            <div className='points'>points</div>
            {!isQa && <div className='tests-passed'>{ isDev ? '% Complete' : 'tests passed'}</div>}
          </div>
        }
        {
          f2fLeaderboard && isDevOrQa &&
          <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-around' }}>
            <div className='points'>points</div>
            {!isQa && <div className='tests-passed'>{ isDev ? '% Complete' : 'tests passed'}</div>}
          </div>
        }
      </div>
      { finalists.map((profile, i) => (
        <div key={profile.handle} className='row'>
          <div className='rank'>
            <div className='rank-overlay' />
            <div className='rank-text' style={{ opacity: profile.hasOwnProperty('handle') ? '1' : '0.3' }}>
              {i + 1}
            </div>
          </div>

          { !algorithmLeaderboard && !f2fLeaderboard && <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between' }}>
            <div className={`competitor ${profile.animationClass}`}>
              <div className='avatar'>
                <img src={profile.profilePic} />
              </div>
              <img className='country-flag' src={profile.countryFlag} />
              <div className='handle' style={{ color: primaryColor }}>{profile.handle}</div>
            </div>

            <div className={`points ${profile.animationClass}`}>
              { profile.scoreLevel && <img className={`animate fade${profile.scoreLevel} infinite`} src={`/static/img/trend/${profile.scoreLevel}.png`} /> }
              { profile.points >= 0 && <div className={profile.scoreLevel ? '' : 'non-score-lvl-pt'}>
                <span className='value'>
                  {profile.points}
                </span>
                <span className='hint'>
                  POINTS
                </span>
              </div> }
            </div>

            {
              !isQa && profile.totalTestCases > 0 && <div className={`tests-passed ${profile.animationClass}`}>
                <div>
                  {
                    !isDev &&
                    <React.Fragment>
                      <span className='value'>
                        {`${profile.testsPassed} / ${profile.totalTestCases}`}
                      </span>
                      <span className='hint'>
                        TESTS
                      </span>
                    </React.Fragment>
                  }
                  {
                    isDev &&
                    <React.Fragment>
                      <span className='value'>
                        {`${parseFloat(profile.testsPassed / profile.totalTestCases * 100).toFixed(2)}%`}
                      </span>
                      <span className='hint'>
                        COMPLETED
                      </span>
                    </React.Fragment>
                  }
                </div>
              </div>
            }

            {
              !profile.hasOwnProperty('points') && <div className={`status ${profile.statusAnimationClass}`}>
                {profile.status}
              </div>
            }

          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('handle') && <div className='handleName'>
            {profile.handle}
          </div> }

          {/* Full width leaderboard, but for dev and qa */}
          { f2fLeaderboard && isDevOrQa && <React.Fragment>
            <div className={`competitor ${profile.animationClass}`}>
              <div className='avatar'>
                <img src={profile.profilePic} />
              </div>
              <img className='country-flag' src={profile.countryFlag} />
              <div className='handle' style={{ color: primaryColor }}>{profile.handle}</div>
            </div>

            <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-around' }}>
              <div className={`points ${profile.animationClass}`}>
                { profile.scoreLevel && <img className={`animate fade${profile.scoreLevel} infinite`} src={`/static/img/trend/${profile.scoreLevel}.png`} /> }
                { profile.points >= 0 && <div className={profile.scoreLevel ? '' : 'non-score-lvl-pt'}>
                  <span className='value'>
                    {profile.points}
                  </span>
                  <span className='hint'>
                    POINTS
                  </span>
                </div> }
              </div>

              {
                !isQa && profile.totalTestCases > 0 && <div className={`tests-passed ${profile.animationClass}`}>
                  <div>
                    {
                      !isDev &&
                      <React.Fragment>
                        <span className='value'>
                          {`${profile.testsPassed} / ${profile.totalTestCases}`}
                        </span>
                        <span className='hint'>
                          TESTS
                        </span>
                      </React.Fragment>
                    }
                    {
                      isDev &&
                      <React.Fragment>
                        <span className='value'>
                          {`${parseFloat(profile.testsPassed / profile.totalTestCases * 100).toFixed(2)}%`}
                        </span>
                        <span className='hint'>
                          COMPLETED
                        </span>
                      </React.Fragment>
                    }
                  </div>
                </div>
              }

              {
                !profile.hasOwnProperty('points') && <div className={`status ${profile.statusAnimationClass}`}>
                  {profile.status}
                </div>
              }
            </div>
          </React.Fragment>
          }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('roundOne') && <div className={'algorithmFieldCell ' + (profile.roundOne === 'fail' ? 'fail' : '')}>
            {profile.roundOne}
          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('roundTwo') && <div className={'algorithmFieldCell ' + (profile.roundTwo === 'fail' ? 'fail' : '')}>
            {profile.roundTwo}
          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('roundThree') && <div className={'algorithmFieldCell ' + (profile.roundThree === 'fail' ? 'fail' : '')}>
            {profile.roundThree}
          </div> }

          { largeColumns && algorithmLeaderboard && profile.hasOwnProperty('points') && <div className='totalPoints algorithmFieldCell'>
            {profile.points}
          </div> }

          {
            profile.reveal === true && <React.Fragment>
              { largeColumns && f2fLeaderboard && profile.hasOwnProperty('handle') &&
              <div className={`competitor ${profile.animationClass}`}>
                <div className='avatar'>
                  <img src={profile.profilePic} />
                </div>
                <img className='country-flag' src={profile.countryFlag} />
                <div className='handle' style={{ color: primaryColor }}>{profile.handle}</div>
              </div>
              }
              { largeColumns && f2fLeaderboard && profile.hasOwnProperty('reviews') && profile.reviews.map((review, i) => (
                <div key={`${profile.handle}-${review.challengeId}`} className={`f2fScoreTests ${profile.animationClass}`}>
                  {
                    !review.status && <React.Fragment>
                      <div className='f2fFieldCell'>{review.score}</div>
                      {
                        !isDev &&
                        <div className='f2fFieldCell'>
                          {review.testsPassed}{review.testsPassed > -1 && <span>/</span>}{review.totalTestCases}
                        </div>
                      }
                      {
                        isDev &&
                        <div className='f2fFieldCell'>
                          {review.testsPassed > -1 && `${parseFloat(review.testsPassed / profile.totalTestCases * 100).toFixed(2)}%`}
                        </div>
                      }
                    </React.Fragment>
                  }
                  {
                    review.status && <React.Fragment>
                      <div className='f2fFieldCell' />
                      <div className='f2fFieldCell'>
                        {review.status}
                      </div>
                    </React.Fragment>
                  }
                </div>
              )) }

              { largeColumns && f2fLeaderboard && profile.hasOwnProperty('points') && <div className='f2fPoints f2fFieldCell animate flipInX'>
                {profile.points}
              </div> }

              { profile.hasOwnProperty('status') && <div className='status' style={{ opacity: profile.hasOwnProperty('points') ? '1' : '0.3' }}>
                {profile.status}
              </div>
              }
            </React.Fragment>
          }
          {
            !profile.reveal && f2fLeaderboard && !isDevOrQa &&
            <React.Fragment>
              { largeColumns && f2fLeaderboard && profile.hasOwnProperty('handle') && <div className='handleName animate fadeIn'>&nbsp;
              </div> }
              <div className='status'>
                Awaiting submission
              </div>
            </React.Fragment>
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
            position: relative;
            min-width: 705px;
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

          .largerCells .row {
            min-height: 68px;
            height: 68px;
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

          .largerCells .rank-overlay {
            left: -25px;
            transform: skew(-21deg);
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

          .largerCells .header {
            background-color: rgba(0, 26, 63, 0.58);
          }

          .rank {
            min-width: 70px;
            height: 100%;
            position: relative;
            z-index: 1;
            font-size: 0.9375em;
          }

          .largerCells .rank {
            min-width: 94px;
          }

          .competitor {
            width: 180px;
            position: relative;
            text-align: left;
          }

          .small .competitor,
          .small .points,
          .small .tests-passed {
            font-size: 0.9375em;
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
            width: 24px;
            height: auto;
            position: absolute;
            z-index: 3;
            left: 56px;
            bottom: 7px;
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
            width: 125px;
          }

          .f2fTable .tests-passed {
            width: 250px;
          }

          .row .tests-passed {
            display: flex;
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
            text-transform: uppercase;
          }

          .small .status {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            text-transform: uppercase;
            padding-right: 20px;
            min-width: 350px;
          }

          .algorithmTable .competitor,
          .algorithmTable .handleName {
            width: 40%;
            padding-left: 30px;
          }

          .algorithmTable .handleName,
          .f2fTable .handleName {
            color: #FFFFFF;
            font-family: Roboto;
            font-size: 1.5625em;
            font-weight: 700;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            opacity: 0.87;
          }

          .algorithmTable .header,
          .f2fTable .header {
            text-align: left;
          }

          .algorithmTable .algorithmFieldCell {
            display: flex;
            align-items: center;
            width: 15%;
          }

          .algorithmTable .points {
            display: flex;
            align-items: center;
            width: 15%;
          }

          .algorithmTable .row .algorithmFieldCell {
            color: #5CC900;
            font-family: Roboto;
            font-size: 1.5625em;
            font-weight: 700;
            text-transform: uppercase;
          }

          .algorithmTable .row .algorithmFieldCell.fail {
            color: #F21919;
          }

          .algorithmTable .rank,
          .f2fTable .rank {
            text-align: center;
          }

          .f2fTable .competitor,
          .f2fTable .handleName {
            width: 20%;
            padding-left: 30px;
          }

          .f2fTable .f2fTestCell {
            width: 15%;
          }

          .f2fTable .f2fPblmCell {
            width: 8%;
          }

          .f2fTable .f2fPoints {
            width: 10%;
          }

          .f2fTable .points {
            width: 10%;
          }

          .f2fFieldCell {
            display: flex;
            align-items: center;
            color: #5CC900;
            font-family: Roboto;
            font-size: 1.5625em;
            font-weight: 700;
            text-transform: uppercase;
          }

          .f2fFieldCell.f2fTestCell {
            font-weight: 400;
          }

          .f2fScoreTests {
            display: flex;
            width: 23%;
          }

          .f2fScoreTests .f2fFieldCell:first-child {
            width: 34%;
          }

          .f2fScoreTests .f2fFieldCell:nth-child(2) {
            width: 66%;
          }

          .non-score-lvl-pt {
            margin-left: 28.5px;
          }

          .animate .non-score-lvl-pt {
            margin-left: 0;
          }

          .small .competitor {
            width: 250px;
            padding-left: 0;
          }

          // The MIT License (MIT)

          // Copyright (c) 2019 Daniel Eden

          // Permission is hereby granted, free of charge, to any person obtaining a copy
          // of this software and associated documentation files (the "Software"), to deal
          // in the Software without restriction, including without limitation the rights
          // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          // copies of the Software, and to permit persons to whom the Software is
          // furnished to do so, subject to the following conditions:

          // The above copyright notice and this permission notice shall be included in all
          // copies or substantial portions of the Software.

          // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          // SOFTWARE.

          // <---- animate.css BEGIN --->
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translate3d(0, 100%, 0);
            }

            to {
              opacity: 1;
              transform: translate3d(0, -50%, 0);
            }
          }

          @keyframes fadeDown {
            from {
              opacity: 0;
              transform: translate3d(0, -100%, 0);
            }

            to {
              opacity: 1;
              transform: translate3d(0, 50%, 0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes flipInX {
            from {
              transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
              animation-timing-function: ease-in;
              opacity: 0;
            }

            40% {
              transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
              animation-timing-function: ease-in;
            }

            60% {
              transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
              opacity: 1;
            }

            80% {
              transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
            }

            to {
              transform: perspective(400px);
            }
          }

          @keyframes flash {
            from,
            50%,
            to {
              opacity: 1;
            }

            25%,
            75% {
              opacity: 0;
            }
          }

          .animate {
            animation-duration: 3s;
            animation-fill-mode: both;
          }

          .infinite {
            animation-iteration-count: infinite;
          }

          .fadeup {
            animation-name: fadeUp;
          }

          .fadedown {
            animation-name: fadeDown;
          }

          .fadeIn {
            animation-name: fadeIn;
          }

          .flipInX {
            backface-visibility: visible !important;
            animation-name: flipInX;
          }

          .flash {
            animation-name: flash;
          }

          .hidden {
            visibility: hidden;
          }

          // <---- animate.css END --->

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
  isMini: PropTypes.bool,
  largeColumns: PropTypes.bool,
  track: PropTypes.string
}

table.defaultProps = {
  smallerDesign: false,
  isMini: false,
  largeColumns: false,
  track: ''
}

export default table
