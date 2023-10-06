import Kbd from '../Kbd'
import ArrowUp from '../icons/ArrowUp'
import ArrowDown from '../icons/ArrowDown'
import EnterCmd from '../icons/EnterCmd'

const SearchFooter = () => {
    return <footer className="flex border-t p-2 gap-3 text-[#a1a1aa]">
        <div className="flex text-xs items-center">
            <Kbd className="mr-1">esc</Kbd>
            <span>to close</span>
        </div>
        <div className="flex text-xs items-center">
            <Kbd className="mr-1 !px-1"><ArrowUp/></Kbd>
            <Kbd className="mr-1 !px-1"><ArrowDown/></Kbd>
            <span>to navigate</span>
        </div>
        <div className="flex text-xs items-center">
            <Kbd className="mr-1 !px-1"><EnterCmd/></Kbd>
            <span>to select</span>
        </div>
    </footer>
}

export default SearchFooter