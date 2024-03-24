import React from "react";
import { Button } from "components/common/base/button";
import { imgUrl } from "helpers/path";


const Navbar = () => {
 

    return (
        <>
        <div className="px-2 flex justify-between items-center min-h-full">
            <img
                draggable={false}
                src={imgUrl + "/logo.png"}
                alt="avatar"
                className="w-[220px] h-[60px] object-cover"
            />
            <p />      
            {/* <Button
                value="Add Composition"
                variant="primary"
                width={180}
                height={55}
                font="Roboto"
            /> */}
        </div>
        </>
    );
};

export default Navbar;