// @ts-ignore
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
	const blockProps = useBlockProps.save( {
		className: 'swiper-slide',
	} );
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
}
