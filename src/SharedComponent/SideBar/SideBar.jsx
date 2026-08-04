import Logo from '@/Components/Logo';
import LogOut from '../LogOut';
import { ChevronUp, Handbag, House, LayoutGrid, Menu, Tag } from 'lucide-react';
import NavLink from '@/Components/NavLink';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import Image from 'next/image';
import DropDownButton from './DropDownButton';
// import defaultUserImage from '@/user.png'

const SideBar = async ({ pages }) => {
    const { user } = await auth.api.getSession({
        headers: await headers() // headers containing the user's session token
    });
    console.log(user)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content min-h-screen bg-[#f6f2e9]">
                <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#1f2520]/10 bg-[#fbf8f1]/85 px-4 py-3 backdrop-blur lg:hidden">
                    <Logo />
                    <label htmlFor="my-drawer-3" className="btn btn-ghost btn-circle drawer-button" aria-label="Open dashboard menu">
                        <Menu size={22} />
                    </label>
                </header>
                <main className="p-4 sm:p-6 lg:p-8">
                    {pages}
                </main>
            </div>
            <div className="drawer-side z-40">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <aside className="flex min-h-full w-80 flex-col  border-r border-[#1f2520]/10 bg-[#fffaf1] dark:bg-[#1f2520] p-5 shadow-xl shadow-[#1f2520]/5">
                    <Logo></Logo>
                    <nav className="mt-10 grid gap-2 text-base font-semibold text-[#5b6558]">
                        <NavLink to={"/dashboard"} className="flex items-center gap-3 rounded-2xl border-l-4 border-l-transparent px-4 py-3 transition hover:bg-[#1f2520]/5"><House size={20} />Overview</NavLink>
                        <NavLink to={"/dashboard/categories"} className="flex items-center gap-3 rounded-2xl border-l-4 border-l-transparent px-4 py-3 transition hover:bg-[#1f2520]/5"><LayoutGrid size={20} />Categories</NavLink>
                        <NavLink to={"/dashboard/products"} className="flex items-center gap-3 rounded-2xl border-l-4 border-l-transparent px-4 py-3 transition hover:bg-[#1f2520]/5"><Handbag size={20} />Products</NavLink>
                        <NavLink to={"/dashboard/promo-codes"} className="flex items-center gap-3 rounded-2xl border-l-4 border-l-transparent px-4 py-3 transition hover:bg-[#1f2520]/5"><Tag size={20} />Promo Codes</NavLink>
                    </nav>
                    {/* Store Health */}
                    {/* <div className="mt-auto rounded-3xl border border-[#1f2520]/10 bg-[#f6f2e9] p-4">
                        <p className="text-sm font-bold text-[#1f2520]">Store health</p>
                        <p className="mt-1 text-xs leading-5 text-[#6c7568]">Keep product photos, stock, and categories clean for a better buyer experience.</p>
                    </div> */}
                    <div className=' flex-1'></div>
                    {/* <LogOut></LogOut> */}
                    <DropDownButton className='flex items-center gap-3 hover:bg-black/10 p-3 rounded-xl duration-300 cursor-pointer active:scale-[99%]'>
                        <Image
                            src={user.image || "/user2.png"}
                            height={50}
                            width={50}
                            alt={user.name}
                            className='rounded-full object-cover h-12.5 w-12.5 '
                        />
                        <div>
                            <h4 className=' font-semibold'>{user.name}</h4>
                            <h6 className='text-sm'>{user.email}</h6>
                        </div>
                    </DropDownButton>
                </aside>
            </div>
        </div>
    );
};

export default SideBar;
