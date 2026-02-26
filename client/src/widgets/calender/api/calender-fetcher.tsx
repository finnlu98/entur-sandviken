import axios from 'axios';
import moment from 'moment';
import configuration from '../../../configuration';
import type { CalenderResponse } from '../model/calender-response';
const CalenderFetcher = async (calenderKey: string, calenderId: string) => {
  if (!calenderKey || !calenderId || calenderKey.trim() === '' || calenderId.trim() === '') {
    return;
  }

  try {
    const TIME_MIN = `${moment().format('YYYY-MM-DD')}T00:00:00Z`;

    const config = configuration.getCalenderConfig();

    const endoint = config.Endpoint.replace(':CAL_ID', calenderId)
      .replace(':API_KEY', calenderKey)
      .replace(':TIME_MIN', TIME_MIN)
      .replace(':MAX_RESULTS', config.maxResults.toString());

    const res = await axios.get<CalenderResponse>(endoint);

    res.data.items = res.data.items
      .map((item) => {
        if (item.start.dateTime === undefined) {
          item.start.dateTime = moment(item.start.date).toString();
        }
        return item;
      })
      .sort((item1, item2) => moment(item1.start.dateTime).diff(moment(item2.start.dateTime)));

    return res.data;
  } catch (error) {
    console.error("Can't get Google Calender data");
    throw error;
  }
};

export default CalenderFetcher;
