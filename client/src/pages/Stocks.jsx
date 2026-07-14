import { getProducts } from "@/api/productApi";
import { getStocks } from "@/api/stockApi";
import { getStores } from "@/api/storeApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Boxes, Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner";

export default function Stocks() {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [stocks, setStocks] = useState([]);

  const [threshold, setThreshold] = useState("");
  const [loading, setLoading] = useState(false);

  const [adjustStockOpen,setAdjustStockopen] = useState(false);
  const [adjustFormData, setAdjustFormData] = useState({
    productId:"",
    storeId:"",
    quantity:0
  })
  const [transferStockOpen,setTransferStockopen] = useState(false);
  const [transferFormData, setTransferFormData] = useState({
    productId:"",
    sourceStoreId:"",
    destinStoreId:"",
    quantity:0
  })

  const fetchStocks = useCallback(
    async(value=threshold)=>{
      try {
        setLoading(true);
        const [stockRes, productRes, storeRes] = await Promise.all([
          getStocks(value),
          getProducts(),
          getStores()
        ]);

        setStocks(stockRes?.data?.data);
        setProducts(productRes?.data?.data);
        setStores(storeRes?.data?.data);

      } catch (error) {
        console.error(error);
        toast.error("Failed to load stock data")
      }finally{
        setLoading(false)
      }
    },[threshold])

    useEffect(()=>{
      fetchStocks();
    },[])

    useEffect(()=>{
      const timer = setTimeout(()=>{
        fetchStocks(threshold);
      },500);
      return ()=> clearTimeout(timer)
    },[threshold])

    // console.log(products,"Products");
    // console.log(stores,"Stores");
    // console.log(stocks,"Stocks");

    console.log(adjustFormData,"To adjust");
    console.log(transferFormData,"To transfer");
    
    


  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <Boxes className="w-6 h-6"/>
          Stock Records
        </h1>

        <div className="flex-row gap-4">

          <Dialog open={adjustStockOpen} onOpenChange={setAdjustStockopen}>
            <DialogTrigger>
              <Button>
                <Pencil/>
                Stock Qty
              </Button>
            </DialogTrigger>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>
                  Change Stock Qty
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-3" >
                <div className="space-y-2">
                  <Label>Product</Label>
                  <Select
                  className="w-full" 
                  value={adjustFormData.productId}
                  onValueChange={(value)=>{
                    setAdjustFormData((prev)=>({
                      ...prev,
                      productId:value
                    }))
                  }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {products.find((p) => p._id === adjustFormData.productId)?.name ||
                        "Select Product"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {
                        products.map((product)=>(
                          <SelectItem key={product._id} value={product._id}>
                            {product.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Store</Label>
                  <Select
                  className="w-full" 
                  value={adjustFormData.storeId}
                  onValueChange={(value)=>{
                    setAdjustFormData((prev)=>({
                      ...prev,
                      storeId:value
                    }))
                  }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {stores.find((s) => s._id === adjustFormData.storeId)?.name ||
                        "Select Store"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {
                        stores.map((store)=>(
                          <SelectItem key={store._id} value={store._id}>
                            {store.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={adjustFormData.quantity}
                  onChange={(e)=>{
                    setAdjustFormData({
                      ...adjustFormData,
                      quantity:e.target.value
                    })
                  }}
                  required
                  />
                </div>
                <Button disabled={loading} type='submit' className="w-full">
                  {loading ? <Spinner/> :"Change"}
                </Button>
              </form>
            </DialogContent>
          </Dialog> 

          <Dialog open={transferStockOpen} onOpenChange={setTransferStockopen}>
            <DialogTrigger>
              <Button>
                <Pencil/>
                Transfer
              </Button>
            </DialogTrigger>
            <DialogContent >
              <DialogHeader>
                <DialogTitle>
                  Transfer Product Stocks
                </DialogTitle>
              </DialogHeader>
              <form className="space-y-3" >
                <div className="space-y-2">
                  <Label>Product</Label>
                  <Select 
                  value={transferFormData.productId}
                  onValueChange={(value)=>{
                    setTransferFormData((prev)=>({
                      ...prev,
                      productId:value
                    }))
                  }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {products.find((p) => p._id === transferFormData.productId)?.name ||
                        "Select Product"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {
                        products.map((product)=>(
                          <SelectItem key={product._id} value={product._id}>
                            {product.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Source Store</Label>
                  <Select 
                  value={transferFormData.sourceStoreId}
                  onValueChange={(value)=>{
                    setTransferFormData((prev)=>({
                      ...prev,
                      sourceStoreId:value
                    }))
                  }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {stores.find((p) => p._id === transferFormData.sourceStoreId)?.name ||
                        "Select Store"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {
                        stores.map((store)=>(
                          <SelectItem key={store._id} value={store._id}>
                            {store.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Destination Store</Label>
                  <Select 
                  value={transferFormData.destinStoreId}
                  onValueChange={(value)=>{
                    setTransferFormData((prev)=>({
                      ...prev,
                      destinStoreId:value
                    }))
                  }}
                  >
                    <SelectTrigger>
                      <SelectValue>
                        {stores.find((p) => p._id === transferFormData.destinStoreId)?.name ||
                        "Select Store"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {
                        stores.map((store)=>(
                          <SelectItem key={store._id} value={store._id}>
                            {store.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                <Button disabled={loading} type='submit' className="w-full">
                  {loading ? <Spinner/> :"Adjust"}
                </Button>
              </form>
            </DialogContent>
          </Dialog> 
        </div>
      </div>
    </div>
  )
}
