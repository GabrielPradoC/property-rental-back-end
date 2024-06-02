// Libs
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
/** Sets the route as public and ignores all global authentication */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
