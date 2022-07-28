// @ts-ignore
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'swiper',
	} );
	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'swiper-wrapper',
	} );
	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}
