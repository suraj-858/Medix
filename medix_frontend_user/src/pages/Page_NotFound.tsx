import { useNavigate } from "react-router-dom"


const Page_NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div className="rounded-lg bg-white p-8 text-center shadow-xl">
                <h1 className="mb-4 text-4xl font-bold">404</h1>
                <p className="text-gray-600">Oops! The page you are looking for could not be found.</p>
                <a className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600" onClick={() => {
                    navigate('/')
                }}> Go back to Home </a>
            </div>
        </div>
    )
}

export default Page_NotFound