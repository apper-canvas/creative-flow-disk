import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const TextArea = forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <textarea
      className={cn(
        'input-field min-h-[120px] resize-y',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;