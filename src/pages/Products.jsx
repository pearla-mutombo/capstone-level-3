import Loader from "../components/Loader";

export default function Products() {
    const isLoading = true;
    // I added condtional rendering //
    if (isLoading) {
        return <Loader/>;
    }
    
    return (
        <main>
            <h1>Products</h1>
        </main>
    );
}