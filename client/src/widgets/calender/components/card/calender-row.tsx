import moment, { type Moment } from 'moment';
import type { CalendarEvent } from '../../api/calender-ical-fetcher';

interface CalenderRowProps {
  item: CalendarEvent;
  hiearchy: string;
}

const CalenderRow: React.FC<CalenderRowProps> = ({ item, hiearchy }) => {
  function formatDate(date: Moment | undefined) {
    if (date === undefined) return 'Unkown date';

    const now = moment();
    const momentDate = moment.isMoment(date) ? date : moment(date);
    const diffDays = momentDate.clone().startOf('day').diff(now.startOf('day'), 'days');

    if (diffDays === 0) {
      return `Today`;
    } else if (diffDays === 1) {
      return `Tomorrow`;
    } else if (diffDays === 2) {
      return `In 2 days`;
    } else if (diffDays === 3) {
      return `In 3 days`;
    } else {
      return momentDate.format('dddd MMM Do');
    }
  }

  function formatSummary(summary: string | undefined) {
    return summary ?? 'Unkown activity';
  }

  return (
    <div className={`standard-rows ${hiearchy}-item`}>
      <div>
        <div className="date-row">
          <div className={`${hiearchy}-item-date`}>🗓️ {item && formatDate(item.start)}</div>
        </div>
        <div className={`summary ${hiearchy}-item-summary`}>
          {item && formatSummary(item.summary)}
        </div>
      </div>
    </div>
  );
};
export default CalenderRow;
