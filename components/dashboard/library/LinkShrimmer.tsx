import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function LinkShrimmer() {

    const rowCount = [0, 1, 2, 3, 4]

    return <TableBody className="gap-4" >
        {rowCount.map((row) => (
            <>
                <TableRow className="h-[60px] my-2 bg-gray-200 hover:bg-gray-200 animate-pulse rounded-md" key={row}>
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                    <TableCell />
                </TableRow>
                <div className="h-[10px]"></div>
            </>
        ))}


    </TableBody>
}
