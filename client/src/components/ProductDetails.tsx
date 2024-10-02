import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProductDetailsProps = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id)
    }
    return redirect('/')
}

export default function ProductDetails({ product }: ProductDetailsProps) {

    const fetcher = useFetcher()
    const navigate = useNavigate()

    const isAvailable = product.availability

    return (
        <tr className="border-b-2 last:border-b-0 border-slate-100">
            <td className="p-3 text-lg text-gray-800 text-center">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-rose-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer bg-zinc-50 hover:bg-zinc-100`}
                    >
                        {isAvailable ? 'Available' : 'Not Available'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800">
                <div className="flex gap-2 items-center">
                    {/* <Linkto={`/products/${product.id}/edit`}>Edit</Linkto=> */}
                    {/* <button
                        onClick={() => navigate(`/products/${product.id}/edit`, {
                            state: {
                                product
                            }
                        })}>Edit</button> */}
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                        className="w-full text-slate-500 border border-sky-600 bg-sky-50 hover:bg-sky-100 transition-colors rounded-lg p-2 uppercase font-bold text-xs text-center"
                    >Edit</button>
                    <Form
                        method="POST"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (!confirm('Are you sure you want to delete this product?')) {
                                e.preventDefault()
                            }
                        }}
                        className="w-full"
                    >
                        <input
                            type="submit"
                            value="Delete"
                            className="cursor-pointer w-full text-slate-500 border border-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors rounded-lg p-2 uppercase font-bold text-xs text-center"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
