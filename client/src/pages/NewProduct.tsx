import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = ""
    if (Object.values(data).includes("")) {
        error = "All fields are required"
    }
    if (error.length) {
        return error
    }

    await addProduct(data)

    return redirect("/")
}

export default function NewProduct() {

    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between gap-x-3">
                <h2 className="text-4xl font-black text-slate-500">New Product</h2>
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
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full p-2 text-slate-500 font-bold text-lg cursor-pointer rounded border border-sky-600 bg-sky-50 hover:bg-sky-100 transition-colors"
                    value="Add Product"
                />
            </Form>
        </>
    )
}
