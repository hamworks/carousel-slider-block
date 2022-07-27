import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __(
				'Carousel Slider Block – hello from the editor!',
				'carousel-slider-block'
			) }
		</p>
	);
}
