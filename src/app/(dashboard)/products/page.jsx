import { Plus } from "lucide-react";
import AddProductFormModal from "./AddProductFormModal";

const page = () => {

    return (
        <div>
            <div className='flex justify-between'>

                <div>
                    <h1 className='font-bold text-4xl'>Products</h1>
                    <p>Manage all products here</p>
                </div>
                <AddProductFormModal></AddProductFormModal>
            </div>
        </div>
    );
};

export default page;