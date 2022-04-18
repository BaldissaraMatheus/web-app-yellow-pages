import dayjs from 'dayjs';
import { readFile } from 'fs/promises';
import { IUserModel, IUserResponse, IUserSearch } from './user';

async function findAll(searchParams: IUserSearch): Promise<{ users: any[], total: number }> {
	const fileContent = await readFile(`${process.cwd()}/src/data/contacts.json`, 'utf-8');
	let users: IUserModel[] = JSON.parse(fileContent);
	const total = users.length;
	if (searchParams.name) {
		// @ts-ignore
		users = users.filter(user => user.name.includes(searchParams.name));
	}
	if (searchParams.age) {
		users = users.filter(user => 
			dayjs()
				.diff(user.birthday.substring(0, 10), 'years') === Number(searchParams.age)
		);
	}
	if (searchParams.phone) {
		// @ts-ignore
		users.find(user => user.phone_number === phone);
	}
	const newUsers: IUserResponse[] = users.map(user => ({
		address: user.address,
		name: user.name,
		picture: user.picture,
		phone: user.phone_number,
		age: dayjs().diff(dayjs(user.birthday.substring(0, 10)), 'years'),
	}))
	return {
		users: newUsers,
		total,
	}
}

export default {
	findAll,
}