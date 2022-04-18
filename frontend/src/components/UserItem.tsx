import React, { memo } from "react";
import { IUserRender } from "../user";

function UserItem(props: IUserRender) {
	return (
		<tr
			className="children:p-2 border-2 border-gray-200 text-gray-800"
			data-testid="user-item"
		>
			<td>
				<img
					src={props.picture}
					className="inline mr-2 w-10"
					loading="lazy"
				/>
				{props.name}
			</td>
			<td>{props.age}</td>
			<td>{props.phone}</td>
			<td>{props.address}</td>
		</tr>
	)
}

export default memo(UserItem);