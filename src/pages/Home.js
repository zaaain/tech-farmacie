import React,{useState, useEffect} from "react";
import Layout from "layout/MainLayout"
import useClient from "hooks/useClient";
import { CircularProgress } from "@mui/material";

const HomeDashboard = () => {

  const [loader,setLoader] =  useState(false)
  const [data, setData] = useState({})
  const {api} = useClient()

  const handleGetAnalytic = () => {
    setLoader(true)
    api.get(`/api/tech/analytic`)
    .then((res)=>{
      setData(res.data.data)
      setLoader(false)
    })
    .catch((err)=>{
      setLoader(false)
    })
  }

  useEffect(()=>{
    handleGetAnalytic()
  },[])

  return (
    <Layout>
    <div className="p-4">
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-5">
        <div className="bg-primary p-5 rounded-xl">
          <p className="text-[22px] text-white font-bold font-RobotoBold">
          Verified Products
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-white">
              {/* {productAnalyticLoader ? <CircularProgress size={36} style={{color:"#fff"}}/> : ( */}
              <p className="font-RobotoBold text-primary text-[50px]">
                {loader ? <CircularProgress size={28} style={{color:"#668968"}}/> : data.totalVerified && data.totalVerified}
              </p>
              {/* )} */}
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-red-400 p-5 rounded-xl">
          <p className="text-[22px] font-bold font-RobotoBold text-white">
          UnVerified Products
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-white">
              <p className="font-RobotoBold text-secondary text-[50px]">
              {loader ? <CircularProgress size={28} style={{color:"#668968"}}/> : data.totalUnVerified && data.totalUnVerified}
              </p>
              {/* )} */}
            </div>
          </div>
        </div>
        <div className="bg-gray-500 p-5 rounded-xl">
          <p className="text-[22px] text-white font-bold font-RobotoBold">
            Total Products
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-white">
              {/* {productAnalyticLoader ? <CircularProgress size={36} style={{color:"#fff"}}/> : ( */}
              <p className="font-RobotoBold text-primary text-[50px]">
              {loader ? <CircularProgress size={28} style={{color:"#668968"}}/> : data.totalProducts && data.totalProducts}
              </p>
              {/* )} */}
            </div>
          </div>
        </div>
        <div className="col-span-1 bg-secondary p-5 rounded-xl">
          <p className="text-[22px] font-bold font-RobotoBold text-white">
            Total Listing
          </p>
          <div className="flex justify-center mt-5">
            <div className="w-[150px] h-[150px] rounded-full items-center justify-center flex bg-white">
            {/* {productAnalyticLoader ? <CircularProgress size={36} style={{color:"#fff"}}/> : ( */}
              <p className="font-RobotoBold text-secondary text-[50px]">
              {loader ? <CircularProgress size={28} style={{color:"#668968"}}/> : data.listings && data.listings}
              </p>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

// export default withAuth(HomeDashboard);
export default HomeDashboard;