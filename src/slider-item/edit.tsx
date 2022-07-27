import { __ } from '@wordpress/i18n';
// @ts-ignore
import {
	InnerBlocks,
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const allowedBlocks = [ 'core/image', 'core/cover' ];
const template = [ [ 'core/image', { sizeSlug: 'full' } ] ];

export default function Edit( { clientId } ) {
	const blockProps = useBlockProps();
	const { hasInnerBlocks } = useSelect(
		( select ) => {
			// @ts-ignore
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			};
		},
		[ clientId ]
	);
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks,
		template,
		templateLock: 'all',
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );
	return <div { ...innerBlocksProps } />;
}
