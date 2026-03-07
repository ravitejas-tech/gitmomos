import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export function Section({ className, container = true, children, ...props }: SectionProps) {
  const content = container ? (
    <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section className={cn('py-16 md:py-24', className)} {...props}>
      {content}
    </section>
  );
}
