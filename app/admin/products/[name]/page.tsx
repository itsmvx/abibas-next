const ProductPage = ({ params }: { params: { name: string } }) => {
    return (
        <>
            { params.name }
        </>
    );
}
export default ProductPage;
