const checkValue = (value: number) => value < 10 ? `0${value}` : value;

const convertDate = (date: number) => {
	const current = new Date(date);
	const year = current.getFullYear();
	const month = checkValue(current.getMonth() + 1);
	const day = checkValue(current.getDate());
	const hours = checkValue(current.getHours());
	const minutes = checkValue(current.getMinutes());

	return `${hours}:${minutes} ${day}:${month}:${year}`;
};

export { convertDate };
