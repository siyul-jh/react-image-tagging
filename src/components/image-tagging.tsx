import { useCallback, useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { cn } from '../core/function/cn';

export type TagDataType = {
	id?: string | null;
	x: number;
	y: number;
	positionX: number;
	positionY: number;
	percentX: string;
	percentY: string;
	content?: string;
};

type TaggableImageProps = {
	src: string;
	alt?: string;
	tags: TagDataType[];
	allowAddingTags?: boolean;
	onTagAdd?: (tag: string) => void;
	onTagRemove?: (targetId: string) => void;
	onTagUpdate?: (coordinate: TagDataType, targetId: string) => void;
	removable?: boolean;
	hoverDeleteIconColor?: string;
	deleteIconColor?: string;
	allowEmptyTags?: boolean;
};

const TaggableImage = ({ src, alt = '', tags, onTagRemove, onTagUpdate, removable = true, allowEmptyTags = false, allowAddingTags = true }: TaggableImageProps) => {
	const nodeRef = useRef(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const convertCoordinatesToImage = useCallback((obj?: { x: number | string; y: number | string } | null): { x: number; y: number } => {
		const imageDetails = imageRef.current?.getBoundingClientRect();
		if (obj == null) return { x: 0, y: 0 };
		if (imageDetails == null) return { x: 0, y: 0 };
		const currentX = obj.x.toString().replace('%', '');
		const currentY = obj.y.toString().replace('%', '');
		console.log(currentX);
		return { x: (Number(currentX) * imageDetails.width) / 100, y: (Number(currentY) * imageDetails.height) / 100 };
	}, []);

	const removeTag = (targetId: string) => {
		onTagRemove?.(targetId);
	};

	const onStop = (_: DraggableEvent, data: DraggableData, targetId: string) => {
		const imageDetails = imageRef.current?.getBoundingClientRect();
		if (imageDetails == null) return;
		const x = data.x;
		const y = data.y;

		const positionXInPercentage = `${(x * 100) / imageDetails.width}%`;
		const positionYInPercentage = `${(y * 100) / imageDetails.height}%`;

		const normalizedXPosition = parseFloat((x / imageDetails.width).toFixed(1));
		const normalizedYPosition = parseFloat((y / imageDetails.height).toFixed(1));

		onTagUpdate?.(
			{
				x: normalizedXPosition,
				y: normalizedYPosition,
				percentX: positionXInPercentage,
				percentY: positionYInPercentage,
				positionX: x,
				positionY: y,
			},
			targetId
		);
	};

	return (
		<div className="relative inline-block">
			<img ref={imageRef} src={src} alt={alt} width="100%" height="auto" />
			<div className="absolute top-0 left-0 w-full h-full bg-black/25 cursor-pointer">
				<div className="w-full h-full relative overflow-hidden">
					{tags &&
						tags.length > 0 &&
						tags.map((tag, idx) => {
							return (
								<Draggable
									key={idx}
									nodeRef={nodeRef}
									onStop={(e, data) => onStop(e, data, tag?.id ?? '')}
									bounds="parent"
									defaultClassName="absolute"
									defaultPosition={convertCoordinatesToImage({
										x: tag.percentX,
										y: tag.percentY,
									})}
								>
									<div
										ref={nodeRef}
										className={cn('inline-flex p-3 rounded-[6px] drop-shadow-sm text-black bg-white gap-5 flex-col')}
										style={{
											transform: `${tag.x > 0.6 ? 'translateX(-100%)'.concat(tag.y > 0.6 ? 'translateY(-100%)' : '') : tag.y > 0.6 && 'translateY(-100%)'}`,
										}}
									>
										<div className="flex items-center gap-5">
											<p className="truncate cursor-default text-2xl w-full">{tag.content ?? idx}</p>
											{removable && (
												<div className={cn('cursor-pointer')} onClick={() => removeTag(tag.id ?? '')}>
													<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M4.22165 19.7803C3.92876 19.4875 3.92876 19.0126 4.22165 18.7197L10.9392 12.0021L4.22168 5.28453C3.92879 4.99164 3.92879 4.51676 4.22168 4.22387C4.51458 3.93098 4.98945 3.93098 5.28234 4.22387L11.9998 10.9415L18.7173 4.22396C19.0102 3.93106 19.4851 3.93106 19.778 4.22396C20.0709 4.51685 20.0709 4.99172 19.778 5.28461L13.0605 12.0021L19.7781 18.7196C20.071 19.0125 20.071 19.4874 19.7781 19.7802C19.4852 20.0731 19.0103 20.0731 18.7174 19.7802L11.9998 13.0628L5.28231 19.7803C4.98942 20.0732 4.51455 20.0732 4.22165 19.7803Z"
															fill="black"
														/>
													</svg>
												</div>
											)}
										</div>
										<div>
											<p>X: {tag?.positionX}</p>
											<p>Y: {tag?.positionY}</p>
											<p>cX: {tag?.percentX}</p>
											<p>cY: {tag?.percentY}</p>
										</div>
									</div>
								</Draggable>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default TaggableImage;
