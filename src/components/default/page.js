import ProductTable from "../../components/data-table/datatable";
import data from "./data.json";

export default function ProductData() {
    return (
        <>
            <ProductTable items={data} />
        </>
    );
}