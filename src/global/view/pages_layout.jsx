
import useSidebarStore from '../global_stores/useSidebarStore'
import SideBar from './sideBar';
const Layout = ({ children }) => {
    const { isOpen } = useSidebarStore();

    return (


        <div className="grid grid-cols-12 ">
            <div className={`sm:col-span-11 ${isOpen ? 'col-span-10' : 'col-span-12'} p-1 sm:p-4 relative overflow-y-auto h-screen custom-scrollbar`}>


                {children}
            </div>

            <SideBar />
        </div>

    );
}

export default Layout;