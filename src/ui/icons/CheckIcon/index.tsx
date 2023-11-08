import { SVGProps, memo } from 'react';

export const CheckIcon = memo(
  (props: { size?: number; color?: string } & SVGProps<SVGSVGElement>) => {
    return (
      <svg
        width={props.size || 24}
        height={props.size || 24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M20 6L9 17L4 12"
          stroke={props.color || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);
