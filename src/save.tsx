import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ __(
				'Carousel Slider Block – hello from the saved content!',
				'carousel-slider-block'
			) }
		</p>
	);
}
