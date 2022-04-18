import React, { memo } from "react";
import { IUserRender } from "../user";

interface IUsersListProps {
	users: IUserRender[];
}

function UsersList(props: IUsersListProps) {
	console.log('rendered!')
	return (
		<table className="table-fixed w-full shadow-lg mb-4">
			<thead>
				<tr className="children:p-2 text-gray-800 text-left border-2 border-gray-200">
					<th>Name</th>
					<th>Age</th>
					<th>Phone</th>
					<th>Address</th>
				</tr>
			</thead>
			<tbody>
				{props.users.map((user, i) => (
					<tr
						className="children:p-2 border-2 border-gray-200 text-gray-800"
						key={`user-${i}`}
						data-testid="user-item"
					>
						<td>
							<img
								src={`data:image/png;base64, ${user.picture}`}
								className="inline mr-2 w-10"
								loading="lazy"
							/>
							{user.name}
						</td>
						<td>{user.age}</td>
						<td>{user.phone}</td>
						<td>{user.address}</td>
					</tr>

				))}
			</tbody>
		</table>
	)
}

function areUsersListsPropsEqual(prevProps: IUsersListProps, nextProps: IUsersListProps) {
	const prevUsersList = JSON.stringify(prevProps.users);
	const nextUsersList = JSON.stringify(nextProps.users);
	return prevUsersList === nextUsersList;
}

export default memo(UsersList, areUsersListsPropsEqual);