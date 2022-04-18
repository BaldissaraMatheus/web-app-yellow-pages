interface IUserRender {
	picture: string;
	name: string;
	age: number;
	address: string;
	phone: string;
}

interface IUserSearch {
	name?: string;
	age?: string;
	phone?: string;
}

export {
	IUserRender,
	IUserSearch,
}