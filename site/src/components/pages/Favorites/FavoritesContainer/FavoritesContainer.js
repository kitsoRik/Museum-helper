import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import "./FavoritesContainer.scss";
import ContainerItem from "./ContainerItem";
import {
	changeFavoritesGroups,
	changeEditable,
} from "../../../../actions/favorites-actions";
import EditButton from "./EditButton";

const onDragEnd = (result, groups, setGroups) => {
	if (!result.destination) return;
	const { source, destination } = result;

	const sourceGroupIndex = groups.findIndex(
		(g) => g.id == source.droppableId
	);
	//                                              int == string
	const destinationGroupIndex = groups.findIndex(
		(g) => g.id == destination.droppableId
	);
	//                                              int == string

	if (sourceGroupIndex === destinationGroupIndex) {
		const sourceItem = groups[sourceGroupIndex].items[source.index];
		const destinationItem =
			groups[destinationGroupIndex].items[destination.index];

		const newGroups = groups.filter(() => true);

		newGroups[sourceGroupIndex].items[source.index] = destinationItem;
		newGroups[destinationGroupIndex].items[destination.index] = sourceItem;
		setGroups(newGroups);
	} else {
		const sourceItem = groups[sourceGroupIndex].items[source.index];

		const newGroups = groups.map((g) => {
			return {
				...g,
				items: g.items.filter(() => true),
			};
		});
		newGroups[sourceGroupIndex].items = newGroups[
			sourceGroupIndex
		].items.filter((i) => i.id !== sourceItem.id);

		let newItems = newGroups[destinationGroupIndex].items.filter(
			() => true
		);
		newItems.splice(destination.index, 0, sourceItem);
		newGroups[destinationGroupIndex].items = newItems;
		setGroups(newGroups);
	}
};

const FavotiresContainer = (props) => {
	const { editable, groups, otherGroup, changeFavoritesGroups } = props;
	const { changeEditable } = props;
	const containerItems = groups.concat([otherGroup]).map((group, index) => {
		const onGroupNameChanged = (name) => {
			let newGroups = groups.filter(() => true);
			newGroups[index].name = name;
			changeFavoritesGroups(newGroups);
		};
		const onGroupDescriptionChanged = (description) => {
			console.log(description);
			let newGroups = groups.filter(() => true);
			newGroups[index].description = description;
			changeFavoritesGroups(newGroups);
		};
		return (
			<ContainerItem
				key={group.id.toString()}
				group={group}
				editing={editable}
				onGroupNameChanged={onGroupNameChanged}
				onGroupDescriptionChanged={onGroupDescriptionChanged}
			/>
		);
	});

	const switchEditable = (value) => {
		if (value) {
			changeEditable({ editable: true });
		} else {
			changeEditable({ editable: false, groups });
		}
	};

	return (
		<div className="favorites-container">
			<DragDropContext
				onDragEnd={(result) =>
					onDragEnd(
						result,
						groups.concat([otherGroup]),
						changeFavoritesGroups
					)
				}
			>
				<div className="favorites-items-container">
					{containerItems}
				</div>
			</DragDropContext>
			<EditButton editable={editable} switchEditable={switchEditable} />
		</div>
	);
};

const mapStateToProps = ({ favorites: { editable, groups, otherGroup } }) => {
	return {
		editable,
		groups,
		otherGroup,
	};
};

export default connect(mapStateToProps, {
	changeEditable,
	changeFavoritesGroups,
})(FavotiresContainer);
