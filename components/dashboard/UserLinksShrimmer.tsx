import { IoLibrary } from "react-icons/io5"

function UserLinksShrimmer() {

    const qty = [0, 1, 2, 3, 4]
    return (
        <div className="flex flex-col gap-2 my-10 bg-white-200 p-5 rounded-lg  border-[2px]">
            <h1 className='flex items-center gap-2  text-[30px] font-bold w-full'>
                <IoLibrary />
                Shorten Links
            </h1>
            {qty.map((item) => (
                <div className="items-center w-full min-h-[100px] bg-white-200 rounded-md flex flex-row px-1 md:px-4" key={item}>


                    <div className="flex-1 flex flex-col gap-1">
                        <div className="w-[40%] h-[30px] rounded-lg bg-gray-200 animate-pulse"/>
                        <div className="w-[90%] h-[30px] rounded-lg bg-gray-200 animate-pulse"/>
                    </div>


                </div>
            ))}
        </div>
    )
}

export default UserLinksShrimmer
