import { useState } from "react";
import AccountModal from "./AccountModal";

const SellerAccountButton = ({ sellerId }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>판매자 계좌 보기</button>
            {isOpen && <AccountModal sellerId={sellerId} onClose={() => setIsOpen(false)} />}
        </div>
    );
};

export default SellerAccountButton;