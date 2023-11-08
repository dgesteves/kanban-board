import { SVGProps, memo } from 'react';

export const CloseIcon = memo(
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
          d="M18 6L6 18M6 6L18 18"
          stroke={props.color || 'currentColor'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);
