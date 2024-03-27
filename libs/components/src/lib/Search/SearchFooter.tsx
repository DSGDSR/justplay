import { Kbd } from '../Kbd';
import { IconArrowUp, IconArrowDown, IconCornerDownLeft } from '@tabler/icons-react';

const SearchFooter = () => {
  return (
    <footer className="flex border-t p-2.5 gap-3 text-[#a1a1aa]">
      <div className="flex text-sm items-center">
        <Kbd className="mr-1.5" keys={['esc']} />
        <span>to close</span>
      </div>
      <div className="flex text-sm items-center">
        <Kbd className="mr-1.5" keys={[<IconArrowUp size={15} />]} />
        <Kbd className="mr-1.5" keys={[<IconArrowDown size={15} />]} />
        <span>to navigate</span>
      </div>
      <div className="flex text-sm items-center">
        <Kbd className="mr-1.5" keys={[<IconCornerDownLeft size={15} />]} />
        <span>to select</span>
      </div>
    </footer>
  );
};

export default SearchFooter;
