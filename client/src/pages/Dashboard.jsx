import { getProduct } from "@/api/productApi";
import { getStocks } from "@/api/stockApi";
import { getStore } from "@/api/storeApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Boxes, Package, Store } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate=useNavigate();
  const [dashboard,setDashboard] = useState({
    productCount:0,
    storeCount:0,
    stockCount:0,
    lowStocks:[],
  });
  const[loading,setLoading] = useState(false);

  const dashboardFetch = async()=>{
    try {
      setLoading(true)
      const [productRes, storeRes, stockRes, lowStocksRes] = await Promise.all([
        getProduct(),
        getStore(),
        getStocks(),
        getStocks(10)
      ]);
      setDashboard({
        productCount:productRes.data.count,
        storeCount:storeRes.data.count,
        stockCount:stockRes.data.count,
        lowStocks:lowStocksRes.data.data,
      })      
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard");
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    dashboardFetch();
  },[]);

  if(loading){
    return <Spinner/>
  }

  console.log(dashboard.lowStocks);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-3 md:grid-cols-3">
        <Card onClick={()=>navigate('/products')} className='cursor-pointer'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle>Products</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">
              {dashboard.productCount}
            </h2>
          </CardContent>
        </Card>

        <Card onClick={()=>navigate('/stores')} className='cursor-pointer'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle>Stores</CardTitle>
            <Store className="h-5 w-5 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">
              {dashboard.storeCount}
            </h2>
          </CardContent>
        </Card>
        <Card onClick={()=>navigate('/stocks')} className='cursor-pointer'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle>Stock Records</CardTitle>
            <Boxes className="h-5 w-5 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">
              {dashboard.stockCount}
            </h2>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Low Stock Items
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {
                dashboard?.lowStocks?.map((stock)=>(
                  <TableRow key={stock._id}>
                    <TableCell>{stock?.product?.name}</TableCell>
                    <TableCell>{stock?.store?.name}</TableCell>
                    <TableCell>{stock?.quantity}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
