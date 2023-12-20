import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
// Tailwind CSS를 사용할 때 ClassName의 충돌 및 변수의 활용 문제를 해결하기 위한 유틸리티 함수
export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};
