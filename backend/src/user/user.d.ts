interface IUserModel {
	_id: string;
	picture: string;
	birthday: string;
	name: string;
	address: string;
	phone_number: string;
}

interface IUserSearch {
	name?: string;
	age?: string;
	phone?: string;
}

interface IUserResponse {
	picture: string;
	name: string;
	age: number;
	address: string;
	phone: string;
}

export {
	IUserModel,
	IUserSearch,
	IUserResponse,
}