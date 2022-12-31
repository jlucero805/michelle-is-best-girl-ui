import axios from 'axios';

export const getReasons = async () => {
	const url = 'https://rr583qqx7d.execute-api.us-west-2.amazonaws.com/contentRefreshService';
	const response = await axios.get(url);
	return response.data;
}

export const getTodaysReason = (reasons) =>
	reasons[reasons.length - 1] ;

export const getPreviousReasons = (reasons) => 
	reasons
		.filter(reason => reason !== reasons[reasons.length - 1]);
