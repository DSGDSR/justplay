import Kbd from '../Kbd'
import ArrowUp from '../icons/ArrowUp'
import ArrowDown from '../icons/ArrowDown'
import EnterCmd from '../icons/EnterCmd'

const SearchFooter = () => {
    return <footer className="flex border-t p-2.5 gap-3 text-[#a1a1aa]">
        <div className="flex text-sm items-center">
            <Kbd className="mr-1.5">esc</Kbd>
            <span>to close</span>
        </div>
        <div className="flex text-sm items-center">
            <Kbd className="mr-1.5"><ArrowUp/></Kbd>
            <Kbd className="mr-1.5"><ArrowDown/></Kbd>
            <span>to navigate</span>
        </div>
        <div className="flex text-sm items-center">
            <Kbd className="mr-1.5"><EnterCmd/></Kbd>
            <span>to select</span>
        </div>
    </footer>
}

export default SearchFooter