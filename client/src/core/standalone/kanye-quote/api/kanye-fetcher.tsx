import axios from 'axios';
import Configuration from '../../../../configuration';

const FetchKanyeQuote = async () => {
  try {
    const response = await axios.get(Configuration.getKanyeQuoteEndpoint());

    return response.data.quote as string;
  } catch (error) {
    console.error("Can't get Kanye quote");
    throw error;
  }
};

export default FetchKanyeQuote;
