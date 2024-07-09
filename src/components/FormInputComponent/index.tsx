import { FormInputComponentCalendar } from './FormInputComponentCalendar';
import { FormInputComponentDropdown } from './FormInputComponentDropdown';
import { FormInputComponentMask } from './FormInputComponentMask';
import { FormInputComponentNumber } from './FormInputComponentNumber';
import {
	FormInputComponentCropperDialog,
	FormInputComponentPhoto,
} from './FormInputComponentPhoto';
import { FormInputComponentText } from './FormInputComponentText';

const FormInputComponent = {
	Number: FormInputComponentNumber,
	Text: FormInputComponentText,
	Calendar: FormInputComponentCalendar,
	Photo: FormInputComponentPhoto,
	Dropdown: FormInputComponentDropdown,
	CropperDialog: FormInputComponentCropperDialog,
	Mask: FormInputComponentMask,
};

export default FormInputComponent;
