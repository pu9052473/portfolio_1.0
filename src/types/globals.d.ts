import { LenisOptions } from '@studio-freight/lenis';
import { FC } from 'react';
import { ReactNode } from 'react';

// Define a type for SkillDetails props
interface SkillDetailsProps {
  skill: {
    description: ReactNode;
    proficiency: ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    color: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    id: string;
    name: string;
  };
  onClose: () => void;
}

// Define a type for SkillItem props
interface SkillItemProps {
  icon: React.ElementType; // If the icon is a React component
  name: string;
  color: string;
  proficiency: number;
  onClick: () => void;
}

interface CustomLenisOptions extends LenisOptions {
  smoothTouch?: boolean;
}

// Define the types for TechIcon props
interface TechIconProps {
  Icon: FC<React.SVGProps<SVGSVGElement>>; // Ensures Icon is a valid React SVG component
  color: string;
}

// Define the types for SocialButton props
interface SocialButtonProps {
  Icon: FC<React.SVGProps<SVGSVGElement>>; // This ensures the Icon prop is a valid React SVG component
  label: string;
  href: string;
}

export {
  SocialButtonProps,
  TechIconProps,
  SkillDetailsProps,
  SkillItemProps,
  CustomLenisOptions,

};
