import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import ProductDetails from "../components/ProductDetails"
import { Product } from "../types"

export async function loader() {
    const products = await getProducts()
    return products
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    await updateProductAvailability(+data.id)
    return {}
}

export default function Products() {

    const products = useLoaderData() as Product[]

    return (
        <>
            <div className="flex justify-between gap-x-3 items-center">
                <h2 className="text-4xl font-black text-slate-500">Products</h2>
                <Link
                    to={"/products/new"}
                    className="rounded-md flex text-center items-center p-2 text-sm font-bold text-slate-500 shadow-sm border border-zinc-600 bg-zinc-50 hover:bg-zinc-100 transition-colors"
                >
                    Add Product
                </Link>
            </div>

            {products.length > 0 ? (
                <div className="p-2 overflow-x-auto">
                    <table className="w-full mt-5 table-auto shadow bg-slate-50/5">
                        <thead className="bg-slate-800 text-white">
                            <tr>
                                <th className="p-2">Product</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Availability</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <ProductDetails
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="mt-5 ml-5">No products yet.<br />Add some! 😉</p>
            )}
        </>
    )
}
