import { MaskitoOptions } from "@maskito/core";
import { maskitoNumberOptionsGenerator }  from '@maskito/kit';

export const userNameMask: MaskitoOptions = {
    mask: /^[a-zA-Z\s]{0,40}$/,
};

export const mascara_dinheiro = maskitoNumberOptionsGenerator({
    decimalZeroPadding: true,
    precision: 2,
    decimalSeparator:',',
    min:1,
    prefix:' R$'
});
