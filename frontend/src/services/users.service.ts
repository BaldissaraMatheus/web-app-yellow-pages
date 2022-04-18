import { API_URL } from "../utils/constants"

function findAll(searchParams: { name?: string, age?: string, phone?: string }) {
	const queryParams = Object.entries(searchParams)
		.filter(entry => entry[1] !== undefined)
		.map(entry => `${entry[0]}=${entry[1]}`)
		.join('&');
	return fetch(`${API_URL}/users?${queryParams}`)
		.then(res => res.json())
}

export default {
	findAll,
}