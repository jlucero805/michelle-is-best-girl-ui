import { useEffect, useState } from 'react';
import {
  getPreviousReasons,
  getReasons,
  getTodaysReason, 
  reasons,
} from './reasons';
import './App.css';

const PAGE = {
  DAILY_REASON: 'DAILY_REASON',
  PREVIOUS_REASONS: 'PREVIOUS_REASONS',
  PREVIOUS_DETAIL: 'PREVIOUS_DETAIL',
};

const BTN_TEXT = {
  DAILY_REASON: 'Previous Reasons',
  PREVIOUS_REASONS: 'Daily Reason',
  PREVIOUS_DETAIL: 'Return',
};

function App() {
  const [page, setPage] = useState(PAGE.DAILY_REASON);
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [btnText, setBtnText] = useState(BTN_TEXT.DAILY_REASON);
  const [previousReasons, setPreviousReasons] = useState([]);
  const [reasons, setReasons] = useState([]);

  useEffect(() => {
    (async () => {
      const reasons = await getReasons();
      setReasons(reasons);
      console.log(reasons);
      _setTodaysReason(reasons);
      const previous = getPreviousReasons(reasons);
      setPreviousReasons(previous);
    })();
  }, []);

  const setTodaysReason = () => {
    const todaysReason = getTodaysReason(reasons);
    setTitle(todaysReason.title);
    setReason(todaysReason.reason);
    setDate(todaysReason.date);
  };

  const _setTodaysReason = (reasons) => {
    const todaysReason = getTodaysReason(reasons);
    setTitle(todaysReason.title);
    setReason(todaysReason.reason);
    setDate(todaysReason.date);
  };

  const previousHandler = () => {
    if (page === PAGE.DAILY_REASON) {
      setBtnText(BTN_TEXT.PREVIOUS_REASONS);
      setPage(PAGE.PREVIOUS_REASONS);
    } else if (page === PAGE.PREVIOUS_REASONS) {
      setBtnText(BTN_TEXT.DAILY_REASON);
      setPage(PAGE.DAILY_REASON);
      setTodaysReason();
    } else if (page === PAGE.PREVIOUS_DETAIL) {
      setBtnText(BTN_TEXT.PREVIOUS_REASONS);
      setPage(PAGE.PREVIOUS_REASONS);
    }
  };

  const previousDetailHandler = (reason) => {
    setPage(PAGE.PREVIOUS_DETAIL);
    setBtnText(BTN_TEXT.PREVIOUS_DETAIL);
    setDate(reason.date);
    setTitle(reason.title);
    setReason(reason.reason);
  };

  const todaysReasonHandler = () => {
    setBtnText(BTN_TEXT.DAILY_REASON);
    setPage(PAGE.DAILY_REASON);
    setTodaysReason();
  };

  return (
    <div className='main'>
      <div className='nav'>
        <h1 className='clean'> Michelle &#10084; </h1>
      </div>
      <div className='content'>
        <div className='content-header'>
          <div className='btn' onClick={previousHandler}>{btnText}</div>
        </div>
        <div className='content-content'>
          {/* PAGE 1 */}
          {page === PAGE.DAILY_REASON
            ?  <>
              <h1 className="big-title">Daily Reason</h1>
              <div className='reason'>
                <h2>{title}</h2>
                <h4>{date}</h4>
                <p>{reason}</p>
              </div>
            </>
            : null}
          {/* PAGE 2 */}
          {page === PAGE.PREVIOUS_REASONS
            ?  <>
              <h1>Previous Reasons</h1>
              <div className='reason'>
                {previousReasons.map(reason => (<div key={reason.date} className='reason-item' onClick={() => previousDetailHandler(reason)}>
                  <div> {reason.title}</div>
                  <div> {reason.date}</div>
                </div>))}
                <div className='todays' onClick={todaysReasonHandler}> Todays Reason </div>
              </div>
            </>
            : null}
          {/* PAGE 3 */}
          {page === PAGE.PREVIOUS_DETAIL
            ?  <>
              <h1>Previous Reasons</h1>
              <div className='reason'>
                <h2>{title}</h2>
                <h4>{date}</h4>
                <p>{reason}</p>
              </div>
            </>
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
