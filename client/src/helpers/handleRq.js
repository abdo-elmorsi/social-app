import axios from 'axios';

const handleRq = async (method = "get", url = '', data, token = "") => {
	if (method === "get") {
		const response = await axios({
			method: "GET",
			url: `${"http://localhost:3001/api/"}${url}`,
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
		return response.data;
	} else {
		const response = await axios({
			method: method,
			url: `${"http://localhost:3001/api/"}${url}`,
			data: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
		})
		return response.data;
	}
}

export default handleRq;