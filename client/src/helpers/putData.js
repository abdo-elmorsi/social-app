import axios from 'axios';

const putData = async (url = '', data, token) => {
	const response = await axios({
		method: 'put',
		url: `${"http://localhost:3001/api/"}${url}`,
		data: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	})
	return response.data;
}

export default putData;