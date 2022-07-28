import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import {
	InnerBlocks,
	useBlockProps,
	// @ts-ignore
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import { Button } from '@wordpress/components';

import './editor.scss';
import type { BlockEditProps } from '@wordpress/blocks';

const allowedBlocks = [ 'carousel-slider-block/slider-item' ];
const template = [ [ 'carousel-slider-block/slider-item' ] ];

export default function Edit( {
	isSelected,
	clientId,
}: BlockEditProps< {} > ) {
	const { hasInnerBlocks, order, selectedInnerBlock, hasSelectedInnerBlock } =
		useSelect(
			( select ) => {
				const {
					// @ts-ignore
					getBlock,
					// @ts-ignore
					getBlockOrder,
					// @ts-ignore
					getSelectedBlockClientId,
					// @ts-ignore
					getBlockParents,
					// @ts-ignore
					hasSelectedInnerBlock,
				} = select( blockEditorStore );
				const block = getBlock( clientId );

				const order = getBlockOrder( clientId );
				const selectedBlockClientId = getSelectedBlockClientId();
				const selectedBlockParents = getBlockParents(
					getSelectedBlockClientId()
				);

				const selectedInnerBlock =
					order.find( ( x: string ) =>
						selectedBlockParents.includes( x )
					) ||
					( order.includes( selectedBlockClientId )
						? selectedBlockClientId
						: null );
				return {
					hasSelectedInnerBlock: hasSelectedInnerBlock(
						clientId,
						true
					),
					hasInnerBlocks: !! ( block && block.innerBlocks.length ),
					order: getBlockOrder( clientId ) || [],
					selectedInnerBlock: selectedInnerBlock,
				};
			},
			[ clientId ]
		);

	useEffect( () => {
		if ( selectedInnerBlock ) {
			document
				.getElementById( `block-${ selectedInnerBlock }` )
				?.scrollIntoView( {
					behavior: 'auto',
					block: 'center',
					inline: 'center',
				} );
		}
	}, [ selectedInnerBlock ] );

	// @ts-ignore
	const { selectBlock } = useDispatch( blockEditorStore );

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'wp-block-carousel-slider-block-slider-items',
		},
		{
			allowedBlocks,
			template,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
			orientation: 'horizontal',
		}
	);
	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
			{ ( isSelected || hasSelectedInnerBlock ) && (
				<div className="wp-block-carousel-slider-block-slider-navigation">
					{ order.map( ( blockId: string, idx: number ) => {
						return (
							<Button
								variant="secondary"
								isPressed={ blockId === selectedInnerBlock }
								key={ blockId }
								onClick={ () => selectBlock( blockId ) }
							>
								{ idx }
							</Button>
						);
					} ) }
					<InnerBlocks.ButtonBlockAppender />
				</div>
			) }
		</div>
	);
}
