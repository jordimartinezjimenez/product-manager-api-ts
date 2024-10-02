import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { editProduct, getProductById } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({ params }: LoaderFunctionArgs) {
    if (params.id !== undefined) {
        const product = await getProductById(+params.id)
        if (!product) {
            // throw new Response("", { status: 404, statusText: "Product not found", })
            return redirect("/")
        }
        return product
    }
}

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ""
    if (Object.values(data).includes("")) {
        error = "All fields are required"
    }
    if (error.length) {
        return error
    }

    if (params.id !== undefined) {
        await editProduct(data, +params.id)
        return redirect("/")
    }
}

// const availabilityOptions = [
//     { name: "Available", value: true },
//     { name: "Not Available", value: false }
// ]

export default function EditProduct() {

    const product = useLoaderData() as Product
    const error = useActionData() as string
    // const location = useLocation()

    return (
        <>
            <div className="flex justify-between gap-x-3">
                <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
                <Link
                    to={"/"}
                    className="rounded-md flex text-center items-center p-2 text-sm font-bold text-slate-500 shadow-sm border border-zinc-600 bg-zinc-50 hover:bg-zinc-100 transition-colors"
                >
                    Back to Products
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                method="POST"
                className="mt-10"
            >
                <ProductForm
                    product={product}
                />
                <div className="mb-4 relative">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Availability:</label>
                    {/* <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select> */}
                    <input
                        type="checkbox"
                        id="availability"
                        // className="mt-2 block w-full p-3 bg-gray-50"
                        className="appearance-none peer block w-8 h-8 border-[3px] border-rose-500 rounded-md bg-white checked:border-green-500"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                        defaultChecked={product?.availability}
                    />
                    <svg
                        className="absolute top-[1.45rem] left-0.5 w-7 h-7 mt-1 hidden peer-checked:block pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full p-2 text-slate-500 font-bold text-lg cursor-pointer rounded border border-sky-600 bg-sky-50 hover:bg-sky-100 transition-colors"
                    value="Save Changes"
                />
            </Form>
        </>
    )
}
