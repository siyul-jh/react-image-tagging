import { useEffect, useState } from 'react';
import TaggableImage, { TagDataType } from './components/image-tagging';

const DEFAULT_STATE = {
	id: null,
	x: 0,
	y: 0,
	positionX: 0,
	positionY: 0,
	percentX: '50%',
	percentY: '50%',
};

function App() {
	const img = 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?q=80&w=4974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
	const [myTags, setMyTag] = useState<TagDataType[]>([]);

	const handleAddTag = (newTag: string) => {
		setMyTag([
			...myTags,
			{
				...DEFAULT_STATE,
				id: crypto.randomUUID(),
				content: newTag,
			},
		]);
	};
	const handleRemoveTag = (targetId: string) => {
		const updatedTags = myTags.filter((tag) => tag.id !== targetId);
		setMyTag(updatedTags);
	};
	const handleUpdateTag = (coordinate: TagDataType, targetId: string) => {
		const updatedTags = myTags.map((tag) => {
			if (tag.id === targetId) {
				return {
					...tag,
					id: targetId,
					...coordinate,
				};
			}
			return tag;
		});
		setMyTag(updatedTags);
	};
	useEffect(() => {
		if (myTags.length === 0) {
			setMyTag([
				{
					id: 'temp',
					x: 0,
					y: 0,
					positionX: 0,
					positionY: 0,
					percentX: '23%',
					percentY: '15%',
					content: 'TEMP',
				},
			]);
		}
	}, [myTags.length]);
	return (
		<div className="p-5 space-y-5">
			<form
				className="flex gap-5"
				onSubmit={(e) => {
					e.preventDefault();
					handleAddTag(e.currentTarget.tag.value);
					e.currentTarget.reset();
				}}
			>
				<input className="flex ml-[10px border-sky-400 border p-3 outline-none rounded" autoComplete="off" type="text" name="tag" required />
				<button type="submit" className="bg-sky-400 text-white font-bold px-5 rounded">
					추가하기
				</button>
			</form>
			<TaggableImage src={img} tags={myTags} onTagRemove={handleRemoveTag} onTagUpdate={handleUpdateTag} />
		</div>
	);
}

export default App;
