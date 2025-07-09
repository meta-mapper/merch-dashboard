import moment from 'moment';

export const createDateFilter = (startDate, endDate) => {
	//
	startDate = startDate ? moment(startDate).startOf('day') : null;
	endDate = endDate ? moment(endDate).endOf('day') : null;

	// console.log('startDate', startDate, 'endDate', endDate);

	if (startDate && endDate) {
		//
		return `created_at:>='${startDate.toISOString()}' AND created_at:<='${endDate.toISOString()}'`;
	}

	return '';
};
