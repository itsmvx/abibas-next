'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const UpdateProductPage = () => {
    const router: AppRouterInstance = useRouter();
    if (useSearchParams().get('id') === null) {
        return router.replace('/admin/products/list');
    }
    return (
        <div>UpdateProductPage</div>
    )
}
export default UpdateProductPage
