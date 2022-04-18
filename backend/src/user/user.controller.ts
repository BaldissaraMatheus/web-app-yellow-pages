import dayjs from 'dayjs';
import { readFile } from 'fs/promises';
import { IUserModel, IUserResponse, IUserSearch } from './user';

async function encodeToBase64(filePath: string) {
	try {
		const img = await readFile(`${process.cwd()}/src/data/images/${filePath}`, { encoding: 'base64' });
		return img;
	} catch (err) {
		console.log(err);
		return null;
	}
}

async function findAll(searchParams: IUserSearch): Promise<{ users: IUserResponse[], total: number }> {
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
		users = users.filter(user => user.phone_number === searchParams.phone);
	}
	let usersWithImage: any[] = await Promise.all(
		users.map(async (user) => ({ ...user, picture: await encodeToBase64(user.picture) })
	));

	const newUsers: IUserResponse[] = usersWithImage.map(user => ({
		address: user.address,
		name: user.name,
		picture: user.picture,
		phone: user.phone_number,
		age: dayjs().diff(dayjs(user.birthday.substring(0, 10)), 'years'),
	}));

	return {
		users: newUsers,
		total,
	}
}

export default {
	findAll,
}