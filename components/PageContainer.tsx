import { ComponentPropsWithoutRef, ElementType } from 'react';

type As = 'div' | 'section' | 'main' | 'article' | 'aside';

interface PageContainerProps extends ComponentPropsWithoutRef<'div'> {
  as?: As;
  /** narrow = max-w-5xl (checkout/form pages), default = max-w-7xl (allineato al nav) */
  size?: 'default' | 'narrow';
}

export default function PageContainer({
  as: Tag = 'div',
  size = 'default',
  className = '',
  children,
  ...props
}: PageContainerProps) {
  const maxW = size === 'narrow' ? 'max-w-5xl' : 'max-w-7xl';
  return (
    <Tag
      className={`${maxW} mx-auto px-4 sm:px-6 lg:px-8 ${className}`.trim()}
      {...(props as ComponentPropsWithoutRef<'div'>)}
    >
      {children}
    </Tag>
  );
}
