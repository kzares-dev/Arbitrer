import { IoLibrary } from "react-icons/io5"

function LinkShrimmer() {
    return <div className="items-center w-full min-h-[115px] bg-white-200 rounded-md flex flex-row px-1 gap-2 md:px-4">
        <div className="w-[200px] h-[100px] bg-gray-200 animate-pulse rounded-md" />
        <div className="flex-1 flex flex-col gap-1">
            <div className="w-[40%] h-[30px] rounded-lg bg-gray-200 animate-pulse" />
            <div className="w-[90%] h-[30px] rounded-lg bg-gray-200 animate-pulse" />
            <div className="w-[100%] h-[10px] rounded-sm bg-gray-200 animate-pulse" />
        </div>


    </div >
}

function UserYoutubeLinksShrimmer() {

    const qty = [0, 1, 2,]
    return (
        <div className="flex flex-col gap-5 my-10 bg-white-200 p-5 rounded-lg  border-[2px]">
            <h1 className='flex items-center gap-2  text-[30px] font-bold w-full'>
                <IoLibrary />
                Youtube Links
            </h1>
            {qty.map((item) => (
            <LinkShrimmer key={item} />
            ))}
        </div>
    )
}

export {
    UserYoutubeLinksShrimmer,
    LinkShrimmer,
}
