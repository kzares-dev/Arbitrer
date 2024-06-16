import { useFormStatus } from "react-dom"
import { Triangle } from "react-loader-spinner"

const FormLoader = () => {
    const { pending } = useFormStatus()
    console.log(pending)

    return <div className="fixed inset-0 bg-black-200 z-20 flex items-center justify-center">
        <Triangle
            visible={true}
            height="80"
            width="80"
            color="#CBACF9"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />)
    </div>

}

export default FormLoader;