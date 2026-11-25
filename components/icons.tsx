import type { ReactNode } from "react";

type IconProps = { size?: number };

function Icon({ size = 16, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className="ico"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const line = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const Play = (props: IconProps) => (
  <Icon {...props}>
    <path
      d="M8 5.2v13.6a.6.6 0 0 0 .92.5l10.4-6.8a.6.6 0 0 0 0-1L8.92 4.7A.6.6 0 0 0 8 5.2Z"
      fill="currentColor"
    />
  </Icon>
);

export const ArrowUpRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M7 17 17 7M8.5 7H17v8.5" {...line} />
  </Icon>
);

export const ArrowRight = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4.5 12h15M13.5 6l6 6-6 6" {...line} />
  </Icon>
);

export const ArrowLeft = (props: IconProps) => (
  <Icon {...props}>
    <path d="M19.5 12h-15M10.5 6l-6 6 6 6" {...line} />
  </Icon>
);

export const ArrowDown = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 4.5v15M6 13.5l6 6 6-6" {...line} />
  </Icon>
);

export const Plus = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 5v14M5 12h14" {...line} />
  </Icon>
);
