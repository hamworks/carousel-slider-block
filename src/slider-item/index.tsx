import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata as unknown as BlockConfiguration< any >, {
	edit: Edit,
	save,
} );
